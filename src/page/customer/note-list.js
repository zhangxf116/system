import html from './note-list.html';
import {mapActions, mapState} from 'vuex';

import {handlePageChange} from '@/kit/common';
import {pageSizes} from '@/kit/data';

export default {
	template: html,
	computed: {
		...mapState({
			record: state => state.CustomerRecordController,
		})
	},
	data() {
		return {
			pageSizes: pageSizes,
			historyRecordData: {
				user_id: this.$route.params.customerId,

				page_no: 1,
                page_size: 20
			},
			loading: false,
		}
	},
	methods: {
		...mapActions(['RECORD_HISTORY']),
		getHistoryRecordList() {
			this.loading = true;
			this.RECORD_HISTORY({params: this.historyRecordData, headers: {Authorization: 'Basic d2ViLWFwcDo='}}).then(res => { this.loading = false; });
		},
		handlePageChange
	},
	mounted() {
		this.getHistoryRecordList();
	}
}