import html from './index.html';
import {mapState, mapActions} from 'vuex';

import {isEmpty, handlePageChange} from '@/kit/common';
import {pageSizes} from '@/kit/data';

export default {
    template: html,
    computed: {
        ...mapState({
            seat:  state => state.SourceConfigureController.list,
            areaList:  state => state.SourceConfigureController.areaList,
        })
    },
    data() {
        return {
            pageSizes: pageSizes,
            headers: {
                Authorization: JSON.parse(localStorage.accesstoken)
            },
            params: {
                source: '',
                keyword: '',
                name: '',

                page_no: 1,
                page_size: 20
            },
            addCityForm: {
                area: '',
                name: ''
            },
            addDataRules: {
                area: [{
                    required: true, message: '请输入区域', trigger: 'blur'
                }],
                name: [{
                    required: true, message: '请输入区域名称', trigger: 'blur'
                }]
            },
            editSeatData: {
                source: '',
                keyword: '',
                name: '',
            },
            editSeatDataRules: {
                keyword: [{
                    required: true, message: '请输入关键词', trigger: 'blur'
                }],
                name: [{
                    required: true, message: '请输入文案', trigger: 'blur'
                }],
            },
            fileRules: {
                file: [{
                    required: true, message: '请选择文件', trigger: 'blur'
                }],
            },
            fileForm: {
                file: ''
            },
            isShowEditSeat: false,
            isShowCity: false,
            isShowAddCity: false,
            isShowImport: false,
            loading: false,
            uploading: false,
            uploadFileDataExcel: [],
        }
    },
    methods: {
        ...mapActions(['SOURCE_CONFIGURE', 'SOURCE_CONFIGURE_ADD', 'SOURCE_CONFIGURE_EDIT', 'SOURCE_CONFIGURE_DELETE',
            'SOURCE_CONFIGURE_AREA', 'SOURCE_CONFIGURE_AREA_ADD', 'SOURCE_CONFIGURE_AREA_DELTET']),
        getList() {
            this.loading = true;
            let params = {};
            for(let i in this.params) {
                if (!isEmpty(this.params[i])) {
                    params[i] = this.params[i];
                }
            }
            let payload = {
                params: params,
                headers: {
                    Authorization: 'Basic d2ViLWFwcDo='
                }
            };
            this.SOURCE_CONFIGURE(payload).then(res => {this.loading = false; });
        },
        deletSeat(row) {
            this.$confirm('确定删除渠道' + row.source + '?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.SOURCE_CONFIGURE_DELETE({params: {source: row.source}, headers: {Authorization: 'Basic d2ViLWFwcDo='}}).then(res => {
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
        editSeat(form) {
            this.$refs[form].validate((valid) => {
                if (valid) {
                    this.SOURCE_CONFIGURE_EDIT({body: this.editSeatData, headers: {Authorization: 'Basic d2ViLWFwcDo='}}).then(res => {
                        this.isShowEditSeat = false;
                        this.$refs[form].resetFields();
                        if (res === '0') {
                            this.$message({
                                message: '编辑成功',
                                type: 'success'
                            });
                            this.getList();
                        }
                    });
                } else {
                    return false;
                }
            });
        },
        showEditSeat(row) {
            this.isShowEditSeat = true;
            this.editSeatData.source = row.source;
            this.editSeatData.name = row.name;
            this.editSeatData.keyword = row.keyword;
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
        reset(form) {
            this.$refs[form].resetFields();
            this.params.page_no = 1;
            this.getList();
        },
        handlePageChange,
        cityConfig() {
            this.isShowCity = true;
            this.SOURCE_CONFIGURE_AREA({headers: {Authorization: 'Basic d2ViLWFwcDo='}}).then(res => {});
        },
        deletArea(row) {
            this.$confirm('确定删除' + row.area + '?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.SOURCE_CONFIGURE_AREA_DELTET({params: {area: row.area}, headers: {Authorization: 'Basic d2ViLWFwcDo='}}).then(res => {
                    if (res === '0') {
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        this.cityConfig();
                    }
                });
            }).catch(() => {});
        },
        addCityConfig() {
            this.isShowAddCity = true;
            this.addCityForm.area = '';
            this.addCityForm.name = '';
        },
        addCity(form) {
            this.$refs[form].validate((valid) => {
                if (valid) {
                    this.SOURCE_CONFIGURE_AREA_ADD({body: this.addCityForm, headers: {Authorization: 'Basic d2ViLWFwcDo='}}).then(res => {
                        this.isShowAddCity = false;
                        this.$refs[form].resetFields();
                        if (res === '0') {
                            this.$message({
                                message: '新增成功',
                                type: 'success'
                            });
                            this.cityConfig();
                        }
                    });
                } else {
                    return false;
                }
            });
        },
        importShowPop() {
            if (this.$refs.upload) {
                this.$refs.upload.clearFiles()
            }
            this.isShowImport = true;
        },
        handleRemove (file, fileList) {
            console.log(file)
        },
        handleExceed (file, fileList) {
            this.$message({
                type: 'warning',
                message: '只能上传一个文件'
            })
        },
        beforeAvatarUpload (file) {
            const isJPG = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isJPG) {
                this.$message.error('上传的文件只能是 Excel 格式!')
            }
            if(!isLt2M) {
                this.$message({
                    message: '上传文件大小不能超过 2MB!',
                    type: 'warning'
                });
            }
            return isJPG && isLt2M
        },
        handleExcelSuccess (response, file, fileList) {
            let code = response.code
            if (code === '0') {
                this.$message({
                    type: 'warning',
                    message: '导入成功'
                })
                this.isShowImport = false;
                this.getList()
            } else {
                this.$message({
                    type: 'info',
                    message: response.error.message
                })
            }
            this.$refs.upload.clearFiles()
        },
        importFlieSure(form) {
            this.$refs.upload.submit();
            this.getList();
        }
    },
    mounted() {
        this.getList();
    }
}