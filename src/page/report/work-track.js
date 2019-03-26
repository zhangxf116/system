import html from './work-track.html';
import {mapState, mapActions} from 'vuex';

import {isEmpty, handlePageChange, hasRole, getTime, getBeforeDate, getEndTime} from '@/kit/common';
import {pageSizes} from '@/kit/data';

export default {
	template: html,
	computed: {
		...mapState({
			workTrack: state => state.SummaryController.workTrack,
			agentList: state => state.AgentController.list,
		})
	},
	data() {
		return {
			pageSizes: pageSizes,
			paramsData: {
				timeRange: [],

				from: '',
				to: '',

				agent_id: '',

				page_no: 1,
                page_size: 20
			},
			loading: false,
			hasAgent: false,
            loadingImort: false
		}
	},
	methods: {
		...mapActions(['AGENT_LIST', 'SUMMARY_WORK_TRACK', 'SUMMARY_WORK_TRACK_EXPORT']),
		getList() {
			this.loading = true;

			let params = {};
            for(let i in this.paramsData) {
                if (!isEmpty(this.paramsData[i])) {
                    params[i] = this.paramsData[i];
                }
            }
            delete params['timeRange'];

            let payload = {
                params: params,
                headers: {
                    Authorization: 'Basic d2ViLWFwcDo='
                }
            };
            this.SUMMARY_WORK_TRACK(payload).then(res => { 
                this.loading = false;
            });
			
		},
		getAgentList() {
            this.AGENT_LIST({params: {role_id: 'AGENT_MEMBER'}, headers: {Authorization: 'Basic d2ViLWFwcDo='}}).then(res => {});
		},
		search(form) {
			this.$refs[form].validate((valid) => {
                if (valid) {
                	this.paramsData.page_no = 1;
                    this.getList();
                } else {
                    return false;
                }
            });
		},
        initializeTime() {
            this.paramsData.timeRange.push(getBeforeDate(7), getEndTime());
            this.paramsData.from = new Date(getBeforeDate(7)).getTime();
            this.paramsData.to = getEndTime();
        },
		reset(form) {
			this.$refs[form].resetFields();
			this.initializeTime();

			this.paramsData.page_no = 1;
			this.getList();
		},
		getExport() {
			this.loadingImort = true;
			let params = {};
			for(let i in this.paramsData) {
				if (!isEmpty(this.paramsData[i])) {
					params[i] = this.paramsData[i];
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
			this.SUMMARY_WORK_TRACK_EXPORT(payload).then(res => {
				this.loadingImort = false
			});
		},
		hasRole,
		getTime,
		handlePageChange
	},
	mounted() {
        this.initializeTime();
		this.getList();
		this.getAgentList();
	}
}