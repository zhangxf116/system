import html from './referral.html';
import {mapState, mapActions} from 'vuex';

import {isEmpty, handlePageChange, hasRole, getTime} from '@/kit/common';
import {pageSizes} from '@/kit/data';

export default {
	template: html,
	computed: {
		...mapState({
			userReferral: state => state.AgentAssignmentController.userReferral,
			agentList: state => state.AgentController.list,
		})
	},
	data() {
		return {
			params: {
				inviteTimeRange: [],
				signUpTimeRange: [],

				invite_time_from: '',
				invite_time_to: '',
				
				sign_up_time_from: '',
				sign_up_time_to: '',

				referrer_phone: '',
				referee_phone: '',

				current_agent_id: '',
				referring_agent_id: '',

				store_id: '',
				agent_id: '',

				sort: 'INVITE_TIME',
				order: 'DESC',


				page_no: 1,
                page_size: 20
			},
			pageSizes: pageSizes,
			loading: false,
			hasAgent: false
		}
	},
	methods: {
		...mapActions(['AGENT_LIST', 'USER_REFERRAL']),
		getList() {
			this.loading = true;

			let params = {};
            for(let i in this.params) {
                if (!isEmpty(this.params[i])) {
                    params[i] = this.params[i];
                }
            }
            delete params['inviteTimeRange'];
            delete params['signUpTimeRange'];

            let payload = {
                params: params,
                headers: {
                    Authorization: 'Basic d2ViLWFwcDo='
                }
            };
            this.USER_REFERRAL(payload).then(res => { 
                this.loading = false;
            });
			
		},
		getAgentList() {
            this.AGENT_LIST({params: {role_id: 'AGENT_MEMBER'}, headers: {Authorization: 'Basic d2ViLWFwcDo='}}).then(res => {});
		},
		sort(params) {
			if (params.prop === 'referralTime') {
				this.params.sort = 'INVITE_TIME';
			}
			if (params.prop === 'refereeSignUpTime') {
				this.params.sort = 'INVITED_REGISTER_TIME';
			}
			if (params.prop === 'refereeSignInTime') {
				this.params.sort = 'INVITED_SIGN_TIME';
			}
			if (params.prop === 'refereeOnboardingTime') {
				this.params.sort = 'INVITED_RUZHI_TIME';
			}

			if (params.order === 'ascending') {
				this.params.order = 'ASC';
			}
			if (params.order === 'descending') {
				this.params.order = 'DESC';
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
			this.params.invite_time_from = '';
			this.params.invite_time_to = '';
			this.params.sign_up_time_from = '';
			this.params.sign_up_time_to = '';
			this.params.sort = 'INVITE_TIME';
			this.params.order = 'DESC';
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