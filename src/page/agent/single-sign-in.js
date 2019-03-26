import html from './single-sign-in.html';
import {mapState, mapActions} from 'vuex';

import {isEmpty, handlePageChange} from '@/kit/common';
import { pageSizes } from '@/kit/data';

export default {
	template: html,
	computed: {
		...mapState({
			agentSignIn: state => state.AgentSignInController
		})
	},
	data() {
		return {
			pageSizes: pageSizes,
			params: {
				from: '',
				to: '',

				page_no: 1,
                page_size: 20
			},
			loading: false,
		}
	},
	methods: {
		...mapActions(['AGENT_SIGN_IN', 'AGENT_SIGN_IN_LIST']),
		getList() {
			this.loading = true;

			let params = {};
            for(let i in this.params) {
                if (!isEmpty(this.params[i])) {
                    params[i] = this.params[i];
                }
            }

            params['self'] = true;

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
		signIn() {
			this.$confirm('上下线按时打卡', '上下线打卡', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
				
	            let payload = {
	                body: {},
	                headers: {
	                    Authorization: 'Basic d2ViLWFwcDo='
	                }
	            };
	            this.AGENT_SIGN_IN(payload).then(res => {
	            	if (res === '0') {
	            		this.$message({
							message: '打卡成功',
							type: 'success'
						});
						this.getList();
	            	}
	            });

            }).catch(() => {});
		},
		/** 列表分页 **/
		handlePageChange
	},
	mounted() {
		/** 获取小职姐签到列表 **/
		this.getList();
	}
}