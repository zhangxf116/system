import html from './detail.html';

/** 引入Tab 内容 **/
import postion from'./tab/index.js';
import positionOrderRecord from'./tab/position-order-record.js';
import dockStation from './tab/dock-station.js';
import signRecord from './tab/sign-record.js';
import inductionDepartureRecord from './tab/induction-departure-record.js';
import returnFeeRecord from './tab/return-fee-record.js';
import recommendRecord from './tab/recommend-record.js';
import focusRecord from './tab/focus-record.js';
import workCard from './tab/work-card.js';

import {mapState, mapActions} from 'vuex';

import {isEmpty, refresh, getKeyValue, handlePageChange, getOneDayLong, getTimestamp, uuid, hasRole, isIdCard} from '@/kit/common';
import {taskCategory, recordWay, quickRecordList, customerTags, education, salary, objective, expectedEntryTime, marryStatus, peopleGroup, pageSizes} from '@/kit/data.js';
import addressArr  from '@/kit/address.js';

import lxgsCall from '@/component/call';

export default {
	template: html,
	components: {
        'lxgs-postion': postion,
        'lxgs-position-order-record': positionOrderRecord,
        'lxgs-dock-station': dockStation,
        'lxgs-sign-record': signRecord,
        'lxgs-induction-departure-record': inductionDepartureRecord,
        'lxgs-return-fee-record': returnFeeRecord,
        'lxgs-recommend-record': recommendRecord,
        'lxgs-focus-record': focusRecord,
        'lxgs-work-card': workCard,

        [lxgsCall.name]: lxgsCall
    },
	computed: {
		...mapState({
			record: state => state.CustomerRecordController,
			info: state => state.CustomerController.info,
			remarkDetail: state => state.CustomerController.remarkDetail,
			positionApplied: state => state.CustomerController.positionApplied,
			regionsCity: state => state.WorkRegionController.regionsCity,
			signUpTask: state => state.AgentTaskController.signUpTask,
			isTel: state => state.CallCenterController.isTel
		})
	},
	data() {
		let validateIdCard = (rule, value, callback) => {

			if (isIdCard(value)) {
				callback();
			} else {
				callback(new Error('请输入正确的身份证号'));
			}
        };

		return {
			activeTab: '1',
			pageSizes: pageSizes,

			taskData: {
				userId: this.$route.params.customerId,
				taskCategory: taskCategory.pending,

				pageNo: 1,
                pageSize: 10
			},
			recordData: {
				userId: this.$route.params.customerId,
				communicateMethod: '',
				comment: '',
			},
			recordDataRules: {
				communicateMethod: [{
					required: true, message: '请选择沟通方式', trigger: 'blur'
				}],
				comment: [{
					required: true, message: '请选择或输入注记内容', trigger: 'blur'
				}]
			},
			historyRecordData: {
				user_id: this.$route.params.customerId,

				page_no: 1,
                page_size: 1
			},
			remarkData: {
				userId: this.$route.params.customerId,
				nickname: '',
				wechat: '',
				tags: [],

				sex: '',
				age: '',
				education: '',
				onboarding: '',
				currentSalary: '',
				skillTag: '',
				expectCity: '',
				expectOnboardingDate: '',
				expectPosition: '',

				marital: '',
				currentProvince: '', 
				currentCity: '',
				currentArea: '',
				birthplaceProvince: '',
				birthplaceCity: '',
				birthplaceArea: '',
				goOut: '',
				findJob: '',
				peoples: '',
				painPoints: ''
			},
			currentAddress: [],
			nativePlace: [],

			returnVistData: {
				userId: this.$route.params.customerId,
				positionId: '',
				positionName: '',
				remindTime: '',
				remindComment: '',

				communicateMethod: ''
			},
			returnVistDataRules: {
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
			authParam: {
				idNo: '',
				name: ''
			},
			authParamRules: {
				idNo: [{
					required: true, message: '请输入身份证号', trigger: 'blur'
				}, {
					validator: validateIdCard, trigger: 'blur'
				}],
				name: [{
					required: true, message: '请输入姓名', trigger: 'blur'
				}]
			},
			disableOptions: {
				disabledDate: time => {
					return time.getTime() < getTimestamp() - getOneDayLong();
				},
			},
			recordWay: recordWay,
			quickRecordList: quickRecordList,
			customerTags: customerTags,
			education: education,
			salary: salary,
			addressArr: addressArr,
			objective: objective,
			expectedEntryTime: expectedEntryTime,
			marryStatus: marryStatus,
			peopleGroup: peopleGroup,

			isShowDelayTask: false,
			recordLoading: false,
			isShowRemarkPop: false,
			isShowReturnVist: false,
			isShowTaskPopup: false,
			isShowAuth: false,
			completeLoading: false,

			task: wsTaskDetail
		}
	},
	methods: {
		...mapActions(['CUSTOMER_INFO', 'AGENT_TASK_COMPLETE', 'RECORD_ADD', 'RECORD_HISTORY', 'CUSTOMER_REMARK', 'CUSTOMER_REMARK_DETAIL', 'RESERVE_NOTIFICATION', 'POSITION_APPLIED', 'DELAY_TASK', 'REGIONS_CITY', 'AGENT_SIGN_UP_TASK', 'CALL_IS_TEL', 'CUSTOMER_AUTH_NAME']),
		getTaskListWS() {
			let myArguments = {};
			for(let i in this.taskData) {
				if (!isEmpty(this.taskData[i])) {
                	myArguments[i] = this.taskData[i];
				}
            }

			let taskBody = {
				id: uuid(),
				path: '/agent-tasks',
				arguments: myArguments
			};

           	clinet.ws.send(JSON.stringify(taskBody));
		},
		getSignUpTask() {
			this.AGENT_SIGN_UP_TASK({params: {user_id: this.$route.params.customerId}, headers: {Authorization: 'Basic d2ViLWFwcDo='}}).then(res => {});
		},
		getHistoryRecordList() {
			this.RECORD_HISTORY({params: this.historyRecordData, headers: {Authorization: 'Basic d2ViLWFwcDo='}}).then(res => {});
		},
		getCustomerInfo() {
			let payload = {
				params: {user_id: this.$route.params.customerId, task_type_id: this.$route.query.taskTypeId},
				headers: {
                    Authorization: 'Basic d2ViLWFwcDo='
                }
			};
			this.CUSTOMER_INFO(payload).then(res => {});
		},
		getRemark() {
			this.CUSTOMER_REMARK_DETAIL({params: {user_id: this.$route.params.customerId}, headers: {Authorization: 'Basic d2ViLWFwcDo='}}).then(res => {
				if (res) {
					this.remarkData.nickname = res.nickname ? res.nickname : '';
					this.remarkData.wechat = res.wechat ? res.wechat : '';
					this.remarkData.tags = res.tags ? res.tags : [];

					this.remarkData.sex = res.sex ? res.sex : '';
					this.remarkData.age = res.age ? res.age : '';
					this.remarkData.education = res.education ? res.education : '';
					this.remarkData.onboarding = res.onboarding ? res.onboarding : '';
					this.remarkData.currentSalary = res.currentSalary ? res.currentSalary : '';
					this.remarkData.skillTag = res.skillTag ? res.skillTag : '';

					this.remarkData.expectCity = res.expectCity ? res.expectCity : '';

					this.remarkData.expectOnboardingDate = res.expectOnboardingDate ? res.expectOnboardingDate : '';
					this.remarkData.expectPosition = res.expectPosition ? res.expectPosition : '';

					this.remarkData.marital = res.marital ? res.marital : '';
					this.remarkData.goOut = res.goOut ? res.goOut : '';
					this.remarkData.findJob = res.findJob ? res.findJob : '';
					this.remarkData.peoples = res.peoples ? res.peoples : '';
					this.remarkData.painPoints = res.painPoints ? res.painPoints : '';

					if (res.currentProvince && res.currentCity && res.currentArea) {
						this.currentAddress.push(res.currentProvince);
						this.currentAddress.push(res.currentCity);
						this.currentAddress.push(res.currentArea);
					}
					if (res.birthplaceProvince && res.birthplaceCity && res.birthplaceArea) {
						this.nativePlace.push(res.birthplaceProvince);
						this.nativePlace.push(res.birthplaceCity);
						this.nativePlace.push(res.birthplaceArea);
					}
				}
			});
		},
		getAddress(address, placeType) {
			if (address && address.length === 3) {
				if (placeType === 'currentAddress') {
					this.remarkData.currentProvince = address[0];
					this.remarkData.currentCity = address[1];
					this.remarkData.currentArea = address[2];
				}
				if (placeType === 'native-place') {
					this.remarkData.birthplaceProvince = address[0];
					this.remarkData.birthplaceCity = address[1];
					this.remarkData.birthplaceArea = address[2];
				}
			}
		},
		getPositionApplied() {
			this.POSITION_APPLIED({params: {user_id: this.$route.params.customerId, position_type: 'ZX'}, headers: {Authorization: 'Basic d2ViLWFwcDo='}}).then(res => {});
		},
		getRegionCity() {
			this.REGIONS_CITY({headers: {Authorization: 'Basic d2ViLWFwcDo='}}).then(res => {});
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
					this.getHistoryRecordList();

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
		/** 填写历史注记的时候，完成注册任务 **/
		recordComplete() {
			this.completeTaskData.taskId = this.signUpTask.taskId;
			this.completeTaskData.taskTypeId = this.signUpTask.taskTypeId;
			this.completeTaskData.userId = this.signUpTask.userId;

			this.submitTask();
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
                	this.RECORD_ADD({body: {userId: this.$route.params.customerId, communicateMethod: this.delayTaskData.communicateMethod, comment: this.delayTaskData.remindComment}, headers: {Authorization: 'Basic d2ViLWFwcDo='}}).then(res => {
			        	if (res === '0') {
							this.getHistoryRecordList();
			        	}
			        });

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
		setRecord(form) {
			this.recordLoading = true;
	        	
			let payload = {
				body: this.recordData,
	            headers: {
	                Authorization: 'Basic d2ViLWFwcDo='
	            }
	        };
	        this.RECORD_ADD(payload).then(res => {
	        	this.recordLoading = false;

	        	if (res === '0') {
	        		this.$message({
						message: '添加注记成功',
						type: 'success'
					});
					this.getHistoryRecordList();
					this.$refs[form].resetFields();
	        	}
	        });
		},

		setRemark() {
			let body = {};
            for(let i in this.remarkData) {
                if (!isEmpty(this.remarkData[i]) || this.remarkData[i] === 0) {
                    body[i] = this.remarkData[i];
                }
            }
	        this.CUSTOMER_REMARK({body: body, headers: {Authorization: 'Basic d2ViLWFwcDo='}}).then(res => {
	        	if (res === '0') {
	        		this.$message({
						message: '备注用户信息成功',
						type: 'success'
					});
					this.getRemark();
	        	}
	        });
		},
		setReturnVist(form) {
			let body = {};
			for(let i in this.returnVistData) {
                if (!isEmpty(this.returnVistData[i])) {
                    body[i] = this.returnVistData[i];
                }
            }
            delete body.communicateMethod;

	        this.RESERVE_NOTIFICATION({body: body, headers: {Authorization: 'Basic d2ViLWFwcDo='}}).then(res => {
	        	if (res === '0') {
	        		this.$message({
						message: '跟踪提醒添加成功',
						type: 'success'
					});
					this.$refs[form].resetFields();

					this.taskData.pageNo = 1;
					this.getTaskListWS();
	        	}
	        	this.isShowReturnVist = false;
	        });
		},

		recommendJob() {
			this.$router.push({name: 'position-recommend', params: {customerId: this.$route.params.customerId}});
		},
		/** 提交历史注记 **/
		submitRecord(form) {
			this.$refs[form].validate((valid) => {
                if (valid) {
                	this.setRecord(form);
                } else {
                    return false;
                }
            });
		},
		/** 提交用户备注信息 **/
		submitRemark(form) {
			if(isEmpty(this.remarkData.nickname) && isEmpty(this.remarkData.wechat) && isEmpty(this.remarkData.tags) && isEmpty(this.remarkData.sex) && isEmpty(this.remarkData.age) && isEmpty(this.remarkData.education) && isEmpty(this.remarkData.onboarding) && isEmpty(this.remarkData.currentSalary) && isEmpty(this.remarkData.skillTag) && isEmpty(this.remarkData.expectPosition) && isEmpty(this.remarkData.expectOnboardingDate) && isEmpty(this.remarkData.expectCity) && isEmpty(this.remarkData.marital) && isEmpty(this.remarkData.currentProvince) && isEmpty(this.remarkData.birthplaceProvince) && isEmpty(this.remarkData.goOut) && isEmpty(this.remarkData.findJob) && isEmpty(this.remarkData.peoples) && isEmpty(this.remarkData.painPoints)) {
				this.$message({
					message: '请至少选择一项并填写',
					type: 'warning'
				});
				return;
			}
			this.setRemark();
		},
		/** 提交跟踪提醒 **/
		submitReturnVist(form) {

			this.$refs[form].validate((valid) => {
                if (valid) {
                	/** 同步历史注记 **/
                	this.RECORD_ADD({body: {userId: this.$route.params.customerId, communicateMethod: this.returnVistData.communicateMethod, comment: this.returnVistData.remindComment}, headers: {Authorization: 'Basic d2ViLWFwcDo='}}).then(res => {
			        	if (res === '0') {
							this.getHistoryRecordList();
			        	}
			        });

                	/** 跟踪提醒 **/
                	this.setReturnVist(form);
                } else {
                    return false;
                }
            });
		},
		authName(form) {
			this.$refs[form].validate((valid) => {
                if (valid) {
                	let param = this.authParam;
                		param.userId = this.$route.params.customerId;
                	this.CUSTOMER_AUTH_NAME({body: param, headers: {Authorization: 'Basic d2ViLWFwcDo='}}).then(res => {
                		if(res === 1) {
                			this.$message({
								message: '实名认证成功',
								type: 'success'
							});
            				this.getCustomerInfo();

							this.isShowAuth = false;
            				this.$refs[form].resetFields();
                		}
                		if(res === 0 || res === 3) {
                			this.$message({
								message: '未知错误，请联系研发人员',
								type: 'error'
							});
                		}
                		if(res === 2) {
                			this.$message({
								message: '该用户已经实名',
								type: 'warning'
							});
                		}
                		if(res === 4) {
                			this.$message({
								message: '该身份信息被其他用户实名',
								type: 'warning'
							});
                		}
					});
                }
            });
		},
		/** 是否跳转到周薪页面 **/
		skipWeekSalaryPage() {
			this.$router.push({name: 'salary-sign', params: {userId: this.$route.params.customerId, userName: this.info.userName, deviceId: this.info.deviceId, salaryCard: this.info.salaryCard, salaryCardBank: this.info.salaryCardBank}});
		},
		/** 是否配置固话 **/
		getTelType() {
			this.CALL_IS_TEL({headers: {Authorization: 'Basic d2ViLWFwcDo='}}).then(res => {});
		},
		/** Tab 选项切换 **/
		switchTab(tab, event) {
			if (tab.name === '1') {
            	this.$refs.lxgsPosition.getPositionApplyList();
            }
            if (tab.name === '2') {
            	this.$refs.lxgsPositionOrder.getPositionReserveList();
            }
            if (tab.name === '3') {
            	this.$refs.lxgsDockStation.getPickUpList();
            }
            if (tab.name === '4') {
            	this.$refs.lxgsSign.getSigninList();
            }
            if (tab.name === '5') {
            	this.$refs.lxgsInductionDeparture.getOnboardingList();
            }
            if (tab.name === '6') {
            	this.$refs.lxgsReturnFee.getReturnFeeList();
            }
            if (tab.name === '7') {
            	this.$refs.lxgsRecommend.getReferralList();
            }
            if (tab.name === '8') {
            	this.$refs.lxgsFocus.getFocusList();
            }
            if (tab.name === '9') {
            	this.$refs.lxgsWorkCard.getList();
            }
        },

        nextTask() {
        	this.$router.replace({name: 'customer-detail', params: {customerId: this.info.nextUserId}, query: {taskTypeId: this.$route.query.taskTypeId}});
        	refresh();
        },
        hasRole,
		handlePageChange
	},
	mounted() {
		clinet.userId = this.$route.params.customerId;
		
		if (clinet.ws && clinet.ws.readyState === 0) {
			/** ws 连接中 **/
		} else if(clinet.ws && clinet.ws.readyState === 1) {
			/** ws 连接成功 **/
			this.getTaskListWS();
		} else {
			clinetInit();
		}
		
		/** 获取客户信息 **/
		this.getCustomerInfo();
		/** 获取最新一条历史注记 **/
		this.getHistoryRecordList();
		/** 获取用户备用信息 **/
		this.getRemark();
		/** 查看是否申请过周薪岗位或签订周薪协议 **/
		this.getPositionApplied();
		/** 获取城市列表 **/
		this.getRegionCity();
		/** 获取注册任务 **/
		this.getSignUpTask();
		/** 是否配置固话 **/
		this.getTelType();
	}
}