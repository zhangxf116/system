import html from './scheduling.html';
import {mapState, mapActions} from 'vuex';

import {isEmpty, getZeroTime, getEndTime, getOneDayLong, handlePageChange, getBeforeDate} from '@/kit/common';
import {pageSizes} from '@/kit/data';

export default {
	template: html,
	computed: {
		...mapState({
			workScheduling: state => state.WorkSchedulingController,
			lastSchedulingDate: state => state.WorkSchedulingController.lastSchedulingDate,
			agentList: state => state.AgentController.list,
			agentSchedulingList: state => state.AgentController.schedulingList,
			region: state => state.WorkRegionController.regions
		})
	},
	data() {
		return {
			pageSizes: pageSizes,
			params: {
				region: '',
				from: new Date(getBeforeDate(30)).getTime(),
				to: getEndTime(),
				agent_id: '',

				page_no: 1,
                page_size: 20
			},
			addData: {
				region: '',
				agentIds: [],
				from: '',
				to: ''
			},
			addDataRules: {
				from: [{
					required: true, message: '请选择开始时间', trigger: 'blur'
				}],
				to: [{
					required: true, message: '请选择结束时间', trigger: 'blur'
				}],
				agentIds: [{
					required: true, message: '请选择小职姐', trigger: 'blur'
				}],
				region: [{
					required: true, message: '请选择工作区域', trigger: 'blur'
				}]
			},
			editData: {
				agentIds: [],
				day: '',
				region: ''
			},
			editDataRules: {
				agentIds: [{
					required: true, message: '请选择小职姐', trigger: 'blur'
				}]
			},
			addTimeOptions: {
				disabledDate: time => {
					return time.getTime() < (this.lastSchedulingDate && this.lastSchedulingDate > getEndTime() ? this.lastSchedulingDate : getEndTime());
				},
			},
			currentDayZeroTime: getZeroTime(),
			loading: false,
			isShowScheduling: false,
			isShowEditScheduling: false,
		}
	},
	methods: {
		...mapActions(['WORK_SCHEDULING_LIST', 'WORK_SCHEDULING_ADD', 'WORK_SCHEDULING_EDIT', 'WORK_SCHEDULING_DATE', 'AGENT_LIST', 'AGENT_SCHEDULING_LIST', 'REGIONS']),
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
            this.WORK_SCHEDULING_LIST(payload).then(res => { 
                this.loading = false;
            });
			
		},
		getAgentList() {
            this.AGENT_LIST({params: {role_id: 'AGENT_MEMBER'}, headers: {Authorization: 'Basic d2ViLWFwcDo='}}).then(res => {});
		},
		getAgentSchedulingList(region) {
			this.addData.agentIds = [];
			let payload = {
				params: {
					role_id: 'AGENT_MEMBER'
				},
                headers: {
                    Authorization: 'Basic d2ViLWFwcDo='
                }
            };
            if (!isEmpty(region)) { 
            	payload.params.region = region;
            	/** 联动最后一次排班时间 **/
            	this.getLastSchedulingDate(region);
            } else {
            	this.getLastSchedulingDate(this.region[0].value);
            }
            this.AGENT_SCHEDULING_LIST(payload).then(res => {});
		},
		getRegion() {
			this.REGIONS({headers: {Authorization: 'Basic d2ViLWFwcDo='}}).then(res => {});
		},
		getLastSchedulingDate(region) {
			let payload = {
				params: {},
                headers: {
                    Authorization: 'Basic d2ViLWFwcDo='
                }
            };
            if (!isEmpty(region)) { payload.params.region = region; }
			this.WORK_SCHEDULING_DATE(payload).then(res => {
				if (res && res > getEndTime()) {
					this.addData.from = res;
				} else {
					this.addData.from = getZeroTime() + 24*60*60*1000;
				}
			});
		},
		submit(form) {
			this.$refs[form].validate((valid) => {
                if (valid) {
                    let payload = {
		                body: this.addData,
		                headers: {
		                    Authorization: 'Basic d2ViLWFwcDo='
		                }
		            };
		            this.WORK_SCHEDULING_ADD(payload).then(res => { 
		                if (res === '0') {
		                	this.$message({
		            			message: "添加排班成功",
		            			type: 'success'
		            		});

		            		this.closeAddPop(form);
		            		this.getList();
		            	}
		            });
                } else {
                    return false;
                }
            });
		},
		edit(day, agents, region) {
			this.editData.day = day;
			this.editData.region = region;
			this.editData.agentIds = [];

			agents.forEach((i) => {
				this.editData.agentIds.push(i.agentId);
			});

			this.isShowEditScheduling = true;

			/** 根据区域带出小职姐 **/
			this.getAgentSchedulingList(region);
		},
		submitEdit(form) {
			this.$refs[form].validate((valid) => {
                if (valid) {
                    let payload = {
		                body: this.editData,
		                headers: {
		                    Authorization: 'Basic d2ViLWFwcDo='
		                }
		            };
		            this.WORK_SCHEDULING_EDIT(payload).then(res => { 
		                if (res === '0') {
		            		this.$message({
		            			message: "修改排班成功",
		            			type: 'success'
		            		});

		            		this.isShowEditScheduling = false;
		            		this.getList();
		            	}
		            });
                } else {
                    return false;
                }
            });
		},
		add() {
			this.isShowScheduling = true;
			this.getAgentSchedulingList();
		},
		closeAddPop(form) {
			this.isShowScheduling = false;
			this.$refs[form].resetFields();
		},
		search(form) {
			this.$refs[form].validate((valid) => {
                if (valid) {
					this.params.page_no = 1;
                    this.getList();
                } else {
                    return false;
                }
            });
		},
		reset(form) {
			this.$refs[form].resetFields();
			this.params.page_no = 1;
            this.getList();
		},
		handlePageChange
	},
	mounted() {
		/** 获取已排班小职姐列表 **/
		this.getList();
		/** 获取小职姐列表 **/
		this.getAgentList();
		this.getRegion();
	}
}