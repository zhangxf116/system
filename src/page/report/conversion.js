import html from './conversion.html';
import {mapState, mapActions} from 'vuex';

import {isEmpty, handlePageChange, getTime, hasRole} from '@/kit/common';
import { pageSizes } from '@/kit/data';

export default {
    template: html,
    computed: {
        ...mapState({
            conversion: state => state.SummaryController.conversion,
            agentList: state => state.AgentController.list,
            supervisorList: state => state.AgentController.supervisorList
        })
    },
    data() {
        return {
            pageSizes: pageSizes,
            conversionData: {
                month: '',
                supervisor_id: '',
                agent_name: '',
                agent_id: '',
                sort: '',
                order: '',

                page_no: 1,
                page_size: 20
            },
            loading: false
        }
    },
    methods: {
        ...mapActions(['AGENT_LIST', 'AGENT_CONVERSION_INDEX', 'AGENT_SUPERVISOR']),
        getconversionList() {
            this.loading = true;

            let params = {};
            for(let i in this.conversionData) {
                if (!isEmpty(this.conversionData[i])) {
                    params[i] = this.conversionData[i];
                }
            }

            let payload = {
                params: params,
                headers: {
                    Authorization: 'Basic d2ViLWFwcDo='
                }
            };
            this.AGENT_CONVERSION_INDEX(payload).then(res => {
                this.loading = false;
            });

        },
        getAgentList() {
            this.AGENT_LIST({params: {role_id: 'AGENT_MEMBER'}, headers: {Authorization: 'Basic d2ViLWFwcDo='}}).then(res => {});
        },
        getSupervisorList() {
            this.AGENT_SUPERVISOR({params: {}, headers: {Authorization: 'Basic d2ViLWFwcDo='}}).then(res => {});
        },
        search(form) {
            this.$refs[form].validate((valid) => {
                if (valid) {
                    this.conversionData.page_no = 1;
                    this.getconversionList();
                } else {
                    return false;
                }
            });
        },
        reset(form) {
            this.$refs[form].resetFields();
            this.conversionData.sort = '';
            this.conversionData.order = '';
            this.conversionData.month = '';
            this.conversionData.page_no = 1;
            this.getconversionList();
        },
        getTime,
        hasRole,
        handlePageChange,
        sortMethod(val) {
            if(val.order == 'descending') {
                this.conversionData.order='DESC'
            } else {
                this.conversionData.order='ASC'
            }
            if(val.prop == 'monthlySignInCount') {
                this.conversionData.sort='SIGN_IN_SUM'
            } else if(val.prop == 'currentWXFriendsIndicator') {
                this.conversionData.sort='WECHAT_INDEX'
            } else {
                this.conversionData.sort='WECHAT_SUM'
            }
            this.getconversionList()
		}
    },
    mounted() {
        this.getAgentList();
        this.getconversionList();
        this.getSupervisorList();
    }
}