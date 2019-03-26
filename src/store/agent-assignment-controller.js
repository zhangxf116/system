import {CUSTOMER_LIST, CUSTOMER_ASSIGN, CUSTOMER_ACTIVE, CUSTOMER_ACTIVE_EVENT, AGENT_HISTORY, AGENT_CORE_USER, USER_REFERRAL} from './type';

import Vue from 'vue';
import {API} from './api.js';

export default {
    state: {
        customer: {
            pageNo: 1,
            pageSize: 50,
            totalCount: 0,
            items: []
        },
        customerActive: {
            pageNo: 0,
            pageSize: 50,
            totalCount: 0,
            items: []
        },
        customerActiveEvent: [],
        agentHistory: {
            pageNo: 1,
            pageSize: 50,
            totalCount: 0,
            items: []
        },
        coreUser: {
            pageNo: 1,
            pageSize: 50,
            totalCount: 0,
            items: [] 
        },
        userReferral: {
            pageNo: 1,
            pageSize: 50,
            totalCount: 0,
            items: []
        }
    },
    mutations: {
        [CUSTOMER_LIST](state, data) {
            state.customer.pageNo = data ? data.pageNo : 1;
            state.customer.pageSize = data ? data.pageSize : 50;
            state.customer.totalCount = data ? data.totalCount : 0;
            state.customer.items = data && data.items ? data.items : [];
        },
        [CUSTOMER_ACTIVE](state, data) {
            state.customerActive.pageNo = data ? data.pageNo : 0;
            state.customerActive.pageSize = data ? data.pageSize : 50;
            state.customerActive.totalCount = data ? data.totalCount : 0;
            state.customerActive.items = data && data.items ? data.items : [];
        },
        [CUSTOMER_ACTIVE_EVENT](state, data) {
            state.customerActiveEvent = data ? data : [];
        },
        [AGENT_HISTORY](state, data) {
            state.agentHistory.pageNo = data ? data.pageNo : 1;
            state.agentHistory.pageSize = data ? data.pageSize : 50;
            state.agentHistory.totalCount = data ? data.totalCount : 0;
            state.agentHistory.items = data && data.items ? data.items : [];
        },
        [AGENT_CORE_USER](state, data) {
            state.coreUser.pageNo = data ? data.pageNo : 1;
            state.coreUser.pageSize = data ? data.pageSize : 50;
            state.coreUser.totalCount = data ? data.totalCount : 0;
            state.coreUser.items = data && data.items ? data.items : [];
        },
        [USER_REFERRAL](state, data) {
            state.userReferral.pageNo = data ? data.pageNo : 1;
            state.userReferral.pageSize = data ? data.pageSize : 50;
            state.userReferral.totalCount = data ? data.totalCount : 0;
            state.userReferral.items = data && data.items ? data.items : [];
        },
    },
    actions: {
        [CUSTOMER_LIST](context, payload) {
            return Vue.http.get(API['user'], {params: payload.params, headers: payload.headers}).then((res) => {
                return res.json();
            }, (err) => {
                return err.data;
            }).then(data => {                
                if(data.code === '0') {
                    context.commit('CUSTOMER_LIST', data.content);
                    return data.code;
                }
            });
        },
        [CUSTOMER_ASSIGN](context, payload) {
            return Vue.http.post(API['user-assign'], payload.body, {headers: payload.headers}).then((res) => {
                return res.json();
            }, (err) => {
                return err.data;
            }).then(data => {                
                if(data.code === '0') {
                    return data.code;
                }
            });
        },
        [CUSTOMER_ACTIVE](context, payload) {
            return Vue.http.get(API['active-customers'], {params: payload.params, headers: payload.headers}).then((res) => {
                return res.json();
            }, (err) => {
                return err.data;
            }).then(data => {
                if(data.code === '0') {
                    context.commit('CUSTOMER_ACTIVE', data.content);
                    return data.code;
                }
            });
        },
        [CUSTOMER_ACTIVE_EVENT](context, payload) {
            return Vue.http.get(API['active-customers-events'], {params: payload.params, headers: payload.headers}).then((res) => {
                return res.json();
            }, (err) => {
                return err.data;
            }).then(data => {
                if(data.code === '0') {
                    context.commit('CUSTOMER_ACTIVE_EVENT', data.content);
                    return data.code;
                }
            });
        },
        [AGENT_HISTORY](context, payload) {
            return Vue.http.get(API['agent-history'], {params: payload.params, headers: payload.headers}).then((res) => {
                return res.json();
            }, (err) => {
                return err.data;
            }).then(data => {                
                if(data.code === '0') {
                    context.commit('AGENT_HISTORY', data.content);
                    return data.code;
                }
            });
        },
        [AGENT_CORE_USER](context, payload) {
            return Vue.http.get(API['core-user'], {params: payload.params, headers: payload.headers}).then((res) => {
                return res.json();
            }, (err) => {
                return err.data;
            }).then(data => {                
                if(data.code === '0') {
                    context.commit('AGENT_CORE_USER', data.content);
                    return data.code;
                }
            });
        },
        [USER_REFERRAL](context, payload) {
            return Vue.http.get(API['referral-customer'], {params: payload.params, headers: payload.headers}).then((res) => {
                return res.json();
            }, (err) => {
                return err.data;
            }).then(data => {                
                if(data.code === '0') {
                    context.commit('USER_REFERRAL', data.content);
                    return data.code;
                }
            });
        },
    }
}