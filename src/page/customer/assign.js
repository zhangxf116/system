import html from './assign.html';
import {mapState, mapActions} from 'vuex';

import {isEmpty, hasRole, handlePageChange, getTime} from '@/kit/common';
import {pageSizes} from '@/kit/data';

export default {
	template: html,
	computed: {
		...mapState({
			customer: state => state.AgentAssignmentController.customer,
			agentList: state => state.AgentController.list
		})
	},
	data() {
		return {
			pageSizes: pageSizes,
			params: {
				/** 自定义参数 **/
				timeRange: [],
				matchTimeRange: [],

				register_time_from: '',
				register_time_to: '',

				match_time_from: '',
				match_time_to: '',

				sort: 'MATCH_TIME',
				order: '1',

				user_name: '',
				nickname: '',
				user_phone: '',
				agent_id: '',

				not_contacted: '',

				page_no: 1,
                page_size: 20
			},
			assignCustomerData: {
				agentId: '',
				userIds: [],
				changeReason: '',
			},
			assignCustomerDataRules: {
				agentId: [{
					required: true, message: '请选择小职姐', trigger: 'blur'
				}]
			},
			loading: false,
			hasAgent: false
		}
	},
	methods: {
		...mapActions(['AGENT_LIST', 'CUSTOMER_LIST', 'CUSTOMER_ASSIGN']),
		getList() {
			this.loading = true;

			let params = {};
            for(let i in this.params) {
                if (!isEmpty(this.params[i])) {
                    params[i] = this.params[i];
                }
            }

            delete params.timeRange;
            delete params.matchTimeRange;

            let payload = {
                params: params,
                headers: {
                    Authorization: 'Basic d2ViLWFwcDo='
                }
            };
            this.CUSTOMER_LIST(payload).then(res => { 
                this.loading = false;
            });
			
		},
		getAgentList() {
            this.AGENT_LIST({params: {role_id: 'AGENT_MEMBER'}, headers: {Authorization: 'Basic d2ViLWFwcDo='}}).then(res => {});
		},
		/** 根据 userId 获取小职姐名称 **/
        getAgentNickName(agentId) {
            let agentList = this.agentList;
            let nickname = '';
            agentList.forEach(i => {
                if(i.agentId === agentId) {
                    return nickname = i.nickname;
                }
            });
            return nickname;
        },
		setAssign() {
            this.$confirm('确认分配' + this.assignCustomerData.userIds.length + '个用户给小职姐' + this.getAgentNickName(this.assignCustomerData.agentId), '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
				
            	let body = {
            		agentId: this.assignCustomerData.agentId,
            		userIds: this.assignCustomerData.userIds
            	};
            	if (!isEmpty(this.assignCustomerData.changeReason)) {
            		body['changeReason'] = this.assignCustomerData.changeReason
            	}
	            let payload = {
	                body: body,
	                headers: {
	                    Authorization: 'Basic d2ViLWFwcDo='
	                }
	            };
	            this.CUSTOMER_ASSIGN(payload).then(res => {
	            	if (res === '0') {
	            		this.$message({
							message: '分配成功',
							type: 'success'
						});
						this.getList();
	            	} else {
	            		this.$message.error('分配失败');
	            	}
	            });

            }).catch(() => {
                this.$message({ type: 'info', message: '已取消分配' });
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
			this.params.register_time_from = '';
			this.params.register_time_to = '';
			this.params.match_time_from = '';
			this.params.match_time_to = '';

			this.params.page_no = 1;
			this.getList();
		},
		assign(form) {
			this.$refs[form].validate((valid) => {
                if (valid) {
                	/** 判断是否选择客户 **/
                	if (this.assignCustomerData.userIds.length > 0) {

                		if (this.hasAgent) {
                			this.$prompt('选项含有已分配过的客户，请填写备注', '提示', {
								confirmButtonText: '确定',
								inputPattern:  /\S/,
								inputErrorMessage: '备注不能为空'
							}).then(({ value }) => {
								this.assignCustomerData.changeReason = value;
								this.setAssign();
							}).catch(() => {});
                		} else {
                    		this.setAssign();
                		}
                	} else {
						this.$message({
							message: '请选择客户',
							type: 'warning'
						});
                	}
                } else {
                    return false;
                }
            });
		},
		sort(params) {
			if (params.prop === 'lastContactTime') {
				this.params.sort = 'COMMENT_TIME';
			}
			if (params.prop === 'registerTime') {
				this.params.sort = 'REGISTER_TIME';
			}
			if (params.prop === 'matchTime') {
				this.params.sort = 'MATCH_TIME';
			}

			if (params.order === 'ascending') {
				this.params.order = '0';
			}
			if (params.order === 'descending') {
				this.params.order = '1';
			}
			this.getList();
		},
		handleCustomerId(val) {
			this.hasAgent = false;
    		this.assignCustomerData.userIds = [];
    		val.forEach(i => {
    			if (!isEmpty(i.agentId)) { this.hasAgent = true; }

    			let index = this.assignCustomerData.userIds.indexOf(i.userId);
    			if(index >= 0) {
    				this.assignCustomerData.userIds.splice(index, 1);
    			} else {
    				this.assignCustomerData.userIds.push(i.userId);

    				if (i.onboardingStatus === 1) {
						this.$confirm('该用户已入职，请谨慎分配！', '提示', {
							confirmButtonText: '确定',
							showClose: false,
							showCancelButton: false,
							type: 'warning'
						}).then(() => {}).catch(() => {});
					}
    			}
    		});
	    },
	    hasRole,
	    getTime,
		handlePageChange
	},
	mounted() {
		/** 获取客户列表 **/
		this.getList();
		/** 获取小职姐列表 **/
		this.getAgentList();
	}
}