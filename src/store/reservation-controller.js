import {RESERVE, RESERVE_PICKUP_DATE, RESERVE_PICKUP_LOCATION, RESERVE_PICKUP_ALL, RESERVE_TOLL} from './type';

import Vue from 'vue';
import {API} from './api.js';

export default {
    state: {
        pickupAll: [],
        pickupDate: [],
        pickupLocation: [],
        toll: {}
    },
    mutations: {
        [RESERVE_PICKUP_ALL](state, data) {
            state.pickupAll = data ? data : [];
        },
        [RESERVE_PICKUP_DATE](state, data) {
             state.pickupDate = data ? data : [];
        },
        [RESERVE_PICKUP_LOCATION](state, data) {
            state.pickupLocation = data ? data : [];
        },
        [RESERVE_TOLL](state, data) {
            state.toll = data ? data : {};
        }
    },
    actions: {
        [RESERVE_PICKUP_ALL](context, payload) {
            return Vue.http.get(API['reserve-all-pickup'], { params: payload.params, headers: payload.headers}).then((res) => {
                return res.json();
            }, (err) => {
                return err.data;
            }).then(data => {                
                if(data.code === '0') {
                    context.commit('RESERVE_PICKUP_ALL', data.content);
                    return data.code;
                }
            });
        },
        [RESERVE_PICKUP_DATE](context, payload) {
            return Vue.http.get(API['reserve-pickup-date'], { params: payload.params, headers: payload.headers}).then((res) => {
                return res.json();
            }, (err) => {
                return err.data;
            }).then(data => {                
                if(data.code === '0') {
                    context.commit('RESERVE_PICKUP_DATE', data.content);
                    return data.code;
                }
            });
        },
        [RESERVE_PICKUP_LOCATION](context, payload) {
            return Vue.http.get(API['reserve-pickup-location'], { params: payload.params, headers: payload.headers}).then((res) => {
                return res.json();
            }, (err) => {
                return err.data;
            }).then(data => {                
                if(data.code === '0') {
                    context.commit('RESERVE_PICKUP_LOCATION', data.content);
                    return data.code;
                }
            });
        },
        [RESERVE](context, payload) {
            return Vue.http.post(API['reserve'], payload.body, {headers: payload.headers}).then((res) => {
                return res.json();
            }, (err) => {
                return err.data;
            }).then(data => {                
                if(data.code === '0') {
                    return data.code;
                }
            });
        },
        [RESERVE_TOLL](context, payload) {
            return Vue.http.get(API['reserve-toll'], { params: payload.params, headers: payload.headers}).then((res) => {
                return res.json();
            }, (err) => {
                return err.data;
            }).then(data => {                
                if(data.code === '0') {
                    context.commit('RESERVE_TOLL', data.content);
                    return data.code;
                }
            });
        }
    }
}