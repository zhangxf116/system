import html from './event.html';
import {mapState, mapActions} from 'vuex';

import {isEmpty, getTime, getTimestamp, handlePageChange} from '@/kit/common';

import {pageSizes} from '@/kit/data';

export default {
	template: html,
	computed: {
		...mapState({
			receptionist: state => state.ServiceFollowUpController.receptionist,
			event: state => state.ServiceEventController.event
		})
	},
	data() {
		return {
			pageSizes: pageSizes,
			params: {
				timeRange: [],
				
				incoming_time_from: '',
				incoming_time_to: '',

				user_id: '',
				event_no: '',
				event_type: '',
				customer_type: '',
				receptionist: '',
				status: '',

				page_no: 1,
                page_size: 20
			},
			customerParams: {
				phone: '',
			},
			userId: '',
			isShowRecordLink: false,
			loading: false
		}
	},
	methods: {
		...mapActions(['EVENT_RECEPTIONIST', 'EVENT_CUSTOMER_EXPORT', 'EVENT_CUSTOMER_LIST', 'CUSTOMER_ID']),
		getReceptionist() {
			this.EVENT_RECEPTIONIST({headers: {Authorization: 'Basic d2ViLWFwcDo='}}).then(res => {});
		},
		getCustomerId() {
			this.CUSTOMER_ID({params: this.customerParams, headers: {Authorization: 'Basic d2ViLWFwcDo='}}).then(res => {
				if (res) {
					this.userId = res.userId;
				}
			});
		},
		getList() {
			this.loading = true;

			let params = {};
            for(let i in this.params) {
                if (!isEmpty(this.params[i])) {
                    params[i] = this.params[i];
                }
            }
            delete params.timeRange;

			this.EVENT_CUSTOMER_LIST({params: params, headers: {Authorization: 'Basic d2ViLWFwcDo='}}).then(res => {
				this.loading = false;
			});
		},
		getExport() {
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
			this.EVENT_CUSTOMER_EXPORT(payload).then(res => {});
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
			this.params.incoming_time_from = '';
			this.params.incoming_time_to = '';
			this.params.page_no = 1;
			this.getList();
		},
		searchCustomerId(form) {
			this.$refs[form].validate((valid) => {
                if (valid) {
                	this.isShowRecordLink = true;
                	this.getCustomerId();
                } else {
                    return false;
                }
            });
		},
		resetCustomerId(form) {
			this.$refs[form].resetFields();
			this.isShowRecordLink = false;
		},
		getTime,
		getTimestamp,
		handlePageChange
	},
	mounted() {
		this.getList();
		this.getReceptionist();
	}
}