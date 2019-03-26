import html from './dock-station.html';
import {mapState, mapActions} from 'vuex';

import {isEmpty, handlePageChange, hasRole} from '@/kit/common';
import {pageSizes} from '@/kit/data';

export default {
	template: html,
	computed: {
		...mapState({
			pickUpRecord: state => state.CustomerController.pickUpRecord,
		})
	},
	data() {
		return {
			pageSizes: pageSizes,
			pickUpData: {
				user_id: this.$route.params.customerId,

				page_no: 1,
                page_size: 20
			},
			loading: false,
		}
	},
	methods: {
		...mapActions(['PICKUP_LIST', 'CANCEL_PICK_UP']),
		getPickUpList() {
			this.loading = true;

			let params = {};
            for(let i in this.pickUpData) {
                if (!isEmpty(this.pickUpData[i])) {
                    params[i] = this.pickUpData[i];
                }
            }

            let payload = {
                params: params,
                headers: {
                    Authorization: 'Basic d2ViLWFwcDo='
                }
            };
            this.PICKUP_LIST(payload).then(res => { 
                this.loading = false;
            });
		},
		/** 取消预约 **/
		cancelPickUp(pickUpId) {
			this.$confirm('确定是否取消接站？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
				
            	let payload = {
					body: {pickUpId: pickUpId},
	                headers: {
	                    Authorization: 'Basic d2ViLWFwcDo='
	                }
	            };
	            this.CANCEL_PICK_UP(payload).then(res => {
	            	if (res === '0') {
	            		this.$message({
							message: '取消成功',
							type: 'success'
						});
						this.getPickUpList();
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