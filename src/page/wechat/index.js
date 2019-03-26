import html from './index.html';
import {mapState, mapActions} from 'vuex';

import {pageSizes, handlePageChange, getTimestamp} from '@/kit/common';

export default {
	template: html,
	computed: {
		...mapState({
			wechat: state => state.weChatAccountController.wechatList,
			agentList: state => state.AgentController.list,
			fileList: state => state.FileResourceController.list
		})
	},
	data() {
		return {
			pageSizes: pageSizes,
            headers: {
                Authorization: 'Basic d2ViLWFwcDo='
            },
			weChatData: {
                agent_id: '',
                wx_account: '',

				page_no: 1,
                page_size: 20
			},
			addWeChatData: {
                agentId: '',
                wxAccount: '',
                defaultAccount: false
			},
			addWeChatDataRules: {
                agentId: [{
					required: true, message: '请选择小职姐', trigger: 'change'
				}],
                wxAccount: [{
					required: true, message: '请输入微信号', trigger: 'blur'
				}]
			},
			editWeChatData: {
                agentId: '',
                id: '',
                defaultAccount: false,
                wx_account: '',
                wxQrCodeUrl: ''
			},
			editWeChatDataRules: {
                agentId: [{
					required: true, message: '请选择小职姐', trigger: 'change'
				}],
			},
			isShowAdd: false,
			isShowEdit: false,
			loading: false,
		}
	},
	methods: {
		...mapActions(['WECHAT', 'AGENT_LIST', 'WECHAT_ADD', 'WECHAT_EDIT', 'WECHAT_DELETE', 'UPLOAD_BASE64']),
		getWeChatList() {
			this.loading = true;

            this.WECHAT({params: this.weChatData, headers: this.headers}).then(res => {
                this.loading = false;
            });
		},
		getAgentList() {
            this.AGENT_LIST({params: {role_id: 'AGENT_MEMBER'}, headers: this.headers}).then(res => {});
		},
		addWechat(form) {
			this.$refs[form].validate((valid) => {
                if (valid) {
                	this.WECHAT_ADD({body: this.addWeChatData, headers: this.headers}).then(res => {
                		this.isShowAdd = false;
                		this.$refs[form].resetFields();
                		if (res === '0') {
                			this.$message({
								message: '添加成功',
								type: 'success'
							});
							this.getWeChatList();
						}
                	});
                } else {
                    return false;
                }
            });
		},
		deletWechat(row) {
			this.$confirm('确定删除此微信号?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				this.WECHAT_DELETE({params: {id: row.id}, headers: this.headers}).then(res => {
					if (res === '0') {
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.getWeChatList();
					}
				});
			}).catch(() => {});
		},
		editWechat(form) {
			delete this.editWeChatData.wx_account
			this.$refs[form].validate((valid) => {
                if (valid) {
                	this.WECHAT_EDIT({body: this.editWeChatData, headers: this.headers}).then(res => {
                		this.isShowEdit = false;
                		this.$refs[form].resetFields();
                		if (res === '0') {
                			this.$message({
								message: '编辑成功',
								type: 'success'
							});
							this.getWeChatList();
						}
                	});
                } else {
                    return false;
                }
            });
		},
		showEditWechat(row) {
			this.isShowEdit = true;
            this.editWeChatData.id = row.id;
			this.editWeChatData.agentId = row.agentId;
			this.editWeChatData.defaultAccount = row.defaultAccount;
			this.editWeChatData.wx_account = row.wxAccount;
			this.editWeChatData.wxQrCodeUrl = row.wxQrCodeUrl;
		},
        close(form) {
            this.$refs[form].resetFields();
            this.addWeChatData.defaultAccount = false
		},
		search(form) {
			this.$refs[form].validate((valid) => {
                if (valid) {
                	this.weChatData.page_no = 1;
                    this.getWeChatList();
                } else {
                    return false;
                }
            });
		},
		reset(form) {
			this.$refs[form].resetFields();
			this.weChatData.page_no = 1;
			this.getWeChatList();
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
					if (uploadType === 'wxQrCode') {
						this.editWeChatData.wxQrCodeUrl = this.fileList[0].url;
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
		removeQr() {
			this.editWeChatData.wxQrCodeUrl = '';
		},
		viewQrCode(url) {
			this.$alert('<img class="img" src=' + url + '>', '二维码预览', { dangerouslyUseHTMLString: true });
		},
		handlePageChange
	},
	mounted() {
		this.getWeChatList();
		/** 获取小职姐列表 **/
		this.getAgentList();
	}
}