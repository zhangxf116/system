import html from './call.html';

import {mapState, mapActions} from 'vuex';

export default {
	name: 'lxgs-call',
	template: html,
	props: {
		userId: String,
		callWay: {
			type: String,
			/** value: tel || app **/
			default: 'tel'
		},
		icon: {
			type: String,
			default: 'el-icon-phone'
		},
		shape: {
			type: String,
			default: 'circle'
		},
		text: {
			type: String,
			default: ''
		}
	},
	data() {
		return {
			loading: ''
		}
	},
	methods: {
		...mapActions(['CALL', 'APP_CALL', 'APP_CALL_STATUS']),
		call() {
			let body = {};

			if (this.userId) { body['dst'] = this.userId; body['dstType'] = '0'; }

			this.$confirm('确认拨打电话?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				if (this.userId) {

					/** 固话拨打 **/
					if (this.callWay === 'tel') {
						this.loading = this.$loading({ lock: true, text: '电话正在拨打中...', spinner: 'el-icon-loading', background: 'rgba(0, 0, 0, 0.7)', customClass: 'lxgs-call-loading'});
						this.CALL({body: body, headers: {Authorization: 'Basic d2ViLWFwcDo='}}).then(res => {
							this.loading.close();
						});
					}

					/** APP拨打 **/
					if (this.callWay === 'app') {
						this.APP_CALL({body: body, headers: {Authorization: 'Basic d2ViLWFwcDo='}}).then(res => {

							/** 获取电话状态 **/
							if (res) {
								this.loading = this.$loading({ lock: true, text: '电话正在拨打中...', spinner: 'el-icon-loading', background: 'rgba(0, 0, 0, 0.7)', customClass: 'lxgs-call-loading'});
								this.getAppStatus();
							}

						});
					}
				}
			}).catch(() => {});

			
		},
		getAppStatus() {
			this.APP_CALL_STATUS({headers: {Authorization: 'Basic d2ViLWFwcDo='}}).then(res => {
				if (res === 1) { this.loading.text = '拨打中...'; }
				if (res === 2) { this.loading.text = '通话中...'; }

				if (res === 1 || res === 2) {
					setTimeout(this.getAppStatus, 2000);
				}

				if (res === 0) { this.loading.close(); }
			});
		}
	}
}