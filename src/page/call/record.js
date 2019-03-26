import html from './record.html';
import {mapState, mapActions} from 'vuex';

import {isEmpty, handlePageChange, getTime, getBeforeDate, getEndTime} from '@/kit/common';
import {pageSizes} from '@/kit/data';

export default {
	template: html,
	computed: {
		...mapState({
			record: state => state.CallCenterController.record,
			agentList: state => state.AgentController.list
		})
	},
	data() {
		return {
			pageSizes: pageSizes,
			params: {
				/** 自定义参数 **/
				timeRange: [],

				from: '',
				to: '',

				user_name: '',
				user_nickname: '',
				user_phone: '',
				agent_id: '',
				in_out: '',

				page_no: 1,
                page_size: 20
			},
			loading: false
		}
	},
	methods: {
		...mapActions(['CALL_RECORD', 'AGENT_LIST']),
		getList() {
			this.loading = true;

			let params = {};
            for(let i in this.params) {
                if (!isEmpty(this.params[i])) {
                    params[i] = this.params[i];
                }
            }

            delete params.timeRange;

            let payload = {
                params: params,
                headers: {
                    Authorization: 'Basic d2ViLWFwcDo='
                }
            };
            this.CALL_RECORD(payload).then(res => { 
                this.loading = false;
            });
			
		},
		getAgentList() {
            this.AGENT_LIST({params: {role_id: 'AGENT_MEMBER'}, headers: {Authorization: 'Basic d2ViLWFwcDo='}}).then(res => {});
		},
		search(form) {
			this.$refs[form].validate((valid) => {
                if (valid) {
                	this.params.page_no = 1;
                    this.getList();
                } else {
                    return false;
                }
            });
		},
        initializeTime() {
            this.params.timeRange.push(getBeforeDate(7), getEndTime());
            this.params.from = new Date(getBeforeDate(7)).getTime();
            this.params.to = getEndTime();
        },
		reset(form) {
			this.$refs[form].resetFields();
			this.initializeTime();
			this.params.page_no = 1;
			this.getList();
		},
		getTime,
		handlePageChange
	},
	mounted() {
		this.initializeTime();
		this.getList();
		/** 获取小职姐列表 **/
		this.getAgentList();
	}
}