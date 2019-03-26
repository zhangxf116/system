import {AGENT_SIGN_IN_LIST, AGENT_SIGN_IN_LIST_EXPORT, AGENT_SIGN_IN} from './type';

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
        [AGENT_SIGN_IN_LIST](state, data) {
            state.pageNo = data ? data.pageNo : 1;
            state.pageSize = data ? data.pageSize : 50;
            state.totalCount = data ? data.totalCount : 0;

            state.items = data && data.items ? data.items : [];
        }
    },
    actions: {
        [AGENT_SIGN_IN_LIST](context, payload) {
            return Vue.http.get(API['sign-in-record'], {params: payload.params, headers: payload.headers}).then((res) => {
                return res.json();
            }, (err) => {
                return err.data;
            }).then(data => {                
                if(data.code === '0') {
                    context.commit('AGENT_SIGN_IN_LIST', data.content);
                    return data.code;
                }
            });
        },
        [AGENT_SIGN_IN_LIST_EXPORT](context, payload) {
            return Vue.http.get(API['sign-in-record'], {params: payload.params, responseType: 'blob', headers: payload.headers}).then((res) => {
                let headers = res.headers.map;

                let contentDisposition = headers['Content-Disposition'] ? headers['Content-Disposition'] : headers['content-disposition'];
                let filename = JSON.parse((contentDisposition[0] || '').split('filename=')[1]);

                let blob = res.body;
                let link = document.createElement('a');
                    link.href = window.URL.createObjectURL(blob);

                    link.download = filename;
                    link.click();
                
                return res.ok;
            }, (err) => {
                return err.data;
            }).then(data => {                
                if(data.code === '0') {
                    return data.code;
                }
            });
        },
        [AGENT_SIGN_IN](context, payload) {
            return Vue.http.post(API['sign-in'], payload.body, {headers: payload.headers}).then((res) => {
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