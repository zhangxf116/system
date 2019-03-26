import html from './index.html';
import {mapState, mapActions} from 'vuex';

import {isEmpty, handlePageChange, getTime} from '@/kit/common';

import {userRankList, pageSizes} from '@/kit/data';

import lxgsCall from '@/component/call';

export default {
	template: html,
	components: {
		[lxgsCall.name]: lxgsCall
    },
	computed: {
		...mapState({
			customer: state => state.AgentAssignmentController.customer,
			sourceList: state => state.CustomerController.sourceList,
			isTel: state => state.CallCenterController.isTel
		})
	},
	data() {
		return {
			pageSizes: pageSizes,
			params: {
				/** 自定义参数 **/
				timeRange: [],

				self: true,

                match_time_from: '',
                match_time_to: '',

				sort: 'COMMENT_TIME',
				order: '1',

				user_name: '',
				nickname: '',
				user_phone: '',
				referrer_phone: '',
				weixin: '',
				is_referrer: '',
				source: '',
				rank: '',
                not_contacted: '',

				page_no: 1,
                page_size: 20
			},
			referralData: {
				referrerId: '',
				referralPhone: '',
				referralName: ''
			},
			referralDataRules: {
				referralPhone: [{
					required: true, message: '请填写被邀请人手机号', trigger: 'blur'
				}, {
					pattern: /^1[0-9]{10}$/,  message: '手机号不正确', trigger: 'blur'
				}],
				referralName: [{
					required: true, message: '请填写被邀请人姓名', trigger: 'blur'
				}]
			},
			userRankList: userRankList,
			currentReferrerName: '',
			loading: false,
			isShowReferral: false
		}
	},
	methods: {
		...mapActions(['CUSTOMER_LIST', 'SOURCE_LIST', 'CUSTOMER_REFERRAL', 'CALL_IS_TEL']),
		getList() {
			this.loading = true;

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
                    Authorization: 'Basic d2ViLWFwcDo='
                }
            };
            this.CUSTOMER_LIST(payload).then(res => { 
                this.loading = false;
            });
			
		},
		getSourceList() {
			let payload = {
                headers: {
                    Authorization: 'Basic d2ViLWFwcDo='
                }
            };
            this.SOURCE_LIST(payload).then(res => {});
		},
		/** 是否配置固话 **/
		getTelType() {
			this.CALL_IS_TEL({headers: {Authorization: 'Basic d2ViLWFwcDo='}}).then(res => {});
		},
		openReferral(userId, userName) {
			this.referralData.referrerId = userId;
			this.currentReferrerName = userName;

			this.isShowReferral = true;
		},
		submitReferral(form) {
			this.$refs[form].validate((valid) => {
                if (valid) {
		            let payload = {
		                body: this.referralData,
		                headers: {
		                    Authorization: 'Basic d2ViLWFwcDo='
		                }
		            };
		            this.CUSTOMER_REFERRAL(payload).then(res => {
		            	if (res === '0') {
		            		this.$message({
								message: '推荐成功',
								type: 'success'
							});
		            	}

		            	this.closeReferral(form);
		            });
                } else {
                    return false;
                }
            });
		},
		closeReferral(form) {
			this.isShowReferral = false;
		    this.$refs[form].resetFields();
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
			this.params.match_time_from = '';
			this.params.match_time_ = '';

			this.params.page_no = 1;

			this.getList();
		},
		sort(params) {
			if (params.prop === 'lastContactTime') {
				this.params.sort = 'COMMENT_TIME';
			}
			if (params.prop === 'registerTime') {
				this.params.sort = 'REGISTER_TIME';
			}
			if (params.prop === 'matchTime') {
				this.params.sort = 'MATCH_TIME';
			}

			if (params.order === 'ascending') {
				this.params.order = '0';
			}
			if (params.order === 'descending') {
				this.params.order = '1';
			}
			this.getList();
		},
		getTime,
		handlePageChange
	},
	mounted() {
		/** 获取客户列表 **/
		this.getList();

		/** 获取来源列表 **/
		// this.getSourceList();

		/** 是否配置固话 **/
		this.getTelType();
	}
}