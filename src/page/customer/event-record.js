import html from './event-record.html';
import {mapState, mapActions} from 'vuex';

import {isEmpty, handlePageChange} from '@/kit/common';

import {pageSizes} from '@/kit/data';

export default {
	template: html,
	computed: {
		...mapState({
			event: state => state.ServiceEventController.event,
			info: state => state.CustomerController.info
		})
	},
	data() {
		return {
			pageSizes: pageSizes,
			params: {
				incoming_phone: this.$route.query.phone,
				user_id: this.$route.query.userId,

				page_no: 1,
                page_size: 20
			},
			createParams: {
				content: '',
				eventType: '',
				incomingPhone: this.$route.query.phone,
				problemType: '',
				receptionTime: this.$route.query.recepTime,
				status: '',
				userId: this.$route.query.userId,
			},
			registParams: {
				idNo: '',
				name: '',
				phone: '',
				sex: '',
				source: ''
			},
			registPop: false,
			loading: false
		}
	},
	methods: {
		...mapActions(['EVENT_CUSTOMER_LIST', 'EVENT_CUSTOMER', 'CUSTOMER_INFO', 'EVENT_REGIST']),
		getList() {
			this.loading = true;

			let params = {};
            for(let i in this.params) {
                if (!isEmpty(this.params[i])) {
                    params[i] = this.params[i];
                }
            }

			this.EVENT_CUSTOMER_LIST({params: params, headers: {Authorization: 'Basic d2ViLWFwcDo='}}).then(res => {
				this.loading = false;
			});
		},
		getCustomerInfo() {
			this.CUSTOMER_INFO({params: {user_id: this.$route.query.userId}, headers: {Authorization: 'Basic d2ViLWFwcDo='}}).then(res => {});
		},
		changeProblemType() {
			this.createParams.problemType = '';
		},
		submit(status) {
			this.createParams.status = status;
			this.$refs["createParamsForm"].validate(valid => {
				if (valid) {
					let params = {};
		            for(let i in this.createParams) {
		                if (!isEmpty(this.createParams[i])) {
		                    params[i] = this.createParams[i];
		                }
		            }
					this.EVENT_CUSTOMER({body: params, headers: {Authorization: 'Basic d2ViLWFwcDo='}}).then(res => {
						if (res === '0') {
							if (status === 'COMPLETE') {
								this.$message({
									message: "该客户事件结案成功",
									type: "success",
									duration: 2000
								});
							}

							if (status === 'SUBMIT') {
								this.$message({
									message: "该客户事件创建成功",
									type: "success",
									duration: 2000
								});
							}
							this.$refs["createParamsForm"].resetFields();
							this.getList();
						}
					});
				} else {
					return false;
				}
			});
		},
		regist(form) {
			this.$refs[form].validate(valid => {
				if (valid) {
					let params = {};
		            for(let i in this.registParams) {
		                if (!isEmpty(this.registParams[i])) {
		                    params[i] = this.registParams[i];
		                }
		            }
					this.EVENT_REGIST({body: params, headers: {Authorization: 'Basic d2ViLWFwcDo='}}).then(res => {
						if (res === '0') {
							this.$message({
								message: "代注册成功",
								type: "success",
								duration: 2000
							});

							this.registPop = false;
						}
					});
				} else {
					return false;
				}
			});
		},
		close(form) {
			this.$refs[form].resetFields();
		},
		handlePageChange
	},
	mounted() {
		this.getList();

		if(this.$route.query.userId) {
			this.getCustomerInfo();
		}
	}
}