import {CANCEL_APPLY, POSITION_HANDLE, CANCEL_RESERVE_POSITION, CANCEL_PICK_UP, RESERVE_NOTIFICATION, DELAY_TASK} from './type';

import Vue from 'vue';
import {API} from './api.js';

export default {
    state: {},
    mutations: {},
    actions: {
        [CANCEL_APPLY](context, payload) {
            return Vue.http.post(API['apply-cancel'], payload.body, {headers: payload.headers}).then((res) => {
                return res.json();
            }, (err) => {
                return err.data;
            }).then(data => {                
                if(data.code === '0') {
                    return data.code;
                }
            });
        },
        [POSITION_HANDLE](context, payload) {
            return Vue.http.post(API['position-handle'], payload.body, {headers: payload.headers}).then((res) => {
                return res.json();
            }, (err) => {
                return err.data;
            }).then(data => {                
                if(data.code === '0') {
                    return data.code;
                }
            });
        },
        [CANCEL_RESERVE_POSITION](context, payload) {
            return Vue.http.post(API['reserve-position-cancel'], payload.body, {headers: payload.headers}).then((res) => {
                return res.json();
            }, (err) => {
                return err.data;
            }).then(data => {                
                if(data.code === '0') {
                    return data.code;
                }
            });
        },
        [CANCEL_PICK_UP](context, payload) {
            return Vue.http.post(API['pick-up-cancel'], payload.body, {headers: payload.headers}).then((res) => {
                return res.json();
            }, (err) => {
                return err.data;
            }).then(data => {                
                if(data.code === '0') {
                    return data.code;
                }
            });
        },
        [RESERVE_NOTIFICATION](context, payload) {
            return Vue.http.post(API['reserve-notification'], payload.body, {headers: payload.headers}).then((res) => {
                return res.json();
            }, (err) => {
                return err.data;
            }).then(data => {                
                if(data.code === '0') {
                    return data.code;
                }
            });
        },
        [DELAY_TASK](context, payload) {
            return Vue.http.post(API['delay-task'], payload.body, {headers: payload.headers}).then((res) => {
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