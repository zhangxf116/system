import {ASSIGN_RULE_CONFIGURE_LIST, ASSIGN_RULE_CONFIGURE, ALL_ASSIGN_RULE_CONFIGURE_LIST, ALL_ASSIGN_RULE_CONFIGURE_EDIT} from './type';

import Vue from 'vue';
import {API} from './api.js';

export default {
    state: {
        singleAssignCount: {
            pageNo: 1,
            pageSize: 20,
            totalCount: 0,

            items: [],
        },
        allAssignCount: {
            list: []
        }
    },
    mutations: {
        [ASSIGN_RULE_CONFIGURE_LIST](state, data) {
            state.singleAssignCount.pageNo = data ? data.pageNo : 1;
            state.singleAssignCount.pageSize = data ? data.pageSize : 50;
            state.singleAssignCount.totalCount = data ? data.totalCount : 0;

            state.singleAssignCount.items = data && data.items ? data.items : [];
        },
        [ALL_ASSIGN_RULE_CONFIGURE_LIST](state, data) {
            state.allAssignCount.list = data && data ? data : [];
       }
    },
    actions: {
        [ASSIGN_RULE_CONFIGURE_LIST](context, payload) {
            return Vue.http.get(API['assign-rule-configure'], {params: payload.params, headers: payload.headers}).then((res) => {
                return res.json();
            }, (err) => {
                return err.data;
            }).then(data => {                
                if(data.code === '0') {
                    context.commit('ASSIGN_RULE_CONFIGURE_LIST', data.content);
                    return data.code;
                }
            });
        },
        [ASSIGN_RULE_CONFIGURE](context, payload) {
            return Vue.http.post(API['assign-rule-configure'], payload.body, {headers: payload.headers}).then((res) => {
                return res.json();
            }, (err) => {
                return err.data;
            }).then(data => {                
                if(data.code === '0') {
                    return data.code;
                }
            });
        },
        [ALL_ASSIGN_RULE_CONFIGURE_LIST](context, payload) {
            return Vue.http.get(API['all-assign-rule-configure'], {headers: payload.headers}).then((res) => {
                return res.json();
            }, (err) => {
                return err.data;
            }).then(data => {
                if(data.code === '0') {
                    context.commit('ALL_ASSIGN_RULE_CONFIGURE_LIST', data.content);
                    return data.code;
                }
            });
        },
        [ALL_ASSIGN_RULE_CONFIGURE_EDIT](context, payload) {
            return Vue.http.post(API['all-assign-rule-configure'], payload.body, {headers: payload.headers}).then((res) => {
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