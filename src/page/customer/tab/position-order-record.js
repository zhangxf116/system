import html from './position-order-record.html';
import {mapState, mapActions} from 'vuex';

import {isEmpty, handlePageChange, hasRole} from '@/kit/common';
import {pageSizes} from '@/kit/data.js';

export default {
	template: html,
	computed: {
		...mapState({
			reserveRecord: state => state.CustomerController.reserveRecord,
		})
	},
	data() {
		return {
			pageSizes: pageSizes,
			positionReserveData: {
				user_id: this.$route.params.customerId,

				page_no: 1,
                page_size: 20
			},
			loading: false,
		}
	},
	methods: {
		...mapActions(['RESERVE_LIST', 'CANCEL_RESERVE_POSITION']),
		getPositionReserveList() {
			this.loading = true;

			let params = {};
            for(let i in this.positionReserveData) {
                if (!isEmpty(this.positionReserveData[i])) {
                    params[i] = this.positionReserveData[i];
                }
            }

            let payload = {
                params: params,
                headers: {
                    Authorization: 'Basic d2ViLWFwcDo='
                }
            };
            this.RESERVE_LIST(payload).then(res => { 
                this.loading = false;
            });
		},
		/** 取消预约 **/
		cancelReserve(reserveId) {
			this.$confirm('确定是否取消此预约？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
				
            	let payload = {
					body: {reserveId: reserveId},
	                headers: {
	                    Authorization: 'Basic d2ViLWFwcDo='
	                }
	            };
	            this.CANCEL_RESERVE_POSITION(payload).then(res => {
	            	if (res === '0') {
	            		this.$message({
							message: '取消成功',
							type: 'success'
						});
						this.getPositionReserveList();
	            	} else {
	            		this.$message.error('取消失败');
	            	}
	            });
            }).catch(() => {});
		},
		hasRole,
		handlePageChange
	}
}