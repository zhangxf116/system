import html from './focus-record.html';
import {mapState, mapActions} from 'vuex';

import {isEmpty, handlePageChange} from '@/kit/common';
import {pageSizes} from '@/kit/data';

export default {
	template: html,
	computed: {
		...mapState({
			followingRecord: state => state.CustomerController.followingRecord,
		})
	},
	data() {
		return {
			pageSizes: pageSizes,
			followingData: {
				user_id: this.$route.params.customerId,

				page_no: 1,
                page_size: 20
			},
			loading: false,
		}
	},
	methods: {
		...mapActions(['CUSTOMER_FOLLOWING']),
		getFocusList() {
			this.loading = true;

			let params = {};
            for(let i in this.followingData) {
                if (!isEmpty(this.followingData[i])) {
                    params[i] = this.followingData[i];
                }
            }

            this.CUSTOMER_FOLLOWING({params: params, headers: {Authorization: 'Basic d2ViLWFwcDo='}}).then(res => { 
                this.loading = false;
            });
		},
		handlePageChange
	}
}