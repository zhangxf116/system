import html from './index.html';
import {mapState, mapActions} from 'vuex';

import {isEmpty, hasRole, handlePageChange, getTime, getBeforeDate, getEndTime} from '@/kit/common';
import {pageSizes} from '@/kit/data';

export default {
	template: html,
	computed: {
		...mapState({
			agentHistory: state => state.AgentAssignmentController.agentHistory,
			agentList: state => state.AgentController.list
		})
	},
	data() {
		return {
			pageSizes: pageSizes,
			params: {
				/** 自定义参数 **/
				timeRange: [],

				from: '',
				to: '',
				user_name: '',
				nickname: '',
				user_phone: '',
				change_reason: '',
				agent_id: '',
				ex_agent_id: '',

				page_no: 1,
                page_size: 20
			},
			loading: false,
		}
	},
	methods: {
		...mapActions(['AGENT_LIST', 'AGENT_HISTORY']),
		getList() {
			this.loading = true;

			let params = {};
            for(let i in this.params) {
                if (!isEmpty(this.params[i])) {
                    params[i] = this.params[i];
                }
            }
            delete params.timeRange;

            let payload = {
                params: params,
                headers: {
                    Authorization: 'Basic d2ViLWFwcDo='
                }
            };
            this.AGENT_HISTORY(payload).then(res => { 
                this.loading = false;
            });
			
		},
		getAgentList() {
            this.AGENT_LIST({params: {role_id: 'AGENT_MEMBER'}, headers: {Authorization: 'Basic d2ViLWFwcDo='}}).then(res => {});
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
        initializeTime() {
            this.params.timeRange.push(getBeforeDate(7), getEndTime());
            this.params.from = new Date(getBeforeDate(7)).getTime();
            this.params.to = getEndTime();
        },
		reset(form) {
			this.$refs[form].resetFields();
            this.initializeTime();
			this.params.page_no = 1;
			this.getList();
		},
		hasRole,
		getTime,
		handlePageChange
	},
	mounted() {
		this.initializeTime();
		/** 获取客户列表 **/
		this.getList();
		/** 获取小职姐列表 **/
		this.getAgentList();
	}
}