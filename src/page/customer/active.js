import html from './active.html';
import {mapState, mapActions} from 'vuex';

import {isEmpty, handlePageChange, getTime} from '@/kit/common';

import {pageSizes} from '@/kit/data';

export default {
	template: html,
	computed: {
		...mapState({
			customerActive: state => state.AgentAssignmentController.customerActive,
			customerActiveEvent: state => state.AgentAssignmentController.customerActiveEvent,
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
				agent_id: '',
                not_contacted: '',

                sort: '',
				order: '',

				page_no: 1,
                page_size: 20
			},
			loading: false,
		}
	},
	methods: {
		...mapActions(['AGENT_LIST', 'CUSTOMER_ACTIVE', 'CUSTOMER_ACTIVE_EVENT']),
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
            this.CUSTOMER_ACTIVE(payload).then(res => { 
                this.loading = false;
            });
			
		},
        sort(params) {
            if (params.prop === 'lastActiveTime') {
                this.params.sort = 'ACTIVE_TIME';
            }
            if (params.prop === 'activeTimes') {
                this.params.sort = 'ACTIVE_TIMES';
            }

            if (params.order === 'ascending') {
                this.params.order = '0';
            }
            if (params.order === 'descending') {
                this.params.order = '1';
            }
            this.getList();
        },
		getAgentList() {
            this.AGENT_LIST({params: {role_id: 'AGENT_MEMBER'}, headers: {Authorization: 'Basic d2ViLWFwcDo='}}).then(res => {});
		},
		getCustomerActiveEvent(userId) {
			this.CUSTOMER_ACTIVE_EVENT({params: {user_id: userId}, headers: {Authorization: 'Basic d2ViLWFwcDo='}}).then(res => {});
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
			this.params.from = '';
			this.params.to = '';

			this.params.page_no = 1;

			this.getList();
		},
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