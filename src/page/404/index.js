import html from './index.html';

export default {
	template: html,
	methods: {
		jump() {
			this.$router.replace('/');
		}
	}
}