import html from './index.html';
import {mapActions, mapState} from 'vuex';
import {hasRole, isEmpty} from '@/kit/common';

export default {
	template: html,
	computed: {
		...mapState({
			info: state => state.AgentProfileController.infoHead,
			callWayList: state => state.CallCenterController.callWayList,
		})
	},
	data() {
		return {
			activeIndex: this.$route.name,

			username: JSON.parse(localStorage.username),

			isShowPhoneWay: false,

			phoneWayData: {
				type: ''
			}
		}
	},
	methods: {
		...mapActions(['LOGOUT', 'AGENT_PROFILE_HEADER', 'CALL_WAY_LIST', 'CALL_WAY_SWITCH']),
		getInfo() {
            let payload = {
                headers: {
                    Authorization: 'Basic d2ViLWFwcDo='
                }
            };
            this.AGENT_PROFILE_HEADER(payload).then(res => {
            	if (hasRole('AGENT_MEMBER') || hasRole('AGENT_MANAGER')) {
            		if (isEmpty(res.name) || isEmpty(res.nick)) {
		    			this.$confirm('您的资料不完整，请联系超级管理员更新您的个人资料！', '提示', {
		    				type: 'warning',
		    				confirmButtonText: '确定并退出登录',
		    				showClose: false,
		    				showCancelButton: false,
		    				closeOnClickModal: false,
		    				center: true
						}).then(() => {
							this.LOGOUT();
            				this.$router.replace({name: 'login'});
						}).catch(() => {});	
	        		}
            	}

            	if (hasRole('AGENT_SUPER_MANAGER')) {
            		if (isEmpty(res.name) || isEmpty(res.nick)) {
		    			this.$confirm('您的资料不完整，请先完善个人资料！', '提示', {
		    				type: 'warning',
		    				confirmButtonText: '确定',
		    				showClose: false,
		    				showCancelButton: false,
		    				closeOnClickModal: false,
		    				center: true
						}).then(() => {
							this.$router.push({name: 'agent-info', query: {agentId: res.agentId}});
						}).catch(() => {});	
	        		}
            	}
            });
		},
		getCallWayList() {
			this.CALL_WAY_LIST({headers: {Authorization: 'Basic d2ViLWFwcDo='}}).then(res => {
				if (res) {
					for(let i in res) {
						if(res[i].using) {
							this.phoneWayData.type = res[i].type;
						}
					}
				}
			});
		},
		setCallWay() {
			this.CALL_WAY_SWITCH({body: this.phoneWayData, headers: {Authorization: 'Basic d2ViLWFwcDo='}}).then(res => {
				if (res === '0') {
					this.getCallWayList();
					this.isShowPhoneWay = false;
					this.$message({
						message: '切换成功',
						type: 'success'
					});
				}
			});
		},
		select(index, indexPath) {
			this.activeIndex = index;
		},
		skip(name) {
			this.activeIndex = name;
			this.$router.push({name: name});
		},
        knowledgeBase() {
			window.open('http://wiki.xiaozhijie.com/wordpress/')
		},
		switchChannel() {
			if (!isEmpty(this.phoneWayData.type)) {
				this.setCallWay();
			} else {
				this.$message({
					message: '请选择需要切换的拨打方式',
					type: 'warning'
				});
			}
		},
		logout() {
			this.$confirm('确定退出吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
            	this.LOGOUT();
            	this.$router.replace({name: 'login'});

            	/** 退出登录后关闭websocket **/
            	if (clinet.ws) {
            		clinet.ws.close();
            	}
            }).catch(() => {});
		},
		hasRole,
	},
	mounted() {
		/** 获取小职姐信息 **/
		this.getInfo();

		/** 获取拨打电话方式 **/
		this.getCallWayList();
	}
}