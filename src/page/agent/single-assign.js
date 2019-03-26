import html from './single-assign.html';
import {mapState, mapActions} from 'vuex';

import {isEmpty, handlePageChange} from '@/kit/common';
import { pageSizes } from '@/kit/data';
import PinyinEngine from 'pinyin-engine';

export default {
	template: html,
	computed: {
		...mapState({
			singleAssignCount: state => state.AssignRuleConfigureController.singleAssignCount,
			agentList: state => state.AgentController.list
		})
	},
	data() {
		return {
			pageSizes: pageSizes,
			params: {
				agent_id: '',

				page_no: 1,
				page_size: 20
			},
			addParams: {
				searchKey: '',

				agentIds: [],
				dailyAssignable: '',
			},
			addParamsRules: {
				agentIds: [{
					required: true, message: '请选择小职姐', trigger: 'blur'
				}],
				dailyAssignable: [{
					required: true, message: '请输入每天可分配数', trigger: 'blur'
				}]
			},
			searchEngineList: [],
			loading: false,
			isShowAdd: false,
		}
	},
	methods: {
		...mapActions(['ASSIGN_RULE_CONFIGURE_LIST', 'ASSIGN_RULE_CONFIGURE', 'AGENT_LIST']),
		getList() {
			this.loading = true;

			let params = {};
			for(let i in this.params) {
				if (!isEmpty(this.params[i])) {
					params[i] = this.params[i];
				}
			}

			this.ASSIGN_RULE_CONFIGURE_LIST({params: params, headers: {Authorization: 'Basic d2ViLWFwcDo='}}).then(res => {
				this.loading = false;
			});
		},
		getAgentList() {
			this.AGENT_LIST({params: {role_id: 'AGENT_MEMBER'}, headers: {Authorization: 'Basic d2ViLWFwcDo='}}).then(res => {});
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

		openAdd() {
			this.isShowAdd = true;
			this.searchEngine();
		},
		colseAdd(form) {
			this.$refs[form].resetFields();
		},
		searchEngine() {
			let pinyinEngine = new PinyinEngine(this.agentList, ['nickname']);
				this.searchEngineList = pinyinEngine.query(this.addParams.searchKey);
		},
		add(form) {
			this.$refs[form].validate((valid) => {
				if (valid) {
					delete this.addParams.searchKey;
					
					this.ASSIGN_RULE_CONFIGURE({body: this.addParams, headers: {Authorization: 'Basic d2ViLWFwcDo='}}).then(res => {
						if (res === '0') {
							this.$message({
								message: "小职姐每天排班数添加成功",
								type: 'success'
							});
							this.isShowAdd = false;
							this.getList();
						}
					});
				}
			});
		},
		editShow(agentId, dailyAssignable, nickname) {
			let agentIds = [];
				agentIds.push(agentId);

			this.$prompt('请输入小职姐每天可分配客户数', '修改小职姐：' + nickname + ' 每天分配客户上限', {
				confirmButtonText: '确定',
				inputType: 'number',
				inputPattern:  /\S/,
				inputErrorMessage: '分配数不能为空',
				inputValue: dailyAssignable
			}).then(({ value }) => {
				this.ASSIGN_RULE_CONFIGURE({body: {agentIds: agentIds, dailyAssignable: value}, headers: {Authorization: 'Basic d2ViLWFwcDo='}}).then(res => {
					if (res === '0') {
						this.$message({
							message: "修改小职姐每天可分配客户数成功",
							type: 'success'
						});
						this.getList();
					}
				});
			}).catch(() => {});
		},
		handlePageChange
	},
	mounted() {
		this.getList();
		this.getAgentList();
	}
}