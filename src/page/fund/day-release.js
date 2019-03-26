import html from './day-release.html';
import {mapState, mapActions} from 'vuex';

import {handlePageChange} from '@/kit/common';
import { pageSizes } from '@/kit/data';

export default {
	template: html,
	computed: {
		...mapState({
			info: state => state.CustomerController.info,
			day: state => state.SalaryController.day
		})
	},
	data() {
		return {
			pageSizes: pageSizes,
			timeRange: [],
			params: {
				user_id: this.$route.params.userId,

				from: '',
				to: '',

				page_no: 1,
                page_size: 20
			},
			timeOption: {
				disabledDate(time) {
					let currentDate = (new Date()).getTime();
					let one = 30 * 24 * 3600 * 1000;
					let oneMonths = currentDate - one; 
					return time.getTime() > Date.now() || time.getTime() < oneMonths;
				}
			},
			loading: false
		}
	},
	methods: {
		...mapActions(['SALARY_DAY_LIST', 'CUSTOMER_INFO']),
		getList() {
			this.loading = true;
			this.SALARY_DAY_LIST({params: this.params, headers: {Authorization: 'Basic d2ViLWFwcDo='}}).then(res => { this.loading = false; });
		},
		getCustomerInfo() {
			this.CUSTOMER_INFO({params: {user_id: this.$route.params.userId}, headers: {Authorization: 'Basic d2ViLWFwcDo='}}).then(res => {});
		},
		getTime() {
			if (this.timeRange && this.timeRange.length === 2) {
				this.params.from = this.timeRange[0];
				this.params.to = this.timeRange[1];
			} else {
				this.params.from = '';
				this.params.to = '';
			}

			this.getList();
		},
		handlePageChange
	},
	mounted() {
		this.getCustomerInfo();
		this.getList();
	}
}