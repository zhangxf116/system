import { WECHAT, WECHAT_ADD, WECHAT_EDIT, WECHAT_DELETE } from './type';

import Vue from 'vue';
import {API} from './api.js';

export default {
    state: {
        wechatList: {
            pageNo: 1,
            pageSize: 50,
            totalCount: 0,
            list: []
        }
    },
    mutations: {
        [WECHAT](state, data) {
            state.wechatList.pageNo = data ? data.pageNo : 1;
            state.wechatList.pageSize = data ? data.pageSize : 50;
            state.wechatList.totalCount = data ? data.totalCount : 0;
            state.wechatList.items = data && data.items ? data.items : [];
        }
    },
    actions: {
        [WECHAT](context, payload) {
            return Vue.http.get(API['wechat'], {params: payload.params, headers: payload.headers}).then((res) => {
                return res.json();
            }, (err) => {
                return err.data;
            }).then(data => {
                if(data.code === '0') {
                    context.commit('WECHAT', data.content);
                    return data.code;
                }
            });
        },
        [WECHAT_ADD](context, payload) {
            return Vue.http.post(API['wechat'], payload.body, { headers: payload.headers}).then((res) => {
                return res.json();
            }, (err) => {
                return err.data;
            }).then(data => {
                if(data.code === '0') {
                    return data.code;
                }
            });
        },
        [WECHAT_EDIT](context, payload) {
            return Vue.http.put(API['wechat'], payload.body, { headers: payload.headers}).then((res) => {
                return res.json();
            }, (err) => {
                return err.data;
            }).then(data => {
                if(data.code === '0') {
                    return data.code;
                }
            });
        },
        [WECHAT_DELETE](context, payload) {
            return Vue.http.delete(API['wechat'], {params: payload.params, headers: payload.headers}).then((res) => {
                return res.json();
            }, (err) => {
                return err.data;
            }).then(data => {
                if(data.code === '0') {
                    return data.code;
                }
            });
        },
    }
}