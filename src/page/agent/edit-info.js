import html from './edit-info.html';
import {mapState, mapActions} from 'vuex';

import {getTimestamp, isIdCard} from '@/kit/common';
import lrz from '@/kit/lrz.all.bundle';

export default {
	template: html,
	computed: {
		...mapState({
			info: state => state.AgentProfileController.info,
			fileList: state => state.FileResourceController.list
		})
	},
	data() {
		let validateIdCard = (rule, value, callback) => {

			if (isIdCard(value)) {
				callback();
			} else {
				callback(new Error('请输入正确的身份证号'));
			}
        }

		return {
			infoData: {
				agentId: this.$route.query.agentId,
				nick: '',
				name: '',
				sex: '',
				cardNo: '',
				birthday: '',
				phone: '',
				wechat: '',
				headImages: []
			},
			infoDataRules: {
				nick: [{
					required: true, message: '请输入昵称', trigger: 'blur'
				}],
				name: [{
					required: true, message: '请输入姓名', trigger: 'blur'
				}],
				sex: [{
					required: true, message: '请选择性别', trigger: 'blur'
				}],
				cardNo: [{
					required: true, message: '请输入身份证号', trigger: 'blur'
				}, {
					validator: validateIdCard, trigger: 'blur'
				}],
				phone: [{
					required: true, message: '请输入联系电话', trigger: 'blur'
				}, {
					pattern: /^1[0-9]{10}$/,  message: '手机号不正确', trigger: 'blur'
				}],
				headImages: [{
					required: true, message: '请选择头像', trigger: 'blur'
				}]
			},
			loading: false
		}
	},
	methods: {
		...mapActions(['AGENT_PROFILE', 'AGENT_ID_INFO', 'EDIT_AGENT_PROFILE', 'UPLOAD_BASE64']),
		getInfo() {
            this.AGENT_PROFILE({agent_id: this.$route.query.agentId}).then(res => {
            	this.infoData.nick = res && res.nick ? res.nick : '';
				this.infoData.name = res && res.name ? res.name : '';
				this.infoData.sex = res ? res.sex : '';
				this.infoData.cardNo = res && res.addStarCardNo ? res.addStarCardNo : '';
				this.infoData.birthday = res && res.birthday ? res.birthday : '';
				this.infoData.phone = res && res.phone ? res.phone : '';
				this.infoData.wechat = res && res.wechat ? res.wechat : '';
				if (res && res.headImages) {
					res.headImages.forEach(i => {
						this.infoData.headImages.push({selected: i.selected, url: i.url});
		            });
				} else {
					this.infoData.headImages = [];
				}
            });
		},
		setPic(base64, size, uploadType) {
			const loading = this.$loading({ lock: true, text: 'Loading', spinner: 'el-icon-loading', background: 'rgba(0, 0, 0, 0.7)' });

			let currentImage = {
				content: base64.replace(/^data:image\/.*;base64,/, ""),
				name: getTimestamp(),
				size: size
			};

			let filesData = [];
				filesData.push(currentImage);

			let payload = {
				body: filesData,
                headers: {
                    Authorization: 'Basic d2ViLWFwcDo='
                }
			};

			this.UPLOAD_BASE64(payload).then(res => {
				loading.close();
				if (res === '0') {
					this.$message({message: '图片上传成功', type: 'success'});
					if (uploadType === 'head') {
						this.infoData.headImages.push({selected: false, url: this.fileList[0].url});
					}
				}
			});
		},
		uploadPic(e)  {
			let file = e.target.files[0];
			let type = file.type;
			let size = file.size;
			let name = e.target.name;

			if(!/image\/\w+/.test(type)){
				this.$message('请上传图片');
				return ;
			}

			lrz(file, {quality: 0.4}).then(rst => {
				/** 在界面上显示图片, 并上传图片 **/
				let reader = new FileReader();
				reader.readAsDataURL(rst.file);
				reader.onload = (e) => {
					let base64 = e.currentTarget.result;
					/** 上传图片 **/
					this.setPic(base64, e.total, name);
				}
			}).catch(err => {});
		},
		updateIdInfo() {
			let payload = {
				params: {card_no: this.infoData.cardNo, birthday: this.infoData.birthday},
                headers: {
                    Authorization: 'Basic d2ViLWFwcDo='
                }
            };
            this.AGENT_ID_INFO(payload).then(res => {});
		},
		selectImage(selected, url, selectedType) {
			if (selectedType === 'head') {
				this.infoData.headImages.forEach(i => {
	                if(i.url === url) {
	      				i.selected = !selected;
	                } else {
	                	i.selected = false;
	                }
	            });
			}
		},
		editInfo(form) {
			this.$refs[form].validate(valid => {
				/** 调用小职姐资料编辑接口 **/
				if (valid) {
					this.loading = true;

					/** 变更记录 **/
					const h = this.$createElement;
					let hh = '';
					let currentName = '';
					let currentCardNo = '';

					if (this.info.name != this.infoData.name && this.info.addStarCardNo != this.infoData.cardNo) {
						currentName = this.infoData.name;
						currentCardNo = this.infoData.cardNo;
						hh = h('div', null, [h('p', null, '该账号的使用人为'), h('p', null, '姓名：' + currentName), h('p', null, '身份证：' + currentCardNo)]);
					}

					this.$msgbox({
						title: '确定更改该账号的个人资料？',
						message: hh
					}).then(action => {
						this.EDIT_AGENT_PROFILE(this.infoData).then(res => {
							this.loading = false;

							if (res === '0') {
								this.$router.go(-1);
							}
						});
					});
				}
			});
		}
	},
	mounted() {
		/** 获取小职姐信息 **/
		this.getInfo();
	}
}