import html from './index.html';

import {mapState, mapActions} from 'vuex';

import {isEmpty, handlePageChange, hasRole} from '@/kit/common';
import {applyStatusList, pageSizes} from '@/kit/data.js';

export default {
	template: html,
	computed: {
		...mapState({
			positionDetail: state => state.PositionController.positionDetail,
			info: state => state.CustomerController.info,
			positionApply: state => state.CustomerController.positionApply,
			applyRecordList: state => state.CustomerController.applyRecordList,

			positionApplied: state => state.CustomerController.positionApplied,

			pickupDate: state => state.ReservationController.pickupDate,
			pickupLocation: state => state.ReservationController.pickupLocation,
			toll: state => state.ReservationController.toll,
		})
	},
	data() {
		return {
			pageSizes: pageSizes,
			applyStatusList: applyStatusList,
			positionApplyData: {
				applyStatus: 1,
				userId: this.$route.params.customerId,
				positionName: '',
				closed: '',

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
			isShowReservePop: false,
			isShowApplyRecord: false
		}
	},
	methods: {
		...mapActions(['POSITION_APPLY_LIST', 'RESERVE_PICKUP_DATE', 'RESERVE_PICKUP_LOCATION', 'RESERVE', 'CANCEL_APPLY', 'APPLY_RECORD_LIST', 'RESERVE_TOLL', 'POSITION_DETAIL']),
		getPositionApplyList() {
			this.loading = true;

			let body = {};
            for(let i in this.positionApplyData) {
                if (!isEmpty(this.positionApplyData[i])) {
                    body[i] = this.positionApplyData[i];
                }
            }

            let payload = {
                body: body,
                headers: {
                    Authorization: 'Basic d2ViLWFwcDo='
                }
            };
            this.POSITION_APPLY_LIST(payload).then(res => { 
                this.loading = false;
            });
		},
		getPostionDetail(positionId) {
			this.POSITION_DETAIL({params: {position_id: positionId}, headers: {Authorization: 'Basic d2ViLWFwcDo='}}).then(res => {});
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
		jobReserve(applyId, positionId, positionName, positionTypes) {
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

			/** 获取接站方列表 **/
			this.getPickupAddress();

			/** 获取对应岗位详情 **/
			this.getPostionDetail(positionId);
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

		            this.RESERVE({body: body, headers: {Authorization: 'Basic d2ViLWFwcDo='}}).then(res => { 
		            	if (res === '0') {
		            		this.closeReservePop();
		            		this.$message({
								message: '预约成功',
								type: 'success'
							});
							this.getPositionApplyList();
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
                	this.positionApplyData.pageNo = 1;
                    this.getPositionApplyList();
                } else {
                    return false;
                }
            });
		},
		reset(form) {
			this.$refs[form].resetFields();
			this.positionApplyData.pageNo = 1;
            this.getPositionApplyList();
		},

		/** 取消申请 **/
		cancelApply(applyId) {
            this.$confirm('确定取消此工作申请？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
				
            	let payload = {
					body: {applyId: applyId},
	                headers: {
	                    Authorization: 'Basic d2ViLWFwcDo='
	                }
	            };
	            this.CANCEL_APPLY(payload).then(res => {
	            	this.isShowReservePop = false;
	            	if (res === '0') {
	            		this.$message({
							message: '取消成功',
							type: 'success'
						});
						this.getPositionApplyList();
	            	}
	            });
            }).catch(() => {});
		},

		/** 申请记录 **/
		applyRecord(applyId) {
			this.isShowApplyRecord = true;

			let payload = {
				params: {apply_id: applyId},
                headers: {
                    Authorization: 'Basic d2ViLWFwcDo='
                }
            };
            this.APPLY_RECORD_LIST(payload).then(res => {});
		},
		getStatus(name) {
			if (name === "applyStatus") {
				this.positionApplyData.closed = '';
			}

			if (name === "closed") {
				this.positionApplyData.applyStatus = '';
			}
			
			this.getPositionApplyList();
		},

		hasRole,
		handlePageChange
	},
	mounted() {
		/** 获取岗位申请列表 **/
		this.getPositionApplyList();
	}
}