import html from './spring-reserve.html';
import {mapState, mapActions} from 'vuex';

import {isEmpty, handlePageChange, getTime, hasRole} from '@/kit/common';
import {pageSizes} from '@/kit/data';

export default {
	template: html,
	computed: {
		...mapState({
			agentList: state => state.AgentController.list,
			springReserve: state => state.CustomerController.springReserve
		})
	},
	data() {
		return {
			params: {
				timeRange: [],

				from: '',
				to: '',
				agent_id: '',

				customer_name: '',
				customer_nickname: '',

				phone: '',

				page_no: 1,
                page_size: 20
			},
			pageSizes: pageSizes,
			loading: false,
			hasAgent: false
		}
	},
	methods: {
		...mapActions(['AGENT_LIST', 'CUSTOMER_SPRING_RESERVE']),
		getList() {
			this.loading = true;

			let params = {};
            for(let i in this.params) {
                if (!isEmpty(this.params[i])) {
                    params[i] = this.params[i];
                }
            }
            delete params['timeRange'];

            let payload = {
                params: params,
                headers: {
                    Authorization: 'Basic d2ViLWFwcDo='
                }
            };
            this.CUSTOMER_SPRING_RESERVE(payload).then(res => { 
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
		reset(form) {
			this.$refs[form].resetFields();
			this.params.from = '';
			this.params.to = '';

			this.params.page_no = 1;
			this.getList();
		},
		getTime,
		hasRole,
		handlePageChange
	},
	mounted() {
		this.getList();
		this.getAgentList();
	}
}