import {CUSTOMER_INFO, POSITION_APPLY_LIST, APPLY_RECORD_LIST, RESERVE_LIST, PICKUP_LIST, SIGNIN_LIST, ONBOARDING_LIST, RETURN_FEE_LIST, SOURCE_LIST, CUSTOMER_REFERRAL_LIST, CUSTOMER_REFERRAL, CUSTOMER_REMARK, CUSTOMER_REMARK_DETAIL, CUSTOMER_FOLLOWING, POSITION_APPLIED, CUSTOMER_ID, CUSTOMER_SPRING_RESERVE, WORK_CRAD, CUSTOMER_SPRING_TRIP, CUSTOMER_AUTH_NAME} from './type';

import Vue from 'vue';
import {API} from './api.js';

export default {
    state: {
        info: {
            userId: '',
            agentName: '',
            agentNickname: '' ,
            changeAgentTimes: 0,
            applyQuantity: 0,
            signInQuantity: 0,
            onboardingQuantity: 0,

            serviceTime: '',
            location: '',

            age: '--',
            sex: '--',
            source: '--',
            sourceName: '--',
            sourceKeyword: '--',
            sourcePositionName: '--',
            sourceAreaName: '--',

            constellation: '--',
            exAgent: '--',
            exAgentNickname: '',
            idCardVerified: false,
            jiguan: '',
            mark: '--',
            minzu: '--',
            nextUserId: '',
            phone: '--',
            positioningByPhone: '--',
            referrer: '0',
            registerTime: '--',
            userName: '',
            deviceId: '--',
            salaryCard: '--',
            salaryCardBank: '--',
            rank: '',

            memberLevel: '',
            memberFrom: '',
            memberTo: '',


        },
        applyRecordList: [],
        positionApply: {
            pageNo: 1,
            pageSize: 50,
            totalCount: 0,
            items: []
        },
        reserveRecord: {
            pageNo: 1,
            pageSize: 50,
            totalCount: 0,
            items: []
        },
        pickUpRecord:{
            pageNo: 1,
            pageSize: 50,
            totalCount: 0,
            items: []
        },
        signinRecord:{
            pageNo: 1,
            pageSize: 50,
            totalCount: 0,
            items: []
        },
        onboardingRecord:{
            pageNo: 1,
            pageSize: 50,
            totalCount: 0,
            items: []
        },
        returnFeeRecord:{
            pageNo: 1,
            pageSize: 50,
            totalCount: 0,
            items: []
        },
        referralRecord: {
            pageNo: 1,
            pageSize: 50,
            totalCount: 0,
            items: []
        },
        sourceList: [],
        remarkDetail: {},
        followingRecord: {
            pageNo: 1,
            pageSize: 50,
            totalCount: 0,
            items: []
        },
        positionApplied: {
            applied: false,
            contractAgreed: false
        },
        springReserve: {
            pageNo: 1,
            pageSize: 50,
            totalCount: 0,
            items: []
        },
        springTrip: {
            pageNo: 1,
            pageSize: 50,
            totalCount: 0,
            items: []
        },
        workCard: {
            pageNo: 1,
            pageSize: 50,
            totalCount: 0,
            items: []
        }
    },
    mutations: {
        [CUSTOMER_INFO](state, data) {
            state.info.userId = data ? data.userId : '--';
            state.info.agentName = data ? data.agentName : '--';
            state.info.agentNickname = data ? data.agentNickname : "--";
            state.info.changeAgentTimes = data ? data.changeAgentTimes : 0;
            state.info.applyQuantity = data ? data.applyQuantity : 0;
            state.info.signInQuantity = data ? data.signInQuantity : 0;
            state.info.onboardingQuantity = data ? data.onboardingQuantity : 0;

            state.info.serviceTime = data ? data.serviceTime : '';
            state.info.location = data ? data.location : '';

            state.info.age = data ? data.age : '--';
            state.info.sex = data ? data.sex : '--';
            state.info.source = data ? data.source : '--';
            state.info.sourceName = data ? data.sourceName : '--';
            state.info.sourceKeyword = data ? data.sourceKeyword : '--';
            state.info.sourcePositionName = data ? data.sourcePositionName : '--';
            state.info.sourceAreaName = data ? data.sourceAreaName : '--';
            state.info.constellation = data ? data.constellation : '--';
            state.info.exAgent = data ? data.exAgent : '--';
            state.info.exAgentNickname = data ? data.exAgentNickname : '--';
            state.info.idCardVerified = data ? data.idCardVerified : false;
            state.info.jiguan = data ? data.jiguan : '';
            state.info.mark = data ? data.mark : '--';
            state.info.minzu = data ? data.minzu : '--';
            state.info.nextUserId = data ? data.nextUserId : '';
            state.info.phone = data ? data.phone : '--';
            state.info.positioningByPhone = data ? data.positioningByPhone : '--';
            state.info.referrer = data ? data.referrer : '0';
            state.info.registerTime = data && data.registerTime ? data.registerTime : '--';
            state.info.userName = data && data.userName? data.userName : '';
            state.info.deviceId = data && data.deviceId ? data.deviceId : '--';
            state.info.salaryCard = data && data.salaryCard ? data.salaryCard : '--';
            state.info.salaryCardBank = data && data.salaryCardBank ? data.salaryCardBank : '--';
            state.info.rank = data && data.rank ? data.rank : '--';

            state.info.memberLevel= data.memberLevel;
            state.info.memberFrom = data.memberFrom;
            state.info.memberTo = data.memberTo;
        },
        [POSITION_APPLY_LIST](state, data) {
            state.positionApply.pageNo = data ? data.pageNo : 1;
            state.positionApply.pageSize = data ? data.pageSize : 50;
            state.positionApply.totalCount = data ? data.totalCount : 0;
            state.positionApply.items = data && data.items ? data.items : [];
        },
        [APPLY_RECORD_LIST](state, data) {
            state.applyRecordList = data ? data : [];
        },
        [RESERVE_LIST](state, data) {
            state.reserveRecord.pageNo = data ? data.pageNo : 1;
            state.reserveRecord.pageSize = data ? data.pageSize : 50;
            state.reserveRecord.totalCount = data ? data.totalCount : 0;
            state.reserveRecord.items = data && data.items ? data.items : [];
        },
        [PICKUP_LIST](state, data) {
            state.pickUpRecord.pageNo = data ? data.pageNo : 1;
            state.pickUpRecord.pageSize = data ? data.pageSize : 50;
            state.pickUpRecord.totalCount = data ? data.totalCount : 0;
            state.pickUpRecord.items = data && data.items ? data.items : [];
        },
        [SIGNIN_LIST](state, data) {
            state.signinRecord.pageNo = data ? data.pageNo : 1;
            state.signinRecord.pageSize = data ? data.pageSize : 50;
            state.signinRecord.totalCount = data ? data.totalCount : 0;
            state.signinRecord.items = data && data.items ? data.items : [];
        },
        [ONBOARDING_LIST](state, data) {
            state.onboardingRecord.pageNo = data ? data.pageNo : 1;
            state.onboardingRecord.pageSize = data ? data.pageSize : 50;
            state.onboardingRecord.totalCount = data ? data.totalCount : 0;
            state.onboardingRecord.items = data && data.items ? data.items : [];
        },
        [RETURN_FEE_LIST](state, data) {
            state.returnFeeRecord.pageNo = data ? data.pageNo : 1;
            state.returnFeeRecord.pageSize = data ? data.pageSize : 50;
            state.returnFeeRecord.totalCount = data ? data.totalCount : 0;
            state.returnFeeRecord.items = data && data.items ? data.items : [];
        },
        [CUSTOMER_REFERRAL_LIST](state, data) {
            state.referralRecord.pageNo = data ? data.pageNo : 1;
            state.referralRecord.pageSize = data ? data.pageSize : 50;
            state.referralRecord.totalCount = data ? data.totalCount : 0;
            state.referralRecord.items = data && data.items ? data.items : [];
        },
        [SOURCE_LIST](state, data) {
            state.sourceList = data ? data : [];
        },
        [CUSTOMER_REMARK_DETAIL](state, data) {
            state.remarkDetail = data ? data : {};
        },
        [CUSTOMER_FOLLOWING](state, data) {
            state.followingRecord.pageNo = data ? data.pageNo : 1;
            state.followingRecord.pageSize = data ? data.pageSize : 50;
            state.followingRecord.totalCount = data ? data.totalCount : 0;
            state.followingRecord.items = data && data.items ? data.items : [];
        },
        [POSITION_APPLIED](state, data) {
            state.positionApplied.applied = data.applied ? true : false;
            state.positionApplied.contractAgreed = data.contractAgreed ? true : false;
        },
        [CUSTOMER_SPRING_RESERVE](state, data) {
            state.springReserve.pageNo = data ? data.pageNo : 1;
            state.springReserve.pageSize = data ? data.pageSize : 50;
            state.springReserve.totalCount = data ? data.totalCount : 0;
            state.springReserve.items = data && data.items ? data.items : [];
        },
        [CUSTOMER_SPRING_TRIP](state, data) {
            state.springTrip.pageNo = data ? data.pageNo : 1;
            state.springTrip.pageSize = data ? data.pageSize : 50;
            state.springTrip.totalCount = data ? data.totalCount : 0;
            state.springTrip.items = data && data.items ? data.items : [];
        },
        [WORK_CRAD](state, data) {
            state.workCard.pageNo = data ? data.pageNo : 1;
            state.workCard.pageSize = data ? data.pageSize : 50;
            state.workCard.totalCount = data ? data.totalCount : 0;
            state.workCard.items = data && data.items ? data.items : [];
        }
    },
    actions: {
        [CUSTOMER_INFO](context, payload) {
            return Vue.http.get(API['customer'], { params: payload.params, headers: payload.headers}).then((res) => {
                return res.json();
            }, (err) => {
                return err.data;
            }).then(data => {
                if(data.code === '0') {
                    context.commit('CUSTOMER_INFO', data.content);
                    return data.code;
                }
            });
        },
        [APPLY_RECORD_LIST](context, payload) {
            return Vue.http.get(API['apply-history'], { params: payload.params, headers: payload.headers}).then((res) => {
                return res.json();
            }, (err) => {
                return err.data;
            }).then(data => {                
                if(data.code === '0') {
                    context.commit('APPLY_RECORD_LIST', data.content);
                    return data.code;
                }
            });
        },
        [POSITION_APPLY_LIST](context, payload) {
            return Vue.http.post(API['apply-position'], payload.body, {headers: payload.headers}).then((res) => {
                return res.json();
            }, (err) => {
                return err.data;
            }).then(data => {                
                if(data.code === '0') {
                    context.commit('POSITION_APPLY_LIST', data.content);
                    return data.code;
                }
            });
        },
        [RESERVE_LIST](context, payload) {
            return Vue.http.get(API['reserve-list'], { params: payload.params, headers: payload.headers}).then((res) => {
                return res.json();
            }, (err) => {
                return err.data;
            }).then(data => {                
                if(data.code === '0') {
                    context.commit('RESERVE_LIST', data.content);
                    return data.code;
                }
            });
        },
        [PICKUP_LIST](context, payload) {
            return Vue.http.get(API['pick-up-list'], { params: payload.params, headers: payload.headers}).then((res) => {
                return res.json();
            }, (err) => {
                return err.data;
            }).then(data => {                
                if(data.code === '0') {
                    context.commit('PICKUP_LIST', data.content);
                    return data.code;
                }
            });
        },
        [SIGNIN_LIST](context, payload) {
            return Vue.http.get(API['sign-in-list'], { params: payload.params, headers: payload.headers}).then((res) => {
                return res.json();
            }, (err) => {
                return err.data;
            }).then(data => {                
                if(data.code === '0') {
                    context.commit('SIGNIN_LIST', data.content);
                    return data.code;
                }
            });
        },
        [ONBOARDING_LIST](context, payload) {
            return Vue.http.get(API['onboarding-list'], { params: payload.params, headers: payload.headers}).then((res) => {
                return res.json();
            }, (err) => {
                return err.data;
            }).then(data => {                
                if(data.code === '0') {
                    context.commit('ONBOARDING_LIST', data.content);
                    return data.code;
                }
            });
        },
        [RETURN_FEE_LIST](context, payload) {
            return Vue.http.get(API['return-fee-list'], { params: payload.params, headers: payload.headers}).then((res) => {
                return res.json();
            }, (err) => {
                return err.data;
            }).then(data => {                
                if(data.code === '0') {
                    context.commit('RETURN_FEE_LIST', data.content);
                    return data.code;
                }
            });
        },
        [SOURCE_LIST](context, payload) {
            return Vue.http.get(API['sources'], {headers: payload.headers}).then((res) => {
                return res.json();
            }, (err) => {
                return err.data;
            }).then(data => {                
                if(data.code === '0') {
                    context.commit('SOURCE_LIST', data.content);
                    return data.code;
                }
            });
        },
        [CUSTOMER_REFERRAL_LIST](context, payload) {
            return Vue.http.get(API['customer-referral'], {params: payload.params, headers: payload.headers}).then((res) => {
                return res.json();
            }, (err) => {
                return err.data;
            }).then(data => {                
                if(data.code === '0') {
                    context.commit('CUSTOMER_REFERRAL_LIST', data.content);
                    return data.code;
                }
            });
        },
        [CUSTOMER_REFERRAL](context, payload) {
            return Vue.http.post(API['customer-referral'], payload.body, {headers: payload.headers}).then((res) => {
                return res.json();
            }, (err) => {
                return err.data;
            }).then(data => {                
                if(data.code === '0') {
                    return data.code;
                }
            });
        },
        [CUSTOMER_REMARK_DETAIL](context, payload) {
            return Vue.http.get(API['customer-remark'], {params: payload.params, headers: payload.headers}).then((res) => {
                return res.json();
            }, (err) => {
                return err.data;
            }).then(data => {                
                if(data.code === '0') {
                    context.commit('CUSTOMER_REMARK_DETAIL', data.content);
                    return data.content;
                }
            });
        },
        [CUSTOMER_REMARK](context, payload) {
            return Vue.http.post(API['customer-remark'], payload.body, {headers: payload.headers}).then((res) => {
                return res.json();
            }, (err) => {
                return err.data;
            }).then(data => {                
                if(data.code === '0') {
                    return data.code;
                }
            });
        },
        [CUSTOMER_FOLLOWING](context, payload) {
            return Vue.http.get(API['customer-following'], {params: payload.params, headers: payload.headers}).then((res) => {
                return res.json();
            }, (err) => {
                return err.data;
            }).then(data => {                
                if(data.code === '0') {
                    context.commit('CUSTOMER_FOLLOWING', data.content);
                    return data.content;
                }
            });
        },
        [POSITION_APPLIED](context, payload) {
            return Vue.http.get(API['position-applied'], {params: payload.params, headers: payload.headers}).then((res) => {
                return res.json();
            }, (err) => {
                return err.data;
            }).then(data => {                
                if(data.code === '0') {
                    context.commit('POSITION_APPLIED', data.content);
                    return data.content;
                }
            });
        },
        [CUSTOMER_ID](context, payload) {
            return Vue.http.get(API['customer-id'], {params: payload.params, headers: payload.headers}).then((res) => {
                return res.json();
            }, (err) => {
                return err.data;
            }).then(data => {                
                if(data.code === '0') {
                    return data.content;
                }
            });
        },
        [CUSTOMER_SPRING_RESERVE](context, payload) {
            return Vue.http.get(API['spring-reserve'], {params: payload.params, headers: payload.headers}).then((res) => {
                return res.json();
            }, (err) => {
                return err.data;
            }).then(data => {                
                if(data.code === '0') {
                    context.commit('CUSTOMER_SPRING_RESERVE', data.content);
                    return data.code;
                }
            });
        },
        [CUSTOMER_SPRING_TRIP](context, payload) {
            return Vue.http.get(API['spring-trip'], {params: payload.params, headers: payload.headers}).then((res) => {
                return res.json();
            }, (err) => {
                return err.data;
            }).then(data => {                
                if(data.code === '0') {
                    context.commit('CUSTOMER_SPRING_TRIP', data.content);
                    return data.code;
                }
            });
        },
        [WORK_CRAD](context, payload) {
            return Vue.http.get(API['work-card'], {params: payload.params, headers: payload.headers}).then((res) => {
                return res.json();
            }, (err) => {
                return err.data;
            }).then(data => {
                if(data.code === '0') {
                    context.commit('WORK_CRAD', data.content);
                    return data.code;
                }
            });
        },
        [CUSTOMER_AUTH_NAME](context, payload) {
            return Vue.http.post(API['customer-auth-name'], payload.body, {headers: payload.headers}).then((res) => {
                return res.json();
            }, (err) => {
                return err.data;
            }).then(data => {
                if(data.code === '0') {
                    return data.content;
                }
            });
        }
    }
}