import html from './account.html';
import {mapState, mapActions} from 'vuex';

import {isEmpty, handlePageChange} from '@/kit/common';
import {pageSizes} from '@/kit/data';

export default {
	template: html,
	computed: {
		...mapState({
			account: state => state.AgentController.account,
			agentRoles: state => state.AgentProfileController.agentRoles
		})
	},
	data() {
        let checkPhone = (rule, value, callback) => {
            const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
            if (reg.test(value)) {
                callback();
            } else {
                return callback(new Error('请输入正确的手机号'));
            }
        };
		return {
            pageSizes: pageSizes,
			params: {
				agent_id: '',
				agent_name: '',
                agent_nickname: '',
                agent_role_id: '',

				page_no: 1,
                page_size: 20
			},
			loading: false,
            isShowAddAccount: false,
			roles: {},
            addAccountData: {
                jobNo: "",
                name: "",
                password: "",
                phone: "",
                roleId: "",
                roleName: ""
            },
            addAccountDataRules: {
                jobNo: [{
                    required: true, message: '请输入工号', trigger: 'blur'
                }],
                name: [{
                    required: true, message: '请输入姓名', trigger: 'blur'
                }],
                password: [{
                    required: true, message: '请输入密码', trigger: 'blur'
                }],
                phone: [
                	{required: true, message: '请输入手机号', trigger: 'blur'},
                    {validator: checkPhone, trigger: 'blur'},
			    ],
                roleId: [{
                    required: true, message: '请选择权限', trigger: 'change'
				}]
			}
		}
	},
	methods: {
		...mapActions(['AGENT_ENABLE', 'AGENT_ACCOUNT', 'AGENT_PROFILE_ADD_ROLES', 'AGENT_PROFILE_ROLES']),
		getList() {
			this.loading = true;

            let params = {};
            for(let i in this.params) {
                if (!isEmpty(this.params[i])) {
                    params[i] = this.params[i];
                }
            }
            this.AGENT_ACCOUNT({params: params, headers: {Authorization: 'Basic d2ViLWFwcDo='}}).then(res => {
                this.loading = false;
            });
		},
		setAccountStatus(agentId, agentName, agentStatus) {
			let tipsText = '';
			let status = 0;
			if (agentStatus === 0) {
				tipsText = '确定禁用' + agentName + '?';
				status = 1;
			}
			if (agentStatus === 1) {
				tipsText = '确定启用' + agentName + '?';
				status = 0;
			}

			this.$confirm(tipsText, '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				this.AGENT_ENABLE({body: {agentId: agentId, status: status}, headers: {Authorization: 'Basic d2ViLWFwcDo='}}).then(res => {
					if (res === '0') {
						this.$message({ type: 'success', message: '操作成功!' });
						this.getList();
					}
				})
			}).catch(() => {});
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
		/** 列表分页 **/
		handlePageChange,

		getAgentRoles() {
			this.AGENT_PROFILE_ROLES({headers:  { Authorization: 'Basic d2ViLWFwcDo='}}).then()
		},
        close(form) {
            this.$refs[form].resetFields();
            this.isShowAddAccount = false;
            this.roles = {};
        },
        addAccount() {
			this.isShowAddAccount = true
		},
        addAccountSure(form) {
            this.$refs[form].validate((valid) => {
                if (valid) {
                    this.AGENT_PROFILE_ADD_ROLES({body: this.addAccountData, headers:  { Authorization: 'Basic d2ViLWFwcDo='}}).then(res => {
                        this.isShowAddAccount = false;
                        this.$refs[form].resetFields();
                        if (res === '0') {
                            this.$message({
                                message: '添加成功',
                                type: 'success'
                            });
                            this.getList();
                        }
                    });
                } else {
                    return false;
                }
            });
		},
        roleChange(val) {
            this.addAccountData.roleId = val.roleId;
            this.addAccountData.roleName = val.roleName;
		}
	},
	mounted() {
		/** 获取小职姐列表 **/
		this.getList();
		this.getAgentRoles();
	}
}