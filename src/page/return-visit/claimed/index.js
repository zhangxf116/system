import html from './index.html';
import {mapState, mapActions} from 'vuex';
import {isEmpty, handlePageChange} from '@/kit/common';
import currentlocation from '@/kit/address.js';
import {customerTags, pageSizes} from '@/kit/data.js';
import usernotes from '@/component/usernotes.js';
import lxgsCall from '@/component/call.js';

export default {
  	template: html,
   	props:['claim','getcompletelist',],
   	computed: {
	
	},
	components: {
		usernotes: usernotes,
		[lxgsCall.name]: lxgsCall
	},
	data() {
		return {
			pageSizes: pageSizes,
			centerDialogVisibles: false,
			claimPagingdata:{
                from: '',
                to: '',
                user_name: '',
                user_cellphone: '',
				status: 1,
				page_no: 1,
				page_size: 20,
			},
			loading: false,
			recordLoading: false,
			remarkDataRules: {},
			isShowRemarkPop: false,
			rowdata: ''
		}
	},
	methods: {
		...mapActions(['CLAIMED_LIST','CALL','NOTICES','','', 'CUSTOMERS_ALLOCATION','','']),
		claimedNotice() {
			this.loading = true;
			let params = {};
			for(let i in this.claimPagingdata) {
				if (!isEmpty(this.claimPagingdata[i])) {
					params[i] = this.claimPagingdata[i];
				}
			}
			let payload = {
					params: params,
					headers: {
						Authorization: 'Basic d2ViLWFwcDo='
					}
			};
			this.CLAIMED_LIST(payload).then(res => { 
					this.loading = false;
			});
		},
        search(form) {
            this.$refs[form].validate((valid) => {
                if (valid) {
                    this.claimPagingdata.page_no = 1;
                    this.claimedNotice();
                } else {
                    return false;
                }
            });
        },
        reset(form) {
            this.$refs[form].resetFields();
            this.claimPagingdata.page_no = 1;
            this.claimedNotice();
        },
		handlePageChange,
		claimedQuestionnaires(row){
			this.rowdata = row;
			this.isShowRemarkPop = true;
		},
		isShowModel(flag) {
			this.isShowRemarkPop = flag;
			this.rowdata = ''
		},
		//预约
		handleAppointment(row){
			let routeUrl = this.$router.resolve({
				name: 'position-recommend',
				params: {customerId: row.userId},
				query: {from: 'return-visit'}
		   });
		   window.open(routeUrl .href, '_blank');
		},
	handledistribution(row){
		this.$confirm('确认分配手机号' + row.phone + '的用户?', '提示', {
			confirmButtonText: '确定',
			cancelButtonText: '取消',
			type: 'warning'
		}).then(() => {
			let body = {
				userId: row.userId,
			}
			this.CUSTOMERS_ALLOCATION({body: body, headers: {Authorization: 'Basic d2ViLWFwcDo='}}).then(res => {
				this.getcompletelist();
				this.claimedNotice();
			});
		}).catch(() => {});
	},
	},
	mounted() {
		this.currentlocation = currentlocation;
	
	}
}