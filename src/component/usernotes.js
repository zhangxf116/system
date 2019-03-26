import html from './usernotes.html';
import currentlocation from '@/kit/address.js';
import {customerTags} from '@/kit/data.js';
import {isEmpty, handlePageChange} from '@/kit/common';
import '@/static/css/usernotes.less';
import {mapState, mapActions} from 'vuex';

export default {
	name: 'lxgs-usernotes',
	template: html,
	props: ['showremarkpop','isshowmodel','rowdata','claimednotice'],
    computed: {
		...mapState({
			locationofexpectationList: state => state.ReturnVisit.locationofexpectationList,
			remarkList: state => state.ReturnVisit.remarkList,
		})
	},
	data() {
		return {
            claimPagingdata:{
				status: 1,
				page_no: 1,
				page_size: 20,
			},
            remarkData: {
				birthplaceProvince: '',
				birthplaceCity: '',
				currentCity:'',
				currentArea:'',
				userId: '',
				currentCountySeat: '',
				nickname: '',
				wechat: '',
				wechatSameAsPhone: false,
				qq: '',
				tags: [],
				birthplaceArea: '',
				others: '',
				sex: '',
				age: '',
				education: '',
				onboarding: '',
				currentSalary: '',
				expectSalary: '',
				skillTag: '',
				personalityTags: [],
				expectCity: '',
				expectOnboardingDate: '',
				expectPosition: '',
				maritalEnum: '',
				goOut: '',
				peoples:'',
				findJob: '',
                painPoints: '',//痛点

            },
            recordLoading: false,
            nativeData:[],
            loading: false,
            customerTags: customerTags,
            commentcity:{required: true, message: '请输入正确的年龄', trigger: 'blur'},
            cityData : [],
            currentlocation:currentlocation,
            recordWay: [{key: 0, value: "固话"}, {key: 1, value: "手机"}, {key: 2, value: "微信"}],
			quickRecordList: [{lable:'已接通',value:'CONNECT'}, {lable:'未接通',value:"NO_CONNECT"}, {lable:'空号/停机/关机',value:'NONE'}],
            recordData: {
				userId: this.$route.params.customerId,
				communicateMethod: '0',
				comment: '',
				connectStatus:"" 
            },
            commentage:{required: true, message: '请输入正确的年龄', trigger: 'blur'},
		}
    },
	methods: {
		...mapActions(['LOCATION_OF_EXPECTATION','REMARK_COMMENTS','REMARK_COMMENT', 'REMARK_USER','CLAIMED_LIST','REMARK_USERS']),
		selectChangeCurrent(value){
			this.remarkData.currentCity = value[0];
			this.remarkData.currentArea  = value[1];
			this.remarkData.currentCountySeat = value[2];
        },
        selectChangeCurrentHome(value){
			this.remarkData.birthplaceProvince = value[0];
			this.remarkData.birthplaceCity = value[1];
			this.remarkData.birthplaceArea = value[2]
        },
        submitRecord() {
			let rowd = this.rowdata;
			this.remarkData.userId = rowd.userId;
			if(this.recordData.connectStatus&&this.recordData.comment){
				if(this.recordData.connectStatus!='CONNECT'){
					this.remarkPost()
					this.isshowmodel(false)
				}else{
					if(this.remarkData.expectOnboardingDate=='NO_WORK'){
						this.remarkPost();
						this.isshowmodel(false);
					}else{
						if(this.remarkData.age != '' && this.remarkData.sex != '' && this.remarkData.expectPosition != ''&& this.remarkData.expectOnboardingDate !='' &&this.remarkData.expectCity!=''){
							this.remarkPost();
							this.isshowmodel(false);
						}else{
							this.$message({
								message: '请填写用户备注里性别，年龄，求职意向，期望入职时间，期望工作地等选项',
								type: 'error'
							  });
						}
					}
					
				}
			}else{
				this.$message({
					message: '请填写添加注记里是否接通，注记内容等选项',
					type: 'error'
				  });
			}
			
        },
        remarkPost(){
            let params = {};
            for(let i in this.remarkData) {
                if (!isEmpty(this.remarkData[i])) {
                    params[i] = this.remarkData[i];
                }
			}
			let userid = this.rowdata.userId;
			this.recordData.userId = userid
			let body = this.recordData;
			if(body.connectStatus=="CONNECT"){
				this.REMARK_USER({body:params, headers: {Authorization: 'Basic d2ViLWFwcDo='}})
			}
            this.REMARK_COMMENT({body:body, headers: {Authorization: 'Basic d2ViLWFwcDo='}}).then(res=>{
				this.claimednotice();
			})
            this.getempty()
		},
		getUsersRemark(userid){
			let that = this;
			let payload = {
				params: {user_id: userid},
				headers: {
					Authorization: 'Basic d2ViLWFwcDo='
				}
			};
	    	this.REMARK_COMMENTS({params: {user_id: userid, page_no: 1, page_size: 5}, headers: {Authorization: 'Basic d2ViLWFwcDo='}}).then((res)=>{});

			that.REMARK_USERS(payload).then((res)=>{
				that.remarkData = {
					birthplaceProvince: res.birthplaceProvince ? res.birthplaceProvince : '' ,
					birthplaceCity: res.birthplaceCity ? res.birthplaceCity : '',
					userId: res.userId ? res.userId : '',
					nickname: res.nickname ? res.nickname : '',
					wechat: res.wechat ? res.wechat : '',
					wechatSameAsPhone: res.wechatSameAsPhone ? res.wechatSameAsPhone : false,
					qq: res.qq ? res.qq : '',
					tags: res.tags ? res.tags : [],
					others: res.others ? res.others : '',
					sex: res.sex ? res.sex : '',
					age: res.age || res.age!= null ? res.age : '',
					education: res.education ? res.education : '',
					onboarding: res.onboarding ? res.onboarding : '',
					currentSalary: res.currentSalary ? res.currentSalary : '',
					expectSalary: res.expectSalary ? res.expectSalary : '',
					skillTag: res.skillTag ? res.skillTag : '',
					personalityTags: res.personalityTags ? res.personalityTags : [],
					expectCity: res.expectCity ? res.expectCity : '',
					expectOnboardingDate: res.expectOnboardingDate ? res.expectOnboardingDate : '',
					expectPosition: res.expectPosition ? res.expectPosition : '',
					expectedentrytime: res.expectedentrytime ? res.expectedentrytime : '',
					maritalEnum: res.maritalEnum ? res.maritalEnum : '',
					goOut: res.goOut ? res.goOut : '',
					findJob: res.findJob ? res.findJob : '',
					painPoints: res.painPoints ? res.painPoints : '',
					peoples:  res.peoples ? res.peoples : '',
					currentArea: res.currentArea ? res.currentArea : '',
					currentCountySeat: res.currentCountySeat ? res.currentCountySeat : '',
					birthplaceArea: res.birthplaceArea ? res.birthplaceArea : ''
	
				};
				that.cityData[0] = res.currentCity ? res.currentCity : [];
				that.cityData[1] = res.currentArea  ? res.currentArea  : [];
				that.cityData[2] = res.currentCountySeat  ? res.currentCountySeat  : [];
	
				that.nativeData[0] = res.birthplaceProvince  ? res.birthplaceProvince : [];
				that.nativeData[1] = res.birthplaceCity   ? res.birthplaceCity   : [];
				that.nativeData[2] = res.birthplaceArea  ? res.birthplaceArea  : [];
			})
			
		},
        getempty(){
            this.remarkData = {
                birthplaceProvince: '',
                birthplaceCity: '',
                userId: '',
                nickname: '',
                wechat: '',
                wechatSameAsPhone: false,
                qq: '',
                tags: [],
                others: '',
                sex: '',
                age: '',
                education: '',
                onboarding: '',
                currentSalary: '',
                expectSalary: '',
                skillTag: '',
                birthplaceArea:'',
                personalityTags: [],
                expectCity: '',
                expectOnboardingDate: '',
                expectPosition: '',
                expectedentrytime: '',
                maritalEnum: '',
                goOut: '',
                findJob: '',
                painPoints: '',//痛点
                peoples: '',
                currentArea:'',
                currentCountySeat:''
    
            };
            this.recordData = {
                userId: '',
                communicateMethod: '0',
				comment: '',
				connectStatus:""
            }
            this.cityData = [];
            this.nativeData = [];
        },
        submitError(){
            this.isshowmodel(false)
            this.getempty()
        },
        syncWechat(value) {
        	if (value) {
        		this.remarkData.wechat = this.rowdata.phone;
        	} else {
        		this.remarkData.wechat = '';
        	}
        }
	},
	mounted() {
        this.LOCATION_OF_EXPECTATION({
			headers: {
				Authorization: 'Basic d2ViLWFwcDo='
			}
        })
        this.getUsersRemark(this.rowdata.userId)
    }
}
