import html from './return-fee-record.html';
import {mapState, mapActions} from 'vuex';

import {isEmpty, handlePageChange} from '@/kit/common';
import {pageSizes} from '@/kit/data.js';

export default {
	template: html,
	computed: {
		...mapState({
			returnFeeRecord: state => state.CustomerController.returnFeeRecord,
		})
	},
	data() {
		return {
			pageSizes: pageSizes,
			returnFeeData: {
				user_id: this.$route.params.customerId,

				page_no: 1,
                page_size: 20
			},
			loading: false,
		}
	},
	methods: {
		...mapActions(['RETURN_FEE_LIST']),
		getReturnFeeList() {
			this.loading = true;

			let params = {};
            for(let i in this.returnFeeData) {
                if (!isEmpty(this.returnFeeData[i])) {
                    params[i] = this.returnFeeData[i];
                }
            }

            let payload = {
                params: params,
                headers: {
                    Authorization: 'Basic d2ViLWFwcDo='
                }
            };
            this.RETURN_FEE_LIST(payload).then(res => { 
                this.loading = false;
            });
		},
		handlePageChange
	}
}