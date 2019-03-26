import html from './detail.html';
import {mapState, mapActions} from 'vuex';
import {isEmpty, videoSource} from '@/kit/common';

export default {
	template: html,
	computed: {
		...mapState({
			info: state => state.CustomerController.info,
			positionDetail: state => state.PositionController.positionDetail,
			positionApplied: state => state.CustomerController.positionApplied,
			
			pickupDate: state => state.ReservationController.pickupDate,
			pickupLocation: state => state.ReservationController.pickupLocation,
			toll: state => state.ReservationController.toll,
		})
	},
	data() {
		return {
			chooseParams: 'pic',
			reserveData: {
				userId: this.$route.query.userId,
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

			isShowReservePop: false,
		}
	},
	methods: {
		...mapActions(['POSITION_DETAIL', 'POSITION_APPLIED', 'CUSTOMER_INFO', 'RESERVE_PICKUP_DATE', 'RESERVE_PICKUP_LOCATION', 'RESERVE', 'RESERVE_TOLL']),
		getPostionDetail() {
			let payload = {
				params: {position_id: this.$route.params.positionId},
				headers: {
                    Authorization: 'Basic d2ViLWFwcDo='
                }
			};
			this.POSITION_DETAIL(payload).then(res => {});
		},
		getPositionApplied() {
			this.POSITION_APPLIED({params: {user_id: this.$route.query.userId, position_type: 'ZX'}, headers: {Authorization: 'Basic d2ViLWFwcDo='}}).then(res => {});
		},
		getCustomerInfo() {
			let payload = {
				params: {user_id: this.$route.query.userId},
				headers: {
                    Authorization: 'Basic d2ViLWFwcDo='
                }
			};
			this.CUSTOMER_INFO(payload).then(res => {});
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
		jobReserve(positionId, positionName) {
			/** 如果是周薪职位 且用户没有签订周薪协议则不能推荐 **/
			for (let i in this.positionDetail.positionTypes) {
				if ( this.positionDetail.positionTypes[i] === '周薪'  && !this.positionApplied.contractAgreed) {
					this.$message.error('用户没有同意周薪协议，暂不可直接推荐，请引导用户自主申请');
					return;
				}
			}
			
			this.isShowReservePop = true;

			this.reserveData.positionId = positionId;
			this.reserveData.positionName = positionName;

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

		            this.RESERVE({body: body, headers: {Authorization: 'Basic d2ViLWFwcDo='}}).then(res => { 
		            	if (res === '0') {
		            		this.closeReservePop();
		            		this.$message({
								message: '预约成功',
								type: 'success'
							});
							this.resetReserve();
		            	}
		            });
				} else {

				}
			});
		},
		copy() {
			this.$message({
				message: '复制成功',
				type: 'success'
			});
		},
		videoSource
	},
	mounted() {
		/** 获取岗位列表 **/
		this.getPostionDetail();

		if(!isEmpty(this.$route.query.userId)) {
			this.getCustomerInfo();
			/** 查看是否申请过周薪岗位或签订周薪协议 **/
			this.getPositionApplied();
		}
	}
}