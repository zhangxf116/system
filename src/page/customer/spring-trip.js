import html from './spring-trip.html';
import {mapState, mapActions} from 'vuex';

import {isEmpty, handlePageChange, getTime, hasRole} from '@/kit/common';
import {pageSizes} from '@/kit/data';

export default {
	template: html,
	computed: {
		...mapState({
			agentList: state => state.AgentController.list,
            supervisorList: state => state.AgentController.supervisorList,
            springTrip: state => state.CustomerController.springTrip
		})
	},
	data() {
		return {
			params: {
				agent_id: '',
                supervisor_id: '',
				customer_name: '',
				customer_nickname: '',
				phone: '',
                payment_status: '',
				page_no: 1,
                page_size: 20
			},
			pageSizes: pageSizes,
			loading: false,
			hasAgent: false
		}
	},
	methods: {
		...mapActions(['AGENT_LIST', 'CUSTOMER_SPRING_TRIP', 'AGENT_SUPERVISOR']),
		getList() {
			this.loading = true;

			let params = {};
            for(let i in this.params) {
                if (!isEmpty(this.params[i])) {
                    params[i] = this.params[i];
                }
            }

            let payload = {
                params: params,
                headers: {
                    Authorization: 'Basic d2ViLWFwcDo='
                }
            };
            this.CUSTOMER_SPRING_TRIP(payload).then(res => {
                this.loading = false;
            });
			
		},
		getAgentList() {
            this.AGENT_LIST({params: {role_id: 'AGENT_MEMBER'}, headers: {Authorization: 'Basic d2ViLWFwcDo='}}).then(res => {});
		},
        getAgentSupervisor() {
            this.AGENT_SUPERVISOR({params: {term: ''}, headers: {Authorization: 'Basic d2ViLWFwcDo='}}).then(res => {});
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
		this.getAgentSupervisor();
	}
}