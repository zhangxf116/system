import html from './password.html';
import {mapActions} from 'vuex';

export default {
	template: html,
	data() {
		return {
			changePasswordData: {
				oldPassword: '',
				newPassword: '',
			},
			changePasswordDataRules: {
				oldPassword: [{
					required: true, message: '请输入旧密码', trigger: 'blur'
				}],
				newPassword: [{
					required: true, message: '请输入新密码', trigger: 'blur'
				}]
			},
			loading: false
		}
	},
	methods: {
		...mapActions(['CHANGE_PASSWORD']),
		submit(form) {
			this.loading = true;

			this.$refs[form].validate(valid => {
				/** 调用登陆接口 **/
				if (valid) {
					let payload = {
						body: this.changePasswordData,
						headers: {
							Authorization: 'Basic d2ViLWFwcDo=',
						}
					}
					
					this.CHANGE_PASSWORD(payload).then(res => {
						this.loading = false;

						if (res) {
		            		this.$message({
		            			message: "密码修改成功",
		            			type: 'success'
		            		});
							this.$router.go(-1);
		            	}
					});
				} else {
					/** 重置输入框 **/
					// this.$refs[form].resetFields();
				}
			});
		}
	}
}