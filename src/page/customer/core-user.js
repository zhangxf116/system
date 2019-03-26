import html from './core-user.html';
import {mapState, mapActions} from 'vuex';

import {isEmpty, handlePageChange, hasRole, getTime} from '@/kit/common';
import {pageSizes} from '@/kit/data';

export default {
	template: html,
	computed: {
		...mapState({
			coreUser: state => state.AgentAssignmentController.coreUser,
			agentList: state => state.AgentController.list,
			storeList: state => state.StoreController.list
		})
	},
	data() {
		return {
			params: {
				signUpTimeRange: [],
				signTimeRange: [],
				onboardingTimeRange: [],
				quitTimeRange: [],

				sign_up_time_from: '',
				sign_up_time_to: '',

				sign_in_time_from: '',
				sign_in_time_to: '',

				onboarding_time_from: '',
				onboarding_time_to: '',

				quit_time_from: '',
				quit_time_to: '',

				user_name: '',
				user_phone: '',
				position_name: '',

				store_id: '',
				agent_id: '',

				status: '',
                not_contacted: '',

				sort: '',
				order: '1',


				page_no: 1,
                page_size: 20
			},
			pageSizes: pageSizes,
			loading: false,
			hasAgent: false
		}
	},
	methods: {
		...mapActions(['AGENT_LIST', 'STORE_LIST','AGENT_CORE_USER']),
		getList() {
			this.loading = true;

			let params = {};
            for(let i in this.params) {
                if (!isEmpty(this.params[i])) {
                    params[i] = this.params[i];
                }
            }
            delete params['signUpTimeRange'];
            delete params['signTimeRange'];
            delete params['onboardingTimeRange'];
            delete params['quitTimeRange'];

            let payload = {
                params: params,
                headers: {
                    Authorization: 'Basic d2ViLWFwcDo='
                }
            };
            this.AGENT_CORE_USER(payload).then(res => { 
                this.loading = false;
            });
			
		},
		getAgentList() {
            this.AGENT_LIST({params: {role_id: 'AGENT_MEMBER'}, headers: {Authorization: 'Basic d2ViLWFwcDo='}}).then(res => {});
		},
		getStoreList() {
			this.STORE_LIST({headers: {Authorization: 'Basic d2ViLWFwcDo='}}).then(res => {});
		},
		sort(params) {

			if (params.prop === 'signUpTime') {
				this.params.sort = 'REGISTER_TIME';
			}
			if (params.prop === 'signInTime') {
				this.params.sort = 'SIGN_DATE';
			}
			if (params.prop === 'onboardingTime') {
				this.params.sort = 'ENTER_TIME';
			}
			if (params.prop === 'quitTime') {
				this.params.sort = 'QUIT_TIME';
			}
			if (params.prop === 'lastContactTime') {
				this.params.sort = 'CONTACT_TIME';
			}

			if (params.order === 'ascending') {
				this.params.order = '0';
			}
			if (params.order === 'descending') {
				this.params.order = '1';
			}
			this.getList();
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
			this.params.sign_up_time_from = '';
			this.params.sign_up_time_to = '';
			this.params.sign_in_time_from = '';
			this.params.sign_in_time_to = '';
			this.params.onboarding_time_from = '';
			this.params.onboarding_time_to = '';
			this.params.quit_time_from = '';
			this.params.quit_time_to = '';

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
		this.getStoreList();
	}
}