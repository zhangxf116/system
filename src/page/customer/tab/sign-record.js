import html from './sign-record.html';
import {mapState, mapActions} from 'vuex';

import {isEmpty, handlePageChange} from '@/kit/common';
import {pageSizes} from '@/kit/data.js';

export default {
	template: html,
	computed: {
		...mapState({
			signinRecord: state => state.CustomerController.signinRecord,
		})
	},
	data() {
		return {
			pageSizes: pageSizes,
			signinData: {
				user_id: this.$route.params.customerId,

				page_no: 1,
                page_size: 20
			},
			loading: false,
		}
	},
	methods: {
		...mapActions(['SIGNIN_LIST']),
		getSigninList() {
			this.loading = true;

			let params = {};
            for(let i in this.signinData) {
                if (!isEmpty(this.signinData[i])) {
                    params[i] = this.signinData[i];
                }
            }

            let payload = {
                params: params,
                headers: {
                    Authorization: 'Basic d2ViLWFwcDo='
                }
            };
            this.SIGNIN_LIST(payload).then(res => { 
                this.loading = false;
            });
		},
		handlePageChange
	}
}