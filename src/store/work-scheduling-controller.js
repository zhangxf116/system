import {WORK_SCHEDULING_LIST, WORK_SCHEDULING_ADD, WORK_SCHEDULING_EDIT, WORK_SCHEDULING_DATE} from './type';

import Vue from 'vue';
import {API} from './api.js';

export default {
    state: {
        pageNo: 1,
        pageSize: 50,
        totalCount: 0,

        items: [],

        lastSchedulingDate: ''
    },
    mutations: {
        [WORK_SCHEDULING_LIST](state, data) {
            state.pageNo = data ? data.pageNo : 1;
            state.pageSize = data ? data.pageSize : 50;
            state.totalCount = data ? data.totalCount : 0;

            state.items = data && data.items ? data.items : [];
        },
        [WORK_SCHEDULING_DATE](state, data) {
            state.lastSchedulingDate = data ? data : '';
        },
    },
    actions: {
        [WORK_SCHEDULING_LIST](context, payload) {
            return Vue.http.get(API['work-scheduling'], {params: payload.params, headers: payload.headers}).then((res) => {
                return res.json();
            }, (err) => {
                return err.data;
            }).then(data => {                
                if(data.code === '0') {
                    context.commit('WORK_SCHEDULING_LIST', data.content);
                    return data.code;
                }
            });
        },
        [WORK_SCHEDULING_DATE](context, payload) {
            return Vue.http.get(API['work-scheduling-date'], {params: payload.params, headers: payload.headers}).then((res) => {
                return res.json();
            }, (err) => {
                return err.data;
            }).then(data => {                
                if(data.code === '0') {
                    context.commit('WORK_SCHEDULING_DATE', data.content);
                    return data.content;
                }
            });
        },
        [WORK_SCHEDULING_ADD](context, payload) {
            return Vue.http.post(API['work-scheduling'], payload.body, {headers: payload.headers}).then((res) => {
                return res.json();
            }, (err) => {
                return err.data;
            }).then(data => {                
                if(data.code === '0') {
                    return data.code;
                }
            });
        },
        [WORK_SCHEDULING_EDIT](context, payload) {
            return Vue.http.patch(API['work-scheduling'], payload.body, {headers: payload.headers}).then((res) => {
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