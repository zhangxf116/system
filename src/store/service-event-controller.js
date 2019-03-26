import {EVENT_CUSTOMER_LIST, EVENT_CUSTOMER_EXPORT, EVENT_CUSTOMER} from './type';

import Vue from 'vue';
import {API} from './api.js';

export default {
    state: {
        event: {
            pageNo: 1,
            pageSize: 50,
            totalCount: 0,
            items: [],
        }
    },
    mutations: {
        [EVENT_CUSTOMER_LIST](state, data) {
            state.event.pageNo = data ? data.pageNo : 1;
            state.event.pageSize = data ? data.pageSize : 50;
            state.event.totalCount = data ? data.totalCount : 0;
            state.event.items = data && data.items ? data.items : [];
        }
    },
    actions: {
        [EVENT_CUSTOMER_LIST](context, payload) {
            return Vue.http.get(API['event-customer'], {params: payload.params, headers: payload.headers}).then((res) => {
                return res.json();
            }, (err) => {
                return err.data;
            }).then(data => {                
                if(data.code === '0') {
                    context.commit('EVENT_CUSTOMER_LIST', data.content);
                    return data;
                }
            });
        },
        [EVENT_CUSTOMER_EXPORT](context, payload) {
            return Vue.http.get(API['event-customer'], {params: payload.params, responseType: 'blob', headers: payload.headers}).then((res) => {
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
        [EVENT_CUSTOMER](context, payload) {
            return Vue.http.post(API['event-customer'], payload.body, {headers: payload.headers}).then((res) => {
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