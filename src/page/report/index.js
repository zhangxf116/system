import html from './index.html';
import {mapState, mapActions} from 'vuex';

import {isEmpty, handlePageChange, getZeroTime, getEndTime} from '@/kit/common';
import { pageSizes } from '@/kit/data';

export default {
	template: html,
	computed: {
		...mapState({
			summaryAgent: state => state.SummaryController.dataReport,
			agentList: state => state.AgentController.list,
			supervisorList: state => state.AgentController.supervisorList
		})
	},
	data() {
		return {
			pageSizes: pageSizes,
			summaryAgentData: {
                from: getZeroTime(),
                to: getEndTime(),
				agent_id: '',
				supervisor_id: '',

				page_no: 1,
                page_size: 20
			},
			loading: false,
            loadingImort: false
		}
	},
	methods: {
		...mapActions(['AGENT_LIST', 'AGENT_SUPERVISOR', 'SUMMARY_AGENT', 'SUMMARY_AGENT_EXPORT']),
		getSummaryAgentList() {
			this.loading = true;

			let params = {};
            for(let i in this.summaryAgentData) {
                if (!isEmpty(this.summaryAgentData[i])) {
                    params[i] = this.summaryAgentData[i];
                }
            }

            let payload = {
                params: params,
                headers: {
                    Authorization: 'Basic d2ViLWFwcDo='
                }
            };
            this.SUMMARY_AGENT(payload).then(res => { 
                this.loading = false;
            });
			
		},
		getAgentList() {
            this.AGENT_LIST({params: {role_id: 'AGENT_MEMBER'}, headers: {Authorization: 'Basic d2ViLWFwcDo='}}).then(res => {});
		},
		getSupervisorList() {
            this.AGENT_SUPERVISOR({params: {}, headers: {Authorization: 'Basic d2ViLWFwcDo='}}).then(res => {});
		},
		getExport() {
			this.loadingImort = true;
			let params = {};
            for(let i in this.summaryAgentData) {
                if (!isEmpty(this.summaryAgentData[i])) {
                    params[i] = this.summaryAgentData[i];
                }
            }

            let payload = {
                params: params,
                headers: {
                    Authorization: 'Basic d2ViLWFwcDo=',
                    Accept: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                }
            };
			this.SUMMARY_AGENT_EXPORT(payload).then(res => {
                this.loadingImort = false;
			});
		},
		search(form) {
			this.$refs[form].validate((valid) => {
                if (valid) {
                	this.summaryAgentData.page_no = 1;
                    this.getSummaryAgentList();
                } else {
                    return false;
                }
            });
		},
		reset(form) {
			this.$refs[form].resetFields();
			this.summaryAgentData.page_no = 1;
            this.getSummaryAgentList();
		},
		handlePageChange
	},
	mounted() {
		/** 获取数据报表列表 **/
		this.getSummaryAgentList();
		/** 获取小职姐列表 **/
		this.getAgentList();
		/** 获取主管列表 **/
		this.getSupervisorList();
	}
}