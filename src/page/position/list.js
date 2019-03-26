import html from './list.html';
import {mapState, mapActions} from 'vuex';

import {isEmpty, handlePageChange, getTime} from '@/kit/common';
import { pageSizes } from '@/kit/data';

export default {
	template: html,
	computed: {
		...mapState({
			position: state => state.EnterpriseController.position,
			cityList: state => state.EnterpriseController.cityList,

			feature: state => state.PositionController.feature,
		})
	},
	data() {
		return {
			pageSizes: pageSizes,
			selectFeatures: [],
			positionData: {
				/** 自定义参数 **/
				timeRange: [],

				cityId: '',
				companyShortName: '',
				interviewDateFrom: '',
				interviewDateTo: '',
				major: '',
				zx: '',
				features: [],
				positionName: '',
				status: '',

				pageNo: 1,
                pageSize: 20
			},
			loading: false,
			isShowFeaturePop: false
		}
	},
	methods: {
		...mapActions(['ENTERPRISE_POSITION', 'ENTERPRISE_CITY', 'POSITION_FEATURE']),
		getEnterprisePostionList() {
			this.loading = true;

			let body = {};
            for(let i in this.positionData) {
                if (!isEmpty(this.positionData[i])) {
                    body[i] = this.positionData[i];
                }
            }
            if (this.positionData.major === false) {
            	body['major'] = this.positionData.major;
            }
            if (this.positionData.zx === false) {
            	body['zx'] = this.positionData.zx;
            }
            delete body.timeRange;

            this.ENTERPRISE_POSITION({body: body, headers: {Authorization: 'Basic d2ViLWFwcDo='}}).then(res => { 
                this.loading = false;
            });
		},
		getEnterpriseCityList() {
			this.ENTERPRISE_CITY({headers: {Authorization: 'Basic d2ViLWFwcDo='}}).then(res => {});
		},
		getPostionFeature() {
			this.POSITION_FEATURE({headers: {Authorization: 'Basic d2ViLWFwcDo='}}).then(res => {});
		},
		search(form) {
			this.$refs[form].validate((valid) => {
                if (valid) {
                	this.positionData.pageNo = 1;
                    this.getEnterprisePostionList();
                } else {
                    return false;
                }
            });
		},
		reset(form) {
			this.$refs[form].resetFields();
			this.positionData.interviewDateFrom = '';
			this.positionData.interviewDateTo = '';

			this.positionData.pageNo = 1;
			
			this.getEnterprisePostionList();
		},

		featureEvent(valueO, label) {
			for(let i of this.feature) {
				if (i.name === label) {
					for(let ii of i.features) {
						for(let iii in this.selectFeatures) {
							if ((valueO.id !== this.selectFeatures[iii].id) && (this.selectFeatures[iii].id === ii.id)) {
								this.selectFeatures.splice(iii, 1);
							}
						}
					}
				}
			}

			this.handleFeature();
		},
		tagEvent(tag) {
			this.selectFeatures.splice(tag, 1);

			this.handleFeature();
		},
		resetFeature() {
			this.selectFeatures = [];
			this.positionData.features = [];

			this.getEnterprisePostionList();
		},
		handleFeature() {
			this.positionData.features = [];
			for(let tag of this.selectFeatures) {
				this.positionData.features.push(tag.id);
			}

			this.getEnterprisePostionList();
		},
		getTime,
		handlePageChange
	},
	mounted() {
		this.getEnterpriseCityList();
		this.getEnterprisePostionList();

		/** 获取岗位特征 **/
		this.getPostionFeature();
	}
}