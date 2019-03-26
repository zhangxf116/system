import html from './index.html';
import {mapState, mapActions} from 'vuex';
import {isEmpty, handlePageChange} from '@/kit/common';
import Currentlocation from '@/kit/address.js';
import {customerTags, pageSizes} from '@/kit/data.js';
import usernotes from '@/component/usernotes.js';
import lxgsCall from '@/component/call.js';

export default {
  template: html,
   props:['getcompletelist','complete'],
   computed: {
	...mapState({
	   locationofexpectationList: state => state.ReturnVisit.locationofexpectationList,
	   remarkUser: state => state.ReturnVisit.remarkUser,
	   remarkList: state => state.ReturnVisit.remarkList,
	})
	},
	components: {
		usernotes: usernotes,
		[lxgsCall.name]: lxgsCall
	},
	data() {
		return {
			pageSizes: pageSizes,
			claimPagingdata:{
                from: '',
                to: '',
                user_name: '',
                user_cellphone: '',
				status: 3,
				page_no: 1,
				page_size: 20,
			},
			centerDialogVisibles:false,
			loading: false,
			recordLoading: false,
			Currentlocation:[],
			rowdata:'',
			remarkDataRules: {},
			isShowRemarkPop: false,
		}
	},
	methods: {
		...mapActions(['CLAIMED_LIST','CUSTOMERS_ALLOCATION', 'CALL','LOCATION_OF_EXPECTATION','REMARK_COMMENT','REMARK_USER','REMARK_USERS','COMPLETELIST','REMARK_COMMENTS']),
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
			this.COMPLETELIST(payload).then(res => { 
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
		selectChangeCurrent(value){
			this.remarkData.currentCity = value[0];
			this.remarkData.currentArea  = value[1];
			this.remarkData.currentCountySeat = value[2];
		},
		isShowModel(flag) {
			this.isShowRemarkPop = flag;
			this.rowdata = ''
		},
		selectChangeCurrentHome(value){
			this.remarkData.birthplaceProvince = value[0];
			this.remarkData.birthplaceCity = value[1];
			this.remarkData.birthplaceArea = value[2]
		},
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
				this.claimedNotice();
			});
		}).catch(() => {});
	},
	},
	mounted() {
		this.Currentlocation = Currentlocation;
		this.LOCATION_OF_EXPECTATION({
			headers: {
				Authorization: 'Basic d2ViLWFwcDo='
			}
		});
	}
}