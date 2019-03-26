import html from './history.html';
import {mapState, mapActions} from 'vuex';

import {isEmpty, handlePageChange} from '@/kit/common';
import {taskCategory, userRankList, pageSizes} from '@/kit/data.js';

export default {
	template: html,
	computed: {
		...mapState({
			task: state => state.AgentTaskController,
			taskTypeList: state => state.AgentTaskController.typeList
		})
	},
	data() {
		return {
			pageSizes: pageSizes,
			timeRange: [],
			taskData: {
				taskTypeId: '14',
				taskCategory: taskCategory.history,

				startTimeFrom: '',
				startTimeTo: '',

				userRank: '',

				pageNo: 1,
                pageSize: 20
			},
			userRankList: userRankList,
			loading: false,
		}
	},
	methods: {
		...mapActions(['AGENT_TASK_LIST', 'AGENT_TASK_TYPE']),
		getTaskList() {
			this.loading = true;

			let body = {};
            for(let i in this.taskData) {
                if (!isEmpty(this.taskData[i])) {
                    body[i] = this.taskData[i];
                }
            }

            let payload = {
                body: body,
                headers: {
                    Authorization: 'Basic d2ViLWFwcDo='
                }
            };
            this.AGENT_TASK_LIST(payload).then(res => { 
                this.loading = false;

                this.getTaskType();
            });
			
		},
		getTaskType() {
			let payload = {
				params: {task_category: taskCategory.history, from: this.taskData.startTimeFrom, to: this.taskData.startTimeTo},
                headers: {
                    Authorization: 'Basic d2ViLWFwcDo='
                }
            };
            this.AGENT_TASK_TYPE(payload).then(res => {});
		},
		getTime(value) {
			if(value && value.length === 2) {
				this.taskData.startTimeFrom = value[0];
				this.taskData.startTimeTo = value[1];
			} else {
				this.taskData.startTimeFrom = '';
				this.taskData.startTimeTo = '';
			}
			this.getTaskList();
		},
		handlePageChange
	},
	mounted() {
		/** 获取任务类型 **/
		this.getTaskType();

		this.getTaskList();
	}
}