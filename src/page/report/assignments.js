import html from './assignments.html';
import {mapState, mapActions} from 'vuex';

import {handlePageChange} from '@/kit/common';
import { pageSizes } from '@/kit/data';

export default {
	template: html,
	computed: {
		...mapState({
			assignments: state => state.SummaryController.assignments,
		})
	},
	data() {
		return {
			pageSizes: pageSizes,
			assignmentsAgentData: {
				page_no: 1,
                page_size: 20
			},
			loading: false,
		}
	},
	methods: {
		...mapActions(['SUMMARY_ASSIGNMENTS']),
		getAssignmentsAgentList() {
			this.loading = true;
			
            this.SUMMARY_ASSIGNMENTS({params: this.assignmentsAgentData, headers: {Authorization: 'Basic d2ViLWFwcDo='}}).then(res => { 
                this.loading = false;
            });
			
		},
		handlePageChange
	},
	mounted() {
		/** 获取小职姐已分配的客户列表 **/
		this.getAssignmentsAgentList();
	}
}