import html from './bonus.html';
import {mapState, mapActions} from 'vuex';

import {handlePageChange, getTime, isEmpty, hasRole, getBeforeDate, getEndTime} from '@/kit/common';
import { pageSizes, jobStatus } from '@/kit/data';

export default {
	template: html,
	computed: {
		...mapState({
			reward: state => state.AgentRewardController.reward,
			summary: state => state.AgentRewardController.summary,
			agentList: state => state.AgentController.list
		})
	},
	data() {
		return {
			jobStatus: jobStatus,
			pageSizes: pageSizes,
			params: {
				timeRange: [],
				
				reward_date_from: '',
				reward_date_to: '',

				agent_id: '',
				user_name: '',
				user_phone: '',
				onboarding_status: '',

				reward_type: 0,

				page_no: 1,
                page_size: 20
			},
			loading: false,
            loadingImort: false
		}
	},
	methods: {
		...mapActions(['AGENT_LIST', 'AGENT_REWARD', 'AGENT_REWARD_EXPORT', 'AGENT_REWARD_SUMMARY']),
		getList() {
			this.loading = true;
			let params = {};
            for(let i in this.params) {
                if (!isEmpty(this.params[i])) {
                    params[i] = this.params[i];
                }
            }
            delete params.timeRange;
			this.AGENT_REWARD({params: params, headers: {Authorization: 'Basic d2ViLWFwcDo='}}).then(res => { this.loading = false; });
		},
		getExport() {
			this.loadingImort = true;
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
                    Authorization: 'Basic d2ViLWFwcDo=',
                    Accept: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                }
            };
			this.AGENT_REWARD_EXPORT(payload).then(res => {
                this.loadingImort = false;
			});
		},
		getRewardSummary() {
			this.AGENT_REWARD_SUMMARY({headers: {Authorization: 'Basic d2ViLWFwcDo='}}).then(res => {});
		},
		getAgentList() {
            this.AGENT_LIST({params: {subordinate: hasRole('AGENT_MANAGER') ? true : false}, headers: {Authorization: 'Basic d2ViLWFwcDo='}}).then(res => {});
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
            this.params.timeRange.push(getBeforeDate(30), getEndTime());
            this.params.reward_date_from = new Date(getBeforeDate(30)).getTime();
            this.params.reward_date_to = getEndTime();
        },
		reset(form) {
			this.$refs[form].resetFields();
			this.initializeTime();

			this.params.page_no = 1;
			this.getList();
		},
		hasRole,
		getTime,
		handlePageChange,
	},
	mounted() {
		this.initializeTime();
		this.getList();
		this.getRewardSummary();
		this.getAgentList();
	}
}