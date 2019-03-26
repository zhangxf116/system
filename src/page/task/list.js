import html from './list.html';
import {mapState, mapActions} from 'vuex';

import {isEmpty, handlePageChange, getTime, getBeforeDate, getEndTime} from '@/kit/common';
import {taskCategory, userRankList, pageSizes} from '@/kit/data.js';

export default {
	template: html,
	computed: {
		...mapState({
			task: state => state.AgentTaskController,
			taskTypeList: state => state.AgentTaskController.typeList,
			agentList: state => state.AgentController.list
		})
	},
	data() {
		return {
			pageSizes: pageSizes,
			taskCategory: taskCategory,
			taskData: {
				timeRange: [],
				taskTypeId: '',
				taskCategory: taskCategory.pending,

				agentId: '',
				startTimeFrom: '',
				startTimeTo: '',

				userRank: '',
				userName: '',
				userPhone: '',

				pageNo: 1,
                pageSize: 20
			},
			userRankList: userRankList,
			loading: false,
		}
	},
	methods: {
		...mapActions(['AGENT_TASK_LIST', 'AGENT_TASK_TYPE', 'AGENT_LIST']),
		getTaskList() {
			this.loading = true;

			let body = {};
            for(let i in this.taskData) {
                if (!isEmpty(this.taskData[i])) {
                    body[i] = this.taskData[i];
                }
            }

            delete body.timeRange;

            let payload = {
                body: body,
                headers: {
                    Authorization: 'Basic d2ViLWFwcDo='
                }
            };
            this.AGENT_TASK_LIST(payload).then(res => { 
                this.loading = false;
            });
			
		},
		getTaskType() {
            this.AGENT_TASK_TYPE({params: {with_count: false}, headers: {Authorization: 'Basic d2ViLWFwcDo='}}).then(res => {});
		},
		getAgentList() {
            this.AGENT_LIST({params: {role_id: 'AGENT_MEMBER'}, headers: {Authorization: 'Basic d2ViLWFwcDo='}}).then(res => {});
		},
		search(form) {
			this.$refs[form].validate((valid) => {
                if (valid) {
                	this.taskData.pageNo = 1;
                    this.getTaskList();
                } else {
                    return false;
                }
            });
		},
        initializeTime() {
            this.taskData.timeRange.push(getBeforeDate(30), getEndTime());
            this.taskData.startTimeFrom  = new Date(getBeforeDate(30)).getTime();
            this.taskData.startTimeTo = getEndTime();
        },
		reset(form) {
			this.$refs[form].resetFields();
			
			this.initializeTime();
			this.taskData.pageNo = 1;
			this.getTaskList();
		},
		getTime,
		handlePageChange
	},
	mounted() {
        this.initializeTime();
		/** 获取任务类型 **/
		this.getTaskType();
		/** 获取经纪人列表 **/
		this.getAgentList();
		/** 获取任务列表 **/
		this.getTaskList();
	}
}