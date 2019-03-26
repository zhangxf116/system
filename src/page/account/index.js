import html from './index.html';
import {mapActions} from 'vuex';
import {uuid} from '@/kit/common';

import VueQrcode from '@xkeshi/vue-qrcode';
import analytics from '@/analytics';

export default {
	template: html,
	components: {
		[VueQrcode.name]: VueQrcode,
	},
	data() {
		return {
			loginData: {
				username: '',
				password: '',
				grant_type: 'password',
				client_id: 'agent'
			},
			loginDataRules: {
				username: [{
					required: true, message: '请输入用户名', trigger: 'blur'
				}],
				password: [{
					required: true, message: '请输入密码', trigger: 'blur'
				}]
			},
			qrcodeId: uuid(),
			time: 30,
			isQrLogin: true,
			loading: false
		}
	},
	methods: {
		...mapActions(['LOGIN', 'LOGIN_QR']),

		loginSwitch() {
			if(this.isQrLogin) {
				this.isQrLogin = false;
			} else {
				this.isQrLogin = true;
				this.qrcodeId = uuid();
				this.getTimer();
			}
		},
		qrRefresh() {
			this.time = 30;
			this.qrcodeId = uuid();
			this.getTimer();
		},
		submit(form) {
			this.$refs[form].validate(valid => {
				/** 调用登陆接口 **/
				if (valid) {
					this.loading = true;

					this.LOGIN({body: this.loginData, headers: {Authorization: 'Basic d2ViLWFwcDo='}}).then(res => {
						this.loading = false;
						if (res === 'Success') {
				      		this.$router.replace({name: 'home'});
						}
					});
				} else {}
			});
		},
		getTimer() {
			let timer = setInterval(_ => {
				this.time--;
				if(this.time === 0 || !this.isQrLogin || this.$route.name !== 'login') {
					clearInterval(timer);
				}

				this.LOGIN_QR({params: {id: this.qrcodeId}}).then(res => {
					if (res === 'Success') {
						analytics.track({type: 'page', metric: 'view', id: 'login:qrcode'});
						this.$router.replace({name: 'home'});
						clearInterval(timer);
					}
				});
			}, 1000);
		},
	},
	mounted() {
		this.getTimer();
	}
}