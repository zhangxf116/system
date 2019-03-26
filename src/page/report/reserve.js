import html from './reserve.html';
import {mapState, mapActions} from 'vuex';

import {isEmpty, handlePageChange, hasRole, getTime} from '@/kit/common';
import {pageSizes} from '@/kit/data';

export default {
	template: html,
	computed: {
		...mapState({
			reservation: state => state.SummaryController.reservation,
			agentList: state => state.AgentController.list,
			pickupAll: state => state.ReservationController.pickupAll
		})
	},
	data() {
		return {
			pageSizes: pageSizes,
			paramsData: {
				timeRange: [],
				reserveTimeRange: [],

				from: '',
				to: '',
				position_name: '',

				user_name: '',
				user_cellphone: '',

				agent_id: '',
				pick_up_party_id: '',

				reserve_time_from: '',
				reserve_time_to: '',

				operator_type: '',

				sort: 'COL_CREATE_TIME',
				order: 'DESC',

				need_pre_reserve: false,

				page_no: 1,
                page_size: 20
			},
			loading: false,
			hasAgent: false
		}
	},
	methods: {
		...mapActions(['AGENT_LIST', 'SUMMARY_RESERVATION', 'RESERVE_PICKUP_ALL']),
		getList() {
			this.loading = true;

			let params = {};
            for(let i in this.paramsData) {
                if (!isEmpty(this.paramsData[i])) {
                    params[i] = this.paramsData[i];
                }
            }
            delete params['timeRange'];
            delete params['reserveTimeRange'];

            let payload = {
                params: params,
                headers: {
                    Authorization: 'Basic d2ViLWFwcDo='
                }
            };
            this.SUMMARY_RESERVATION(payload).then(res => { 
                this.loading = false;
            });
			
		},
		getAgentList() {
            this.AGENT_LIST({params: {role_id: 'AGENT_MEMBER'}, headers: {Authorization: 'Basic d2ViLWFwcDo='}}).then(res => {});
		},
		getAllpickup() {
            this.RESERVE_PICKUP_ALL({headers: {Authorization: 'Basic d2ViLWFwcDo='}}).then(res => {});
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
		reset(form) {
			this.$refs[form].resetFields();
			this.paramsData.from = '';
			this.paramsData.to = '';
			this.paramsData.reserve_time_from = '';
			this.paramsData.reserve_time_to = '';

			this.paramsData.page_no = 1;
			this.getList();
		},
		sort(params) {
			if (params.prop === 'createTime') {
				this.paramsData.sort = 'COL_CREATE_TIME';
			}
			if (params.prop === 'pickUpTime') {
				this.paramsData.sort = 'COL_JIEZHAN_DATE';
			}
			if (params.prop === 'reserveTime') {
				this.paramsData.sort = 'COL_RESERVE_DATE';
			}

			if (params.prop === 'interviewTime') {
				this.paramsData.sort = 'COL_INTERVIEW_DATE';
			}

			if (params.order === 'ascending') {
				this.paramsData.order = 'ASC';
			}
			if (params.order === 'descending') {
				this.paramsData.order = 'DESC';
			}
			this.getList();
		},
		hasRole,
		getTime,
		handlePageChange
	},
	mounted() {
		this.getList();
		this.getAgentList();
		this.getAllpickup();
	}
}