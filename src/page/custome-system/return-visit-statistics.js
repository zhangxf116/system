import html from './return-visit-statistics.html';
import {mapActions, mapState} from 'vuex';
import { isEmpty, getBeforeDate, handlePageChange, getTime } from '@/kit/common';
import {pageSizes} from '@/kit/data';

export default {
    template: html,
    computed: {
        ...mapState({
            visitList: state => state.ServiceFollowUpController.visitList,
        })
    },
    data() {
        return {
            pageSizes: pageSizes,
            visitData: {
                /** 自定义参数 **/
                timeRange: [getBeforeDate(7), getBeforeDate(0)],

                startDate: getBeforeDate(7).getTime(),
                endDate: getBeforeDate(0).getTime(),
                userName: '',
                page_no: 1,
                page_size: 20
            },
            loading: false,
        }
    },
    methods: {
        ...mapActions(['ENTRYIN_STATISTICS']),
        getList() {
            this.loading = true;

            let params = {};
            for(let i in this.visitData) {
                if (!isEmpty(this.visitData[i])) {
                    params[i] = this.visitData[i];
                }
            }
            delete params.timeRange;

            this.ENTRYIN_STATISTICS({params: params, headers: {Authorization: 'Basic d2ViLWFwcDo='}}).then(res => {
                this.loading = false;
            })
        },
        search(form) {
            this.$refs[form].validate((valid) => {
                if (valid) {
                    this.visitData.page_no = 1;
                    this.getList();
                } else {
                    return false;
                }
            });
        },
        reset(form) {
            this.$refs[form].resetFields();

            this.visitData.startDate = getBeforeDate(7).getTime();
            this.visitData.endDate = getBeforeDate(0).getTime();
            this.visitData.page_no = 1;
            this.getList();
        },
        getTime,
        handlePageChange
    },
    mounted() {
        this.getList()
    }

}