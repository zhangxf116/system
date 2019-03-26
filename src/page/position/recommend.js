import html from './recommend.html';
import {mapState, mapActions} from 'vuex';

import {isEmpty, handlePageChange, getTime} from '@/kit/common';
import {positionTypeList, pageSizes} from '@/kit/data';

export default {
	template: html,
	computed: {
		...mapState({
			info: state => state.CustomerController.info,
			positionApplied: state => state.CustomerController.positionApplied,
			position: state => state.PositionController.position,
			cityList: state => state.PositionController.positionCityList,
			feature: state => state.PositionController.feature,
			
			pickupDate: state => state.ReservationController.pickupDate,
			pickupLocation: state => state.ReservationController.pickupLocation,
			toll: state => state.ReservationController.toll,
		})
	},
	data() {
		return {
			pageSizes: pageSizes,
			positionTypeList: positionTypeList,
			selectFeatures: [],
			positionData: {
				/** 自定义参数 **/
				timeRange: [],
				userId: this.$route.params.customerId,
				cityId: '',
				interviewDateFrom: '',
				interviewDateTo: '',
				positionListType: positionTypeList[1].key,
				features: [],
				positionName: '',
				salary: '',
				pageNo: 1,
                pageSize: 20
			},
			reserveData: {
				userId: this.$route.params.customerId,
				applyId: '',
				positionId: '',
				positionName: '',

				pickUpLocation: '',
				pickUpAddress: '',
				pickUpTime: '',

				longitude: '',
				latitude: '',
				source: localStorage.getItem('crm-source')
			},
			reserveRules: {
				pickUpLocation: [{
					required: true, message: '请选择约用户去哪里', trigger: 'blur'
				}],
				pickUpTime: [{
					required: true, message: '请先选择约到哪天', trigger: 'blur'
				}]
			},

			loading: false,
			isPreReserve: false,
			isShowReservePop: false,
			isShowFeaturePop: false
		}
	},
	methods: {
		...mapActions(['POSITION_LIST', 'CUSTOMER_INFO', 'POSITION_CITY', 'POSITION_APPLIED', 'RESERVE_PICKUP_DATE', 'RESERVE_PICKUP_LOCATION', 'RESERVE', 'POSITION_FEATURE', 'RESERVE_TOLL']),
		getPostionList() {
			this.loading = true;

			let body = {};
            for(let i in this.positionData) {
                if (!isEmpty(this.positionData[i])) {
                    body[i] = this.positionData[i];
                }
            }

            delete body.timeRange;
            
            let payload = {
                body: body,
                headers: {
                    Authorization: 'Basic d2ViLWFwcDo='
                }
            };
            this.POSITION_LIST(payload).then(res => { 
                this.loading = false;
            });
			
		},
		getCustomerInfo() {
			let payload = {
				params: {user_id: this.$route.params.customerId, task_type_id: this.$route.query.taskTypeId},
				headers: {
                    Authorization: 'Basic d2ViLWFwcDo='
                }
			};
			this.CUSTOMER_INFO(payload).then(res => {});
		},
		getPositionApplied() {
			this.POSITION_APPLIED({params: {user_id: this.$route.params.customerId, position_type: 'ZX'}, headers: {Authorization: 'Basic d2ViLWFwcDo='}}).then(res => {});
		},
		getPostionCityList() {
			let payload = {
				headers: {
                    Authorization: 'Basic d2ViLWFwcDo='
                }
			};
			this.POSITION_CITY(payload).then(res => {});
		},
		getPostionFeature() {
			this.POSITION_FEATURE({headers: {Authorization: 'Basic d2ViLWFwcDo='}}).then(res => {});
		},

		/** 获取接站地址 **/
		getPickupAddress() {
			this.RESERVE_PICKUP_LOCATION({params: {position_id: this.reserveData.positionId}, headers: {Authorization: 'Basic d2ViLWFwcDo='}}).then(res => {});
		},
		setPickupAddress(valueO) {
			this.reserveData.pickUpLocation = valueO.location;
			this.reserveData.pickUpAddress = valueO.address;
			this.reserveData.longitude = valueO.longitude;
			this.reserveData.latitude = valueO.latitude;

			this.reserveData.pickUpTime = '';

			this.getPickupDate();
		},
		/** 获取接站时间 **/
		getPickupDate() {
            this.RESERVE_PICKUP_DATE({params: {position_id: this.reserveData.positionId, pick_up_address: this.reserveData.pickUpAddress}, headers: {Authorization: 'Basic d2ViLWFwcDo='}}).then(res => {});
		},
		/** 获取收费信息 **/
		getToll() {
			this.RESERVE_TOLL({params: {position_id: this.reserveData.positionId, pick_up_address: this.reserveData.pickUpAddress, pick_up_time: this.reserveData.pickUpTime}, headers: {Authorization: 'Basic d2ViLWFwcDo='}}).then(res => {});
		},
		/** 岗位预约 **/
		jobReserve(applyId, positionId, positionName, positionTypes, preReserve) {
			/** 如果是周薪职位 且用户没有签订周薪协议则不能推荐 **/
			for (let i in positionTypes) {
				if (positionTypes[i] === '周薪'  && !this.positionApplied.contractAgreed) {
					this.$message.error('用户没有同意周薪协议，暂不可直接推荐，请引导用户自主申请');
					return;
				}
			}

			this.isShowReservePop = true;

			this.reserveData.applyId = applyId;
			this.reserveData.positionId = positionId;
			this.reserveData.positionName = positionName;

			this.isPreReserve = preReserve;

			/** 获取接站地址 **/
			this.getPickupAddress();
		},
		/** 关闭岗位处理 popup **/
		closeReservePop() {
			this.isShowReservePop = false;
			this.resetReserve();
		},
		/** 重置预约数据 **/
		resetReserve() {
			this.reserveData.applyId = '';
			this.reserveData.positionId = '';
			this.reserveData.positionName = '';
			this.reserveData.pickUpLocation = '';
			this.reserveData.pickUpAddress = '';
			this.reserveData.pickUpTime = '';
			this.reserveData.longitude = '';
			this.reserveData.latitude = '';
		},
		/** 岗位预约提交 **/
		submitReserve(form) {
			this.$refs[form].validate(valid => {
				/** 调用预约接口 **/
				if (valid) {
					let body = {};
		            for(let i in this.reserveData) {
		                if (!isEmpty(this.reserveData[i])) {
		                    body[i] = this.reserveData[i];
		                }
		            }

		            if (this.$route.query.from === 'return-visit') {
		            	body['applyType'] = 'ASSISTANT';
		            }

		            this.RESERVE({body: body, headers: {Authorization: 'Basic d2ViLWFwcDo='}}).then(res => { 
		            	if (res === '0') {
		            		this.closeReservePop();
		            		this.$message({
								message: '预约成功',
								type: 'success'
							});
							this.getPostionList();
							this.resetReserve();
		            	}
		            });
				} else {

				}
			});
		},
		search(form) {
			this.$refs[form].validate((valid) => {
                if (valid) {
                	this.positionData.pageNo = 1;
                    this.getPostionList();
                } else {
                    return false;
                }
            });
		},
		reset(form) {
			this.$refs[form].resetFields();
			this.positionData.interviewDateFrom = '';
			this.positionData.interviewDateTo = '';

			this.positionData.pageNo = 1;
			this.getPostionList();
		},
		featureEvent(valueO, label) {
			for(let i of this.feature) {
				if (i.name === label) {
					for(let ii of i.features) {
						for(let iii in this.selectFeatures) {
							if ((valueO.id !== this.selectFeatures[iii].id) && (this.selectFeatures[iii].id === ii.id)) {
								this.selectFeatures.splice(iii, 1);
							}
						}
					}
				}
			}

			this.handleFeature();
		},
		tagEvent(tag) {
			this.selectFeatures.splice(tag, 1);

			this.handleFeature();
		},
		resetFeature() {
			this.selectFeatures = [];
			this.positionData.features = [];

			this.getPostionList();
		},
		handleFeature() {
			this.positionData.features = [];
			for(let tag of this.selectFeatures) {
				this.positionData.features.push(tag.id);
			}

			this.getPostionList();
		},

		back() {
			this.$router.go(-1);
		},
		tableRowClassName({row, rowIndex}) {
			if (row.applied) { return 'applied'; }
			return ''; 
		},
		getTime,
		handlePageChange
	},
	mounted() {
		if (this.$route.query.from != 'return-visit') {
			/** 获取客户信息 **/
			this.getCustomerInfo();
        }
		/** 获取城市列表 **/
		this.getPostionCityList();
		/** 获取岗位列表 **/
		this.getPostionList();
		/** 获取岗位特征 **/
		this.getPostionFeature();
		/** 查看是否申请过周薪岗位或签订周薪协议 **/
		this.getPositionApplied();
	}
}