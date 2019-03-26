import html from './salary-sign.html';
import {mapState, mapActions} from 'vuex';

import {handlePageChange} from '@/kit/common';
import { pageSizes } from '@/kit/data';

export default {
	template: html,
	computed: {
		...mapState({
			info: state => state.CustomerController.info,
			salarySignIn: state => state.SalaryController.signIn
		})
	},
	data() {
		return {
			pageSizes: pageSizes,
			/** 自定义参数 **/
			timeRange: [],
			salarySignInData: {
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
		...mapActions(['SALARY_SIGN_IN', 'SALARY_SIGN_IN_LIST', 'CUSTOMER_INFO']),
		getSalarySignInList() {
			this.loading = true;
			this.SALARY_SIGN_IN_LIST({params: this.salarySignInData, headers: {Authorization: 'Basic d2ViLWFwcDo='}}).then(res => { this.loading = false; });
		},
		getCustomerInfo() {
			this.CUSTOMER_INFO({params: {user_id: this.$route.params.userId}, headers: {Authorization: 'Basic d2ViLWFwcDo='}}).then(res => {});
		},
		getTime() {
			if (this.timeRange && this.timeRange.length === 2) {
				this.salarySignInData.from = this.timeRange[0];
				this.salarySignInData.to = this.timeRange[1];
			} else {
				this.salarySignInData.from = '';
				this.salarySignInData.to = '';
			}

			this.getSalarySignInList();
		},
		sign(work, time) {
			let message = '';
			if (work === true) { message = '确认帮用户补打上班卡？'; }
			if (work === false) { message = '确认帮用户补打下班卡？'; }
			this.$confirm(message, '补打卡', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
	            this.SALARY_SIGN_IN({body: {userId: this.$route.params.userId, day: time, work: work, remark: ''}, headers: {Authorization: 'Basic d2ViLWFwcDo='}}).then(res => {
	            	if (res === '0') {
	            		this.$message({
							message: '补打卡成功',
							type: 'success'
						});
						this.getSalarySignInList();
	            	}
	            });

            }).catch(() => {});
		},
		handlePageChange
	},
	mounted() {
		this.getCustomerInfo();
		this.getSalarySignInList();
	}
}