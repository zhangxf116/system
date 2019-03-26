import html from './info.html';
import {mapState, mapActions} from 'vuex';

export default {
	template: html,
	computed: {
		...mapState({
			info: state => state.AgentProfileController.info,
		})
	},
	methods: {
		...mapActions(['AGENT_PROFILE']),
		getInfo() {
            this.AGENT_PROFILE(this.$route.query.agentId ? {agent_id: this.$route.query.agentId} : {}).then(res => {});
		},
		skip() {
			this.$router.push({name: 'agent-info-edit', query: {agentId: this.$route.query.agentId}});
		}
	},
	mounted() {
		/** 获取小职姐信息 **/
		this.getInfo();
	}
}