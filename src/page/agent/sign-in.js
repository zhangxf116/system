import html from './sign-in.html';
import {mapState, mapActions} from 'vuex';

import {isEmpty, handlePageChange} from '@/kit/common';
import {pageSizes} from '@/kit/data';

export default {
	template: html,
	computed: {
		...mapState({
			agentSignIn: state => state.AgentSignInController,
			agentList: state => state.AgentController.list
		})
	},
	data() {
		return {
			pageSizes: pageSizes,
			params: {
				from: '',
				to: '',
				agent_id: '',

				page_no: 1,
                page_size: 20
			},
			loading: false,
		}
	},
	methods: {
		...mapActions(['AGENT_LIST', 'AGENT_SIGN_IN_LIST', 'AGENT_SIGN_IN_LIST_EXPORT']),
		getList() {
			this.loading = true;

			let params = {};
            for(let i in this.params) {
                if (!isEmpty(this.params[i])) {
                    params[i] = this.params[i];
                }
            }

            params['self'] = false;

            let payload = {
                params: params,
                headers: {
                    Authorization: 'Basic d2ViLWFwcDo='
                }
            };
            this.AGENT_SIGN_IN_LIST(payload).then(res => { 
                this.loading = false;
            });
			
		},
		getAgentList() {
            this.AGENT_LIST({params: {role_id: 'AGENT_MEMBER'}, headers: {Authorization: 'Basic d2ViLWFwcDo='}}).then(res => {});
		},
		getExport() {
			let params = {};
            for(let i in this.params) {
                if (!isEmpty(this.params[i])) {
                    params[i] = this.params[i];
                }
            }

            params['self'] = false;

            let payload = {
                params: params,
                headers: {
                    Authorization: 'Basic d2ViLWFwcDo=',
                    Accept: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                }
            };
			this.AGENT_SIGN_IN_LIST_EXPORT(payload).then(res => {});
		},
		search(form) {
			this.$refs[form].validate((valid) => {
                if (valid) {
                	this.params.page_no = 1;
                    this.getList();
                } else {
                    return false;
                }
            });
		},
		reset(form) {
			this.$refs[form].resetFields();
			this.params.page_no = 1;
            this.getList();
		},
		/** 列表分页 **/
		handlePageChange
	},
	mounted() {
		/** 获取小职姐签到列表 **/
		this.getList();
		/** 获取小职姐列表 **/
		this.getAgentList();
	}
}