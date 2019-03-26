import html from './index.html';
import {mapState, mapActions} from 'vuex';

import {isEmpty, getKeyValue, handlePageChange, getZeroTime, getEndTime, getOneDayLong, getTimestamp, uuid} from '@/kit/common';
import {taskCategory, userRankList, pageSizes,recordWay} from '@/kit/data.js';

import lxgsCall from '@/component/call';

export default {
	template: html,
	components: {
		[lxgsCall.name]: lxgsCall
    },
    computed: {
		...mapState({
			isTel: state => state.CallCenterController.isTel
		})
	},
	data() {

		return {
            recordWay: recordWay,
			userRankList: userRankList,
			pageSizes: pageSizes,
			selectedDay: 'today',
			timeRange: [],
			taskData: {				
				taskTypeId: '14',
				taskCategory: taskCategory.pending,

				contactStatus: 0,

				from: getZeroTime(),
				to: getEndTime(),

				userRank: '',

				pageNo: 1,
                pageSize: 20
			},
			completeTaskData: {
				taskId: '',
				taskTypeId: '',
				userId: '',

				lineConnected: false,
                telConnected: false,
				wxAdded: false,
				notTrace: false,
				contactFailed: false,

                communicateMethod: '',
				comment: ''
			},
			isShowTaskPopup: false,
			completeLoading: false,
			claimLoading: false,

			task: wsTask,
			taskTypeList: wsTaskType,

			delayTaskData: {
				taskId: '',
				userId: '',
				remindTime: '',
				remindComment: '',

				communicateMethod: ''
			},
			delayTaskRules: {
				remindTime: [{
					required: true, message: '请选择跟踪时间', trigger: 'blur'
				}],
				remindComment: [{
					required: true, message: '请填写提醒内容', trigger: 'blur'
				}],

				communicateMethod: [{
					required: true, message: '请选择对应的沟通方式', trigger: 'blur'
				}]
			},
			isShowDelayTask: false,
			disableOptions: {
				disabledDate: time => {
					return time.getTime() < getTimestamp() - getOneDayLong();
				},
			},
		}
	},
	methods: {
		...mapActions(['AGENT_TASK_COMPLETE', 'DELAY_TASK', 'RECORD_ADD', 'AGENT_TASK_CLAIM', 'CALL_IS_TEL']),
		getTaskListWS() {
			let myArguments = {};
			for(let i in this.taskData) {
				if (!isEmpty(this.taskData[i])) {
                	myArguments[i] = this.taskData[i];
				}
            }
			if (myArguments.taskTypeId !== '00') { delete  myArguments.contactStatus; }

			let taskBody = {
				id: uuid(),
				path: '/agent-tasks-with-types',
				arguments: myArguments
			};

           	clinet.ws.send(JSON.stringify(taskBody));
		},
		getTime(value) {			
			if(value && value.length === 2) {
				this.taskData.from = value[0];
				this.taskData.to = value[1];
			} else {
				this.taskData.from = '';
				this.taskData.to = '';

				this.timeRange = [];
			}
			
			this.selectedDay = '';

			if(value === 'yestoday') {
				this.taskData.from = getZeroTime() - getOneDayLong();
				this.taskData.to = getEndTime() - getOneDayLong();

				this.selectedDay = value;
			}
			if(value === 'today') {
				this.taskData.from = getZeroTime();
				this.taskData.to = getEndTime();

				this.selectedDay = value;
			}
			if(value === 'tommorrow') {
				this.taskData.from = getZeroTime() + getOneDayLong();
				this.taskData.to = getEndTime() + getOneDayLong();

				this.selectedDay = value;
			}
			this.taskData.pageNo = 1;
			this.getTaskListWS();
		},
		claimTask() {
			this.claimLoading = true;
			this.$confirm('确认认领资源', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
	            this.AGENT_TASK_CLAIM({headers: {Authorization: 'Basic d2ViLWFwcDo='}}).then(res => {
	            	this.claimLoading = false;
					if (res === '0') {
	            		this.$message({
							message: '认领成功，请在新分配任务-未联系中查看',
							type: 'success'
						});
	            	}
	            });

            }).catch(() => {});
		},
		delayTask(form) {
			let body = {};
			for(let i in this.delayTaskData) {
                if (!isEmpty(this.delayTaskData[i])) {
                    body[i] = this.delayTaskData[i];
                }
            }
			delete body.communicateMethod;
			this.DELAY_TASK({body: body, headers: {Authorization: 'Basic d2ViLWFwcDo='}}).then(res => {
            	if (res === '0') {
            		this.isShowDelayTask = false;
            		this.$refs[form].resetFields();
            		this.$message({
						message: '延迟成功',
						type: 'success'
					});

					this.taskData.pageNo = 1;
					this.getTaskListWS();
            	}
            });
		},
		setComplete(body) {
			this.completeLoading = true;
            this.AGENT_TASK_COMPLETE({body: body, headers: {Authorization: 'Basic d2ViLWFwcDo='}}).then(res => {
            	this.completeLoading = false;
            	this.isShowTaskPopup = false;

            	this.completeTaskData.taskId = '';
            	this.completeTaskData.taskTypeId = '';
            	this.completeTaskData.userId = '';

            	this.completeTaskData.lineConnected = false;
                this.completeTaskData.telConnected = false;
            	this.completeTaskData.wxAdded = false;
            	this.completeTaskData.notTrace = false;
            	this.completeTaskData.contactFailed = false;

            	this.completeTaskData.comment = '';
                this.completeTaskData.communicateMethod = '';

            	if (res === '0') {
            		this.$message({
						message: '操作成功',
						type: 'success'
					});
            		this.taskData.pageNo = 1;
					this.getTaskListWS();
            	}
            });
		},
		complete(taskId, taskTypeId, userId) {
			this.completeTaskData.taskId = taskId;
			this.completeTaskData.taskTypeId = taskTypeId;
			this.completeTaskData.userId = userId;

			this.isShowTaskPopup = true;
		},
		submitTask() {
			if (isEmpty(this.completeTaskData.comment)) {
                this.$message.error('请填写注记内容');
                return;
            }

            if(this.completeTaskData.taskTypeId === '00'){
                if (this.completeTaskData.lineConnected || this.completeTaskData.telConnected || this.completeTaskData.wxAdded || this.completeTaskData.notTrace || this.completeTaskData.contactFailed) {
                    if (this.completeTaskData.contactFailed) {
                        this.completeTaskData.comment = '未取得联系 - ' + this.completeTaskData.comment;
                    }
                    if(this.completeTaskData.lineConnected|| this.completeTaskData.notTrace || this.completeTaskData.contactFailed){
                        this.completeTaskData.communicateMethod = this.recordWay[0].key;
                    }
                    if(this.completeTaskData.wxAdded){
                        this.completeTaskData.communicateMethod = this.recordWay[1].key;
                    }
                    if(this.completeTaskData.telConnected){
                        this.completeTaskData.communicateMethod = this.recordWay[2].key;
                    }
                    this.setComplete(this.completeTaskData);
                } else {
                    this.$message.error('请勾选沟通结果');
                    return;
                }
            } else {
            	if (isEmpty(this.completeTaskData.communicateMethod)) {
                    this.$message.error('请勾选沟通方式');
                    return;
                } else {
                	this.setComplete(this.completeTaskData);
                }
            }
		},
		submitDelayTask(form) {
			this.$refs[form].validate((valid) => {
                if (valid) {
                	/** 同步历史注记 **/
                	this.RECORD_ADD({body: {userId: this.delayTaskData.userId, communicateMethod: this.delayTaskData.communicateMethod, comment: this.delayTaskData.remindComment}, headers: {Authorization: 'Basic d2ViLWFwcDo='}}).then(res => {});

                	/** 延迟跟踪提醒 **/
                	this.delayTask(form);
                } else {
                    return false;
                }
            });
		},
		showDelayTask(taskId, userId) {
			this.isShowDelayTask = true;
			
			this.delayTaskData.taskId = taskId;
			this.delayTaskData.userId = userId;
		},
		/** 是否配置固话 **/
		getTelType() {
			this.CALL_IS_TEL({headers: {Authorization: 'Basic d2ViLWFwcDo='}}).then(res => {});
		},
		skip() {
			this.$router.push({name: 'task-history'});
		},

		handlePageChange
	},
	mounted() {
		if (clinet.ws && clinet.ws.readyState === 0) {
			/** ws 连接中 **/
		} else if(clinet.ws && clinet.ws.readyState === 1) {
			/** ws 连接成功 **/
			this.getTaskListWS();
		} else {
			clinetInit();
		}

		/** 是否配置固话 **/
		this.getTelType();
	}
}