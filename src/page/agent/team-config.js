import html from './team-config.html';
import { mapState, mapActions } from 'vuex';
import { handlePageChange } from '@/kit/common';
import { pageSizes } from '@/kit/data';
import PinyinEngine from 'pinyin-engine';

export default {
    template: html,
    computed: {
        ...mapState({
            teamConfig: state => state.AgentController.teamConfig,
            agentList: state => state.AgentController.list,
            agentsGroupingList: state => state.AgentController.agentsGroupingList,
        })
    },
    data() {
        return {
            pageSizes: pageSizes,
            headers: {
                Authorization: 'Basic d2ViLWFwcDo='
            },
            loading: false,
            loadingSearch: false,
            isShowAdd: false,
            isShowChange: false,
            isShowEdit: false,

            params: {
                page_no: 1,
                page_size: 20
            },
            addData: {
                agentId: '',
                managerId: ''
            },
            addDataRules: {
                managerId: [
                    {required: true, message: '请选择经理', trigger: 'change'}
                ],
                agentId: [
                    {required: true, message: '请输入主管', trigger: 'change'}
                ],
            },
            changeData: {
                agentId: '',
                id: ''
            },
            changeDataRules: {
                agentId: [
                    {required: true, message: '请选择主管', trigger: 'change'}
                ],
            },
            editData: {
                searchKey: '',
                agentIds: [],
                id: ''
            },
            allSupervisorsData: [],
            list: []
        }
    },
    methods: {
        ...mapActions([
            'AGENT_TEAM',
            'AGENT_LIST',
            'AGENT_SUPERVISOR_CANDIDATES',
            'AGENT_TEAM_ADD',
            'AGENT_TEAM_CHANGE',
            'AGENT_TEAM_XZJ_LIST',
            'AGENT_TEAM_EDIT',
            'AGENT_TEAM_DELETE'
        ]),
        handlePageChange,
        getList() {
            this.loading = true;
            let payload = {
                params: this.params,
                headers: this.headers
            };
            this.AGENT_TEAM(payload).then(() => {
                this.loading = false;
            })
        },
        getSupervisorsData(val) {
            let payloadList = {
                params: {
                    term: val
                },
                headers: this.headers
            };
            this.AGENT_SUPERVISOR_CANDIDATES(payloadList).then(res => {
                if (res.code === '0') {
                    this.allSupervisorsData = res.content
                }
            })
        },
        addShow() {
            this.addData = {}
            this.isShowAdd = true

            this.AGENT_LIST({params: {role_id: 'AGENT_MANAGER'}, headers: {Authorization: 'Basic d2ViLWFwcDo='}}).then(res => {});

            this.getSupervisorsData()
        },
        remoteMethod(query) {
            this.getSupervisorsData(query)
            if (query !== '') {
                this.loadingSearch = true;
                setTimeout(() => {
                    this.loadingSearch = false;
                    this.allSupervisorsData.filter(item => {
                        return item.nickname.toLowerCase()
                            .indexOf(query.toLowerCase()) > -1;
                    });
                }, 200);
            }
        },
        submitAdd(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.AGENT_TEAM_ADD({body: this.addData,headers: this.headers}).then(res => {
                        if (res.content) {
                            this.isShowAdd = false
                            this.$message({
                                message: "添加成功",
                                type: 'success'
                            });
                            this.getList()
                            this.$refs[formName].resetFields();
                        }
                    })
                } else {
                    return false;
                }
            });
        },
        changeShow(row) {
            this.changeData.agentId = ''
            this.isShowChange = true
            this.changeData.id = row.id
            this.getSupervisorsData()
        },
        submitChange(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.AGENT_TEAM_CHANGE({body: this.changeData, headers: this.headers}).then(res => {
                        if (res.content) {
                            this.isShowChange = false
                            this.$message({
                                message: "更换成功",
                                type: 'success'
                            });
                            this.getList()
                            this.$refs[formName].resetFields();
                        }
                    })
                } else {
                    return false;
                }
            });
        },
        editShow(row) {
            this.editData.id = row.id
            this.editData.agentIds = []
            this.AGENT_TEAM_XZJ_LIST({ params: {id: row.id},headers: this.headers}).then(res =>{
                if (res.code === '0') {
                    if (res.content.length != 0) {
                        res.content.forEach(i => {
                            if (i.supervisorId) {
                                this.editData.agentIds.push(i.agentId)
                            }
                        })
                        this.searchEngine();
                        this.isShowEdit = true;
                    } else {
                        this.$message({
                            message: "没有可分配的小职姐",
                            type: 'warning'
                        });
                    }
                }
            });
        },
        searchEngine() {
            let pinyinEngine = new PinyinEngine(this.agentsGroupingList, ['nickname']);
            this.list = pinyinEngine.query(this.editData.searchKey);
        },
        submitEdit(formName) {
            delete this.editData.searchKey;
            let payload = {
                body: this.editData,
                headers: this.headers
            };
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.AGENT_TEAM_EDIT(payload).then(res => {
                        if (res.content) {
                            this.isShowEdit = false
                            this.$message({
                                message: "编辑成功",
                                type: 'success'
                            });
                            this.getList()
                        }
                    })
                } else {
                    return false;
                }
            });

        },
        deleteShow(row) {
            this.$confirm('确定删除此条经理、主管和组员的关系?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.AGENT_TEAM_DELETE({  params: {id: row.id},headers: this.headers}).then(res => {
                    if (res === '0') {
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        this.getList();
                    }
                });
            }).catch(() => {});
        },
        close(formName) {
            this.$refs[formName].resetFields();
        },
    },
    mounted() {
        this.getList()
    }
}