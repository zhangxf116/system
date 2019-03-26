import {RECORD_ADD, RECORD_HISTORY} from './type';

import Vue from 'vue';
import {API} from './api.js';

export default {
    state: {
        pageNo: 1,
        pageSize: 50,
        totalCount: 0,
        items: []
    },
    mutations: {
        [RECORD_HISTORY](state, data) {
            state.pageNo = data ? data.pageNo : 1;
            state.pageSize = data ? data.pageSize : 50;
            state.totalCount = data ? data.totalCount : 0;
            state.items = data && data.items ? data.items : [];
        }
    },
    actions: {
        [RECORD_HISTORY](context, payload) {
            return Vue.http.get(API['record'], { params: payload.params, headers: payload.headers}).then((res) => {
                return res.json();
            }, (err) => {
                return err.data;
            }).then(data => {                
                if(data.code === '0') {
                    context.commit('RECORD_HISTORY', data.content);
                    return data.code;
                }
            });
        },
        [RECORD_ADD](context, payload) {
            return Vue.http.post(API['record'], payload.body, {headers: payload.headers}).then((res) => {
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