import {APP_CALL, APP_CALL_STATUS} from './type';

import Vue from 'vue';
import {API} from './api.js';

export default {
    state: {},
    mutations: {},
    actions: {
        [APP_CALL](context, payload) {
            return Vue.http.post(API['app-call'], payload.body, {headers: payload.headers}).then((res) => {
                return res.json();
            }, (err) => {
                return err.data;
            }).then(data => {                
                if(data.code === '0') {
                    return data.content;
                }
            });
        },
        [APP_CALL_STATUS](context, payload) {
            return Vue.http.get(API['app-call-status'], {headers: payload.headers}).then((res) => {
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