import html from './induction-departure-record.html';
import {mapState, mapActions} from 'vuex';

import {isEmpty, handlePageChange} from '@/kit/common';
import {pageSizes} from '@/kit/data.js';

export default {
	template: html,
	computed: {
		...mapState({
			onboardingRecord: state => state.CustomerController.onboardingRecord,
		})
	},
	data() {
		return {
			pageSizes: pageSizes,
			onboardingData: {
				user_id: this.$route.params.customerId,

				page_no: 1,
                page_size: 20
			},
			loading: false,
		}
	},
	methods: {
		...mapActions(['ONBOARDING_LIST']),
		getOnboardingList() {
			this.loading = true;

			let params = {};
            for(let i in this.onboardingData) {
                if (!isEmpty(this.onboardingData[i])) {
                    params[i] = this.onboardingData[i];
                }
            }

            let payload = {
                params: params,
                headers: {
                    Authorization: 'Basic d2ViLWFwcDo='
                }
            };
            this.ONBOARDING_LIST(payload).then(res => { 
                this.loading = false;
            });
		},
		handlePageChange
	}
}