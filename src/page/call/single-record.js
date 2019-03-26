import html from './single-record.html';
import {mapState, mapActions} from 'vuex';

import {isEmpty, handlePageChange} from '@/kit/common';
import {pageSizes} from '@/kit/data';

export default {
	template: html,
	computed: {
		...mapState({
			record: state => state.CallCenterController.record,
		})
	},
	data() {
		return {
			pageSizes: pageSizes,
			params: {
				user_id: this.$route.params.userId,

				page_no: 1,
                page_size: 20
			},
			loading: false
		}
	},
	methods: {
		...mapActions(['CALL_RECORD']),
		getList() {
			this.loading = true;

            let payload = {
                params: this.params,
                headers: {
                    Authorization: 'Basic d2ViLWFwcDo='
                }
            };
            this.CALL_RECORD(payload).then(res => { 
                this.loading = false;
            });
			
		},
		handlePageChange
	},
	mounted() {
		this.getList();
	}
}