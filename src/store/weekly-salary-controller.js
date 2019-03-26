import {SALARY_SIGN_IN, SALARY_SIGN_IN_LIST, SALARY_PAYMENT_LIST, SALARY_DAY_LIST} from './type';

import Vue from 'vue';
import {API} from './api.js';

export default {
    state: {
        signIn: {
            pageNo: 1,
            pageSize: 50,
            totalCount: 0,

            items: []
        },
        payment: {
            pageNo: 1,
            pageSize: 50,
            totalCount: 0,

            items: []
        },
        day: {
            pageNo: 1,
            pageSize: 50,
            totalCount: 0,

            items: []
        }
    },
    mutations: {
        [SALARY_SIGN_IN_LIST](state, data) {
            state.signIn.pageNo = data ? data.pageNo : 1;
            state.signIn.pageSize = data ? data.pageSize : 50;
            state.signIn.totalCount = data ? data.totalCount : 0;

            state.signIn.items = data && data.items ? data.items : [];
        },
        [SALARY_PAYMENT_LIST](state, data) {
            state.payment.pageNo = data ? data.pageNo : 1;
            state.payment.pageSize = data ? data.pageSize : 50;
            state.payment.totalCount = data ? data.totalCount : 0;

            state.payment.items = data && data.items ? data.items : [];
        },
        [SALARY_DAY_LIST](state, data) {
            state.day.pageNo = data ? data.pageNo : 1;
            state.day.pageSize = data ? data.pageSize : 50;
            state.day.totalCount = data ? data.totalCount : 0;

            state.day.items = data && data.items ? data.items : [];
        }
    },
    actions: {
        [SALARY_SIGN_IN_LIST](context, payload) {
            return Vue.http.get(API['salary-sign-in'], {params: payload.params, headers: payload.headers}).then((res) => {
                return res.json();
            }, (err) => {
                return err.data;
            }).then(data => {                
                if(data.code === '0') {
                    context.commit('SALARY_SIGN_IN_LIST', data.content);
                    return data.code;
                }
            });
        },
        [SALARY_PAYMENT_LIST](context, payload) {
            return Vue.http.get(API['salary-payment'], {params: payload.params, headers: payload.headers}).then((res) => {
                return res.json();
            }, (err) => {
                return err.data;
            }).then(data => {                
                if(data.code === '0') {
                    context.commit('SALARY_PAYMENT_LIST', data.content);
                    return data.code;
                }
            });
        },
        [SALARY_DAY_LIST](context, payload) {
            return Vue.http.get(API['salary-day'], {params: payload.params, headers: payload.headers}).then((res) => {
                return res.json();
            }, (err) => {
                return err.data;
            }).then(data => {                
                if(data.code === '0') {
                    context.commit('SALARY_DAY_LIST', data.content);
                    return data.code;
                }
            });
        },
        [SALARY_SIGN_IN](context, payload) {
            return Vue.http.post(API['salary-sign-in'], payload.body, {headers: payload.headers}).then((res) => {
                return res.json();
            }, (err) => {
                return err.data;
            }).then(data => {                
                if(data.code === '0') {
                    return data.code;
                }
            });
        }
    }
}