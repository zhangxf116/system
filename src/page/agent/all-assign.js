import html from './all-assign.html';
import {mapState, mapActions} from 'vuex';

export default {
	template: html,
	computed: {
		...mapState({
			allAssignCount: state => state.AssignRuleConfigureController.allAssignCount
		})
	},
	data() {
		return {
			editParams: {
				level: '',
				dailyAssignable: '',
				totalAssignable: ''
			},
			editParamsRules: {
				dailyAssignable: [{
					required: true, message: '请输入等级每天可分配总上限', trigger: 'blur'
				}],
				totalAssignable: [{
					required: true, message: '请输入等级可分配总上限', trigger: 'blur'
				}]
			},
			loading: false,
			isShowEdit: false
		}
	},
	methods: {
		...mapActions(['ALL_ASSIGN_RULE_CONFIGURE_LIST', 'ALL_ASSIGN_RULE_CONFIGURE_EDIT']),
		getList() {
			this.loading = true;
			this.ALL_ASSIGN_RULE_CONFIGURE_LIST({headers: {Authorization: 'Basic d2ViLWFwcDo='}}).then(res => {
				this.loading = false;
			});
		},
		openEdit(level, dailyAssignable, totalAssignable) {
			this.editParams.level = level;
			this.editParams.totalAssignable = totalAssignable;
			this.editParams.dailyAssignable = dailyAssignable;

			this.isShowEdit = true;
		},
		edit(form) {
			this.$refs[form].validate((valid) => {
				if (valid) {					
					this.ALL_ASSIGN_RULE_CONFIGURE_EDIT({body: this.editParams, headers: {Authorization: 'Basic d2ViLWFwcDo='}}).then(res => {
						if (res === '0') {
							this.$message({
								message: "修改等级可分配客户数成功",
								type: 'success'
							});
							this.isShowEdit = false;
							this.getList();
						}
					});
				}
			});
		},
		colseEdit(form) {
			this.$refs[form].resetFields();
		},
	},
	mounted() {
		this.getList();
	}
}