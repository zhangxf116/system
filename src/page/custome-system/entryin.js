import html from './entryin.html'
import {mapActions, mapState} from 'vuex';
import { getBeforeDate, handlePageChange } from '@/kit/common';
import {pageSizes} from '@/kit/data';

import lxgsCall from '@/component/call';

export default {
    template: html,
    components: {
        [lxgsCall.name]: lxgsCall
    },
    computed: {
        ...mapState({
            entryin: state => state.ServiceFollowUpController.entryin,
            entryinClaim: state => state.ServiceFollowUpController.entryinClaim,
            entryinComplete: state => state.ServiceFollowUpController.entryinComplete,
            historyList: state => state.ServiceFollowUpController.historyList,
        })
    },
    data() {
        return {
            pageSizes: pageSizes,
            claimBtnShow: true,
            noclaimBtnShow: false,
            entryData: {
                entry_status: 0,
                user_statuses: 0,
                begin_time: getBeforeDate(7).getTime(),
                end_time: getBeforeDate(0).getTime(),
                page_no: 1,
                page_size: 20
            },
            timeRange: [getBeforeDate(7).getTime(), getBeforeDate(0).getTime()],
            tabChange: '1',
            loading: false,
            headers: {
                Authorization: 'Basic d2ViLWFwcDo='
            },
            checkedUserStatuses:['0','1','2','3'],
            userStatuses: [{
                label: '2',
                value: '在职'
            },{
                label: '3',
                value: '离职'
            },{
                label: '1',
                value: '未接通'
            },{
                label: '0',
                value: '无'
            }],
            radioUserStatus: '',
            dialogVisible: false,
            dialogRecordVisible: false,
            visitData: {
                status: '',
                userId: ''
            },
            visitRecordData: {
                comment: '',
                userId: ''
            },
            visitRecordText: ''
        }
    },
    methods: {
        ...mapActions([
            'ENTRYIN_LIST',
            'ENTRYIN_LIST_CLAIM',
            'ENTRYIN_LIST_COMPLETE',
            'ENTRYIN_CLAIM',
            'ENTRYIN_VISIT',
            'ENTRYIN_HISTORY_RECORDS',
            'ENTRYIN_VISIT_RECORDS'
        ]),
        getEntryinData(a, b) {
            this.loading = true
            if(a || b) {
                this.entryData.entry_status = a;
                this.entryData.user_statuses = b;
            } else {
                this.entryData.entry_status = 0;
                this.entryData.user_statuses = 0;
            }
            this.ENTRYIN_LIST({params: this.entryData, headers:this.headers}).then(res => {
                this.loading = false
            })
        },
        getEntryinData1(a, b) {
            this.entryData.entry_status = a;
            this.entryData.user_statuses = b;
            this.ENTRYIN_LIST_CLAIM({params: this.entryData, headers:this.headers}).then(res => {
                this.loading = false
            })
        },
        getEntryinData2(a, b) {
            this.entryData.entry_status = a;
            this.entryData.user_statuses = b;
            this.ENTRYIN_LIST_COMPLETE({params: this.entryData, headers:this.headers}).then(res => {
                this.loading = false
            })
        },
        getTime(val) {
            this.entryData.begin_time = val[0];
            this.entryData.end_time = val[1];
        },
        initializeFunc() {
            this.getEntryinData(0, 0);
            this.getEntryinData1(1, "0, 1, 2, 3");
            this.getEntryinData2(2, "0, 1, 2, 3");
        },
        search() {
            this.tabChange = '1';
            this.initializeFunc();
        },
        reset() {
            this.tabChange = '1';
            this.claimBtnShow = true;
            this.noclaimBtnShow = false;
            this.entryData.begin_time = getBeforeDate(7).getTime();
            this.entryData.end_time = getBeforeDate(0).getTime();
            this.timeRange = [getBeforeDate(7), getBeforeDate(0)];
            this.entryData.page_no = 1;
            this.initializeFunc()
        },
        handlePageChange,
        claim(row) {
            this.$confirm('确定认领?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.ENTRYIN_CLAIM({body: {userId: row.userId}, headers: this.headers}).then(res => {
                    if (res == '0') {
                        this.$message({
                            type: 'success',
                            message: '认领成功!'
                        });
                        this.initializeFunc();
                    }
                })
            }).catch(() => {});
        },
        handleClick(val) {
            this.entryData.page_no = 1;
            this.checkedUserStatuses = ['0','1','2','3'];
            switch (val.name) {
                case '1':
                    this.claimBtnShow = true;
                    this.noclaimBtnShow = false;
                    this.getEntryinData(0, 0);
                    break;
                case '2':
                    this.claimBtnShow = false;
                    this.noclaimBtnShow = true;
                    this.getEntryinData(1, "0, 1, 2, 3");
                    this.getEntryinData1(1, "0, 1, 2, 3");
                    break;
                case '3':
                    this.claimBtnShow = false;
                    this.noclaimBtnShow = true;
                    this.getEntryinData(2, "0, 1, 2, 3");
                    this.getEntryinData2(2, "0, 1, 2, 3");
                    break;
            }
        },
        handleCheckedChange(val) {
            this.entryData.user_statuses = val.join(',')
            this.getEntryinData(this.entryData.entry_status, this.entryData.user_statuses)
            if(this.entryData.entry_status == 1) {
                this.getEntryinData1(1, this.entryData.user_statuses);
            }
            if(this.entryData.entry_status == 2) {
                this.getEntryinData2(2, this.entryData.user_statuses);
            }
        },
        visit(row) {
            this.dialogVisible = true
            this.visitData.userId = row.userId
            this.radioUserStatus = row.userStatus
        },
        visitSure() {
            if (!this.radioUserStatus) {
                this.$message("请选择用户状态")
                return;
            }
            this.visitData.status = this.radioUserStatus
            this.ENTRYIN_VISIT({body: this.visitData, headers: this.headers}).then(res => {
                this.dialogVisible = false
                this.$message("回访成功")
                if(this.entryData.entry_status == 1) {
                    this.getEntryinData(1, "0, 1, 2, 3");
                }
                if(this.entryData.entry_status == 2) {
                    this.getEntryinData(2, "0, 1, 2, 3");
                }
            })
        },
        visitRecord(row) {
            this.visitRecordText = ''
            this.dialogRecordVisible = true
            this.visitRecordData.userId = row.userId
            this.ENTRYIN_HISTORY_RECORDS({params: {user_id: row.userId}, headers: this.headers})
        },
        visitRecordSure() {
            if (!this.visitRecordText) {
                this.$message("请输入回访内容")
                return;
            }
            this.visitRecordData.comment = this.visitRecordText
            this.ENTRYIN_VISIT_RECORDS({body: this.visitRecordData, headers: this.headers}).then(res => {
                this.dialogRecordVisible = false
                this.$message("回访成功")
                if(this.entryData.entry_status == 1) {
                    this.getEntryinData2(2, "0, 1, 2, 3");
                    this.getEntryinData(1, "0, 1, 2, 3");
                    setTimeout(() => {
                        this.getEntryinData1(1, "0, 1, 2, 3");
                    }, 2000)
                }
                if(this.entryData.entry_status == 2) {
                    this.getEntryinData(2, "0, 1, 2, 3");
                }
            })
        },
    },
    mounted() {
        this.initializeFunc();
    }
}