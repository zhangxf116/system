import {INTERVIEW_DATE, POSITION_WELFARE, POSITION_LIST, POSITION_CITY, POSITION_DETAIL, POSITION_FEATURE} from './type';

import Vue from 'vue';
import {API} from './api.js';

export default {
    state: {
        position: {
            pageNo: 1,
            pageSize: 50,
            totalCount: 0,
            items: []
        },
        positionCityList: [],
        interviewDateList: [],
        welfareList: [],
        positionDetail: {
            applyCount: 0,
            companyName: '--',
            companyProfile: '--',
            companyShortName: '--',
            content: '--',
            entryCount: 0,
            headCount: 0,
            images: [],
            companyInnerImages: [],
            companyInnerVideos: [],
            interviewRequirements: '',
            living: '',
            recruitmentNeeds: [],
            reservedFemaleQuantity: '',
            reservedMaleQuantity: '',
            reservedUnknownSexQuantity: '',
            maxSalary: 0,
            minSalary: 0,
            salaryDescription: '',
            staffSize: '',
            notice: '--',
            positionTypes: [],
            positionFeatures: [],
            positionId: '--',
            positionName: '--',
            privateInfo: '--',
            preReserve: false,
            requirement: '--',
            returnConditions: '--',
            userFemaleFee: 0,
            userMaleFee: 0,
            welfare: [],
            workTime: '',
            workingProvince: '',
            workingCity: '',
            workingArea: '',
            workingAddress: '',
            incumbencyStatus : '',
            namesDays : ''
        },
        feature: []
    },
    mutations: {
        [POSITION_LIST](state, data) {
            state.position.pageNo = data ? data.pageNo : 1;
            state.position.pageSize = data ? data.pageSize : 50;
            state.position.totalCount = data ? data.totalCount : 0;
            state.position.items = data && data.items ? data.items : [];
        },
        [POSITION_CITY](state, data) {
            state.positionCityList = data ? data : [];
        },
        [INTERVIEW_DATE](state, data) {
            state.interviewDateList = data ? data : [];
        },
        [POSITION_WELFARE](state, data) {
            state.welfareList = data ? data : [];
        },
        [POSITION_DETAIL](state, data) {
            state.positionDetail.applyCount = data ? data.applyCount : 0;
            state.positionDetail.companyName = data ? data.companyName : '--';
            state.positionDetail.companyProfile = data ? data.companyProfile : '--';
            state.positionDetail.companyShortName = data ? data.companyShortName : '--';
            state.positionDetail.content = data ? data.content : '--';
            state.positionDetail.entryCount = data ? data.entryCount : 0;
            state.positionDetail.headCount = data ? data.headCount : 0;
            state.positionDetail.images = data ? data.images : [];
            state.positionDetail.companyInnerImages = data ? data.companyInnerImages : [];
            state.positionDetail.companyInnerVideos = data ? data.companyInnerVideos : [];
            state.positionDetail.interviewRequirements = data ? data.interviewRequirements : '';
            state.positionDetail.living = data ? data.living : '';
            state.positionDetail.recruitmentNeeds = data ? data.recruitmentNeeds : [];
            state.positionDetail.reservedFemaleQuantity = data ? data.reservedFemaleQuantity : '';
            state.positionDetail.reservedMaleQuantity = data ? data.reservedMaleQuantity : '';
            state.positionDetail.reservedUnknownSexQuantity = data ? data.reservedUnknownSexQuantity : '';
            state.positionDetail.maxSalary = data ? data.maxSalary : 0;
            state.positionDetail.minSalary = data ? data.minSalary : 0;
            state.positionDetail.salaryDescription = data ? data.salaryDescription : '';
            state.positionDetail.staffSize = data ? data.staffSize : '';
            state.positionDetail.notice = data ? data.notice : '--';
            state.positionDetail.positionTypes = data ? data.positionTypes : [];
            state.positionDetail.positionFeatures = data ? data.positionFeatures : [];
            state.positionDetail.positionId = data ? data.positionId : '--';
            state.positionDetail.positionName = data ? data.positionName : '--';
            state.positionDetail.privateInfo = data ? data.privateInfo : '--';
            state.positionDetail.preReserve = data ? data.preReserve : false;
            state.positionDetail.requirement = data ? data.requirement : '--';
            state.positionDetail.returnConditions = data ? data.returnConditions : '--';
            state.positionDetail.userFemaleFee = data ? data.userFemaleFee : 0;
            state.positionDetail.userMaleFee = data ? data.userMaleFee : 0;
            state.positionDetail.welfare = data ? data.welfare : [];
            state.positionDetail.workTime = data ? data.workTime : '--';
            state.positionDetail.workingProvince = data ? data.workingProvince : '';
            state.positionDetail.workingCity = data ? data.workingCity : '';
            state.positionDetail.workingArea = data ? data.workingArea : '';
            state.positionDetail.workingAddress = data ? data.workingAddress : '--';
            state.positionDetail.incumbencyStatus = data ? data.incumbencyStatus :0;
            state.positionDetail.namesDays = data ? data.namesDays :0;
        },
        [POSITION_FEATURE](state, data) {
            state.feature = data ? data : [];
        },
    },
    actions: {
        [POSITION_LIST](context, payload) {
            return Vue.http.post(API['position-list'], payload.body, {headers: payload.headers}).then((res) => {
                return res.json();
            }, (err) => {
                return err.data;
            }).then(data => {                
                if(data.code === '0') {
                    context.commit('POSITION_LIST', data.content);
                    return data.code;
                }
            });
        },
        [POSITION_CITY](context, payload) {
            return Vue.http.get(API['position-city'],{headers: payload.headers}).then((res) => {
                return res.json();
            }, (err) => {
                return err.data;
            }).then(data => {                
                if(data.code === '0') {
                    context.commit('POSITION_CITY', data.content);
                    return data.code;
                }
            });
        },
        [POSITION_DETAIL](context, payload) {
            return Vue.http.get(API['position-detail'], {params: payload.params, headers: payload.headers}).then((res) => {
                return res.json();
            }, (err) => {
                return err.data;
            }).then(data => {                
                if(data.code === '0') {
                    context.commit('POSITION_DETAIL', data.content);
                    return data.code;
                }
            });
        },
        [INTERVIEW_DATE](context, payload) {
            return Vue.http.get(API['interview-date'], { params: payload.params, headers: payload.headers}).then((res) => {
                return res.json();
            }, (err) => {
                return err.data;
            }).then(data => {                
                if(data.code === '0') {
                    context.commit('INTERVIEW_DATE', data.content);
                    return data.code;
                }
            });
        },
        [POSITION_WELFARE](context, payload) {
            return Vue.http.get(API['position-welfare'], { headers: payload.headers}).then((res) => {
                return res.json();
            }, (err) => {
                return err.data;
            }).then(data => {                
                if(data.code === '0') {
                    context.commit('POSITION_WELFARE', data.content);
                    return data.code;
                }
            });
        },
        [POSITION_FEATURE](context, payload) {
            return Vue.http.get(API['position-feature'], { headers: payload.headers}).then((res) => {
                return res.json();
            }, (err) => {
                return err.data;
            }).then(data => {                
                if(data.code === '0') {
                    context.commit('POSITION_FEATURE', data.content);
                    return data.code;
                }
            });
        }
    }
}