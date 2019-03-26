import html from './seat.html';
import {mapState, mapActions} from 'vuex';

import {isEmpty, handlePageChange} from '@/kit/common';
import {pageSizes} from '@/kit/data';

export default {
	template: html,
	computed: {
		...mapState({
			seat: state => state.CallCenterController.seat,
			agentList: state => state.AgentController.list,
			sipPhoneList: state => state.CallCenterController.sipPhoneList
		})
	},
	data() {
		return {
			pageSizes: pageSizes,
			params: {
				seat_type: 'AGENT',

				seat_id: '',
				ext_no: '',

				page_no: 1,
                page_size: 20
			},
			addSeatData: {
				seatType: 'AGENT',
				seatId: '',
				extNo: ''
			},
			addSeatDataRules: {
				seatId: [{
					required: true, message: '请选择小职姐', trigger: 'blur'
				}],
				extNo: [{
					required: true, message: '请选择分机号', trigger: 'blur'
				}]
			},
			editSeatData: {
				seatId: '',
				extNo: '',
			},
			editSeatDataRules: {
				extNo: [{
					required: true, message: '请选择分机号', trigger: 'blur'
				}],
			},
			editSeatTemporaryData: {
				nickname: '',
				jobNo: ''
			},
			isShowAddSeat: false,
			isShowEditSeat: false,
			loading: false
		}
	},
	methods: {
		...mapActions(['CALL_SEAT', 'AGENT_LIST', 'CALL_SIP_PHONE', 'CALL_ADD', 'CALL_DELETE', 'CALL_UNBIND', 'CALL_BIND_EDIT']),
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

            this.CALL_SEAT(payload).then(res => { 
                this.loading = false;
            });
			
		},
		getAgentList() {
            this.AGENT_LIST({params: {role_id: 'AGENT_MEMBER'}, headers: {Authorization: 'Basic d2ViLWFwcDo='}}).then(res => {});
		},
		getSipPhoneList(isOpen, all) {
			if(isOpen) {
				this.CALL_SIP_PHONE({params: {all: all}, headers: {Authorization: 'Basic d2ViLWFwcDo='}}).then(res => {});
			}
		},

		addSeat(form) {
			this.$refs[form].validate((valid) => {
                if (valid) {
                	this.CALL_ADD({body: this.addSeatData, headers: {Authorization: 'Basic d2ViLWFwcDo='}}).then(res => {
                		this.isShowAddSeat = false;
                		this.$refs[form].resetFields();
                		if (res === '0') {
                			this.$message({
								message: '添加坐席成功',
								type: 'success'
							});
							this.getList();
							this.getSipPhoneList();
						}
                	});
                } else {
                    return false;
                }
            });
		},
		deletSeat(seatId, nickname) {
			this.$confirm('确定删除坐席' + nickname + '?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				this.CALL_DELETE({body: {seatId: seatId, seatType: 'AGENT'}, headers: {Authorization: 'Basic d2ViLWFwcDo='}}).then(res => {
					if (res === '0') {
						this.$message({
							message: '删除坐席成功',
							type: 'success'
						});
						this.getList();
						this.getSipPhoneList();
					}
				});
			}).catch(() => {});
		},
		editSeat(form) {
			this.$refs[form].validate((valid) => {
                if (valid) {
                	this.CALL_BIND_EDIT({body: this.editSeatData, headers: {Authorization: 'Basic d2ViLWFwcDo='}}).then(res => {
                		this.isShowEditSeat = false;
                		this.$refs[form].resetFields();
                		if (res === '0') {
                			this.$message({
								message: '编辑坐席成功',
								type: 'success'
							});
							this.getList();
							this.getSipPhoneList();
						}
                	});
                } else {
                    return false;
                }
            });
		},
		unbindSeat(seatId, nickname) {
			this.$confirm('确定解绑坐席' + nickname + '?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				this.CALL_UNBIND({body: {seatId: seatId, seatType: 'AGENT'}, headers: {Authorization: 'Basic d2ViLWFwcDo='}}).then(res => {
					if (res === '0') {
						this.$message({
							message: '解绑坐席成功',
							type: 'success'
						});
						this.getList();
						this.getSipPhoneList();
					}
				});
			}).catch(() => {});
		},
		showEditSeat(seatId, nickname, extNo, jobNo) {
			this.isShowEditSeat = true;

			this.editSeatData.seatId = seatId;
			this.editSeatData.extNo = extNo;
			this.editSeatTemporaryData.nickname = nickname;
			this.editSeatTemporaryData.jobNo = jobNo;
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
		this.getList();
		/** 获取小职姐列表 **/
		this.getAgentList();
		this.getSipPhoneList();
	}
}