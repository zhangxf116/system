import html from './recommend-record.html';
import {mapState, mapActions} from 'vuex';

import {isEmpty, handlePageChange} from '@/kit/common';
import {pageSizes} from '@/kit/data.js';

export default {
	template: html,
	computed: {
		...mapState({
			referralRecord: state => state.CustomerController.referralRecord,
		})
	},
	data() {
		return {
			pageSizes: pageSizes,
			referralData: {
				user_id: this.$route.params.customerId,

				page_no: 1,
                page_size: 20
			},
			loading: false,
		}
	},
	methods: {
		...mapActions(['CUSTOMER_REFERRAL_LIST']),
		getReferralList() {
			this.loading = true;

			let params = {};
            for(let i in this.referralData) {
                if (!isEmpty(this.referralData[i])) {
                    params[i] = this.referralData[i];
                }
            }

            this.CUSTOMER_REFERRAL_LIST({params: params, headers: {Authorization: 'Basic d2ViLWFwcDo='}}).then(res => { 
                this.loading = false;
            });
		},
		handlePageChange
	}
}