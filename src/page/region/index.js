import html from './index.html';
import {mapState, mapActions} from 'vuex';

import {isEmpty} from '@/kit/common';
import PinyinEngine from 'pinyin-engine';

export default {
	template: html,
	computed: {
		...mapState({
			list: state => state.WorkRegionController.regionsAssignedAgents,
			agentList: state => state.AgentController.list
		})
	},
	data() {
		return {
			searchEngineList: [],
			editParams: {
				searchKey: '',

				agentIds: [],
				region: ''
			},
			editParamsRules: {
				agentIds: [{
					required: true, message: '请选择小职姐', trigger: 'blur'
				}]
			},
			isShowEdit: false,
			loading: false,
		}
	},
	methods: {
		...mapActions(['AGENT_LIST', 'REGIONS_ASSIGNED_AGENTS', 'REGIONS_ASSIGNMENT']),
		getList() {
			this.loading = true;
            this.REGIONS_ASSIGNED_AGENTS({headers: {Authorization: 'Basic d2ViLWFwcDo='}}).then(res => { this.loading = false; });
		},
		getAgentList() {
			this.AGENT_LIST({params: {role_id: 'AGENT_MEMBER'}, headers: {Authorization: 'Basic d2ViLWFwcDo='}}).then(res => {});
		},
		edit(regionValue, agents) {
			this.editParams.region = regionValue;
			this.editParams.agentIds = [];

			agents.forEach((i) => {
				this.editParams.agentIds.push(i.agentId);
			});
			this.isShowEdit = true;
			this.searchEngine();
		},
		submitEdit(form) {
			this.$refs[form].validate((valid) => {
                if (valid) {
		            delete this.editParams.searchKey;
		            this.REGIONS_ASSIGNMENT({body: this.editParams, headers: {Authorization: 'Basic d2ViLWFwcDo='}}).then(res => { 
		                if (res === '0') {
		            		this.$message({
		            			message: "区域配置成功",
		            			type: 'success'
		            		});
		            		this.isShowEdit = false;
		            		this.getList();
		            	}
		            });
                } else {
                    return false;
                }
            });
		},
		colseEdit(form) {
			this.$refs[form].resetFields();
		},
		searchEngine() {
			let pinyinEngine = new PinyinEngine(this.agentList, ['nickname']);
				this.searchEngineList = pinyinEngine.query(this.editParams.searchKey);
		},
	},
	mounted() {
		this.getList();
		this.getAgentList();
	}
}