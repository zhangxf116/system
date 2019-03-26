import html from './salary-release.html';
import {mapState, mapActions} from 'vuex';

import {handlePageChange} from '@/kit/common';
import { pageSizes } from '@/kit/data';

export default {
	template: html,
	computed: {
		...mapState({
			info: state => state.CustomerController.info,
			payment: state => state.SalaryController.payment
		})
	},
	data() {
		return {
			pageSizes: pageSizes,
			salaryReleaseData: {
				user_id: this.$route.params.userId,

				page_no: 1,
                page_size: 20
			},
			loading: false
		}
	},
	methods: {
		...mapActions(['SALARY_PAYMENT_LIST', 'CUSTOMER_INFO']),
		getSalaryReleaseList() {
			this.loading = true;
			this.SALARY_PAYMENT_LIST({params: this.salaryReleaseData, headers: {Authorization: 'Basic d2ViLWFwcDo='}}).then(res => { this.loading = false; });
		},
		getCustomerInfo() {
			this.CUSTOMER_INFO({params: {user_id: this.$route.params.userId}, headers: {Authorization: 'Basic d2ViLWFwcDo='}}).then(res => {});
		},
		handlePageChange
	},
	mounted() {
		this.getCustomerInfo();
		this.getSalaryReleaseList();
	}
}