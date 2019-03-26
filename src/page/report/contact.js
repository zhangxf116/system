import html from './contact.html';
import {mapState, mapActions} from 'vuex';

import {isEmpty, handlePageChange, getTime, getBeforeDate, getEndTime} from '@/kit/common';
import { pageSizes } from '@/kit/data';

export default {
	template: html,
	computed: {
		...mapState({
			contactRate: state => state.SummaryController.contactRate,
			agentList: state => state.AgentController.list
		})
	},
	data() {
		return {
			pageSizes: pageSizes,
			contactRateData: {
				timeRange: [],
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
		...mapActions(['AGENT_LIST', 'CONTACT_RATE']),
		getContactRateList() {
			this.loading = true;

			let params = {};
            for(let i in this.contactRateData) {
                if (!isEmpty(this.contactRateData[i])) {
                    params[i] = this.contactRateData[i];
                }
            }
            
            delete params.timeRange;
            
            let payload = {
                params: params,
                headers: {
                    Authorization: 'Basic d2ViLWFwcDo='
                }
            };
            this.CONTACT_RATE(payload).then(res => { 
                this.loading = false;
            });
			
		},
		getAgentList() {
            this.AGENT_LIST({params: {role_id: 'AGENT_MEMBER'}, headers: {Authorization: 'Basic d2ViLWFwcDo='}}).then(res => {});
		},
		search(form) {
			this.$refs[form].validate((valid) => {
                if (valid) {
                	this.contactRateData.page_no = 1;
                    this.getContactRateList();
                } else {
                    return false;
                }
            });
		},
        initializeTime() {
            this.contactRateData.timeRange.push(getBeforeDate(7), getEndTime());
            this.contactRateData.from = new Date(getBeforeDate(7)).getTime();
            this.contactRateData.to = getEndTime();
        },
		reset(form) {
			this.$refs[form].resetFields();
			this.initializeTime();
			
			this.contactRateData.page_no = 1;
			this.getContactRateList();
		},
		getTime,
		handlePageChange
	},
	mounted() {
        this.initializeTime();
		this.getAgentList();
		this.getContactRateList();
	}
}