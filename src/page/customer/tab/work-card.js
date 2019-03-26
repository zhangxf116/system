import html from './work-card.html';
import {mapState, mapActions} from 'vuex';

import {isEmpty, handlePageChange} from '@/kit/common';
import {pageSizes} from '@/kit/data.js';

export default {
	template: html,
	computed: {
		...mapState({
            workCard: state => state.CustomerController.workCard,
		})
	},
	data() {
		return {
			pageSizes: pageSizes,
			params: {
                user_id: this.$route.params.customerId,

                page_no: 1,
                page_size: 20
			},
			loading: false,
            dialogVisible: false,
			imgUrl: ''
		}
	},
	methods: {
		...mapActions(['WORK_CRAD']),
		getList() {
            this.loading = true;

            let params = {};
            for(let i in this.params) {
                if (!isEmpty(this.params[i])) {
                    params[i] = this.params[i];
                }
            }

            let payload = {
                params: params,
                headers: {
                    Authorization: 'Basic d2ViLWFwcDo='
                }
            };
            this.WORK_CRAD(payload).then(res => {
                this.loading = false;
            });
		},
        imgShow(url) {
			this.imgUrl = url;
			this.dialogVisible = true;
		},
		handlePageChange
	}
}