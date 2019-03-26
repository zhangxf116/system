import {STORE_LIST, STORE_LOCATION_LIST} from './type';

import Vue from 'vue';
import {API} from './api.js';

export default {
    state: {
        list: [],
        locationList: []
    },
    mutations: {
        [STORE_LIST](state, data) {
            state.list = data ? data : [];
        },
        [STORE_LOCATION_LIST](state, data) {
            state.locationList = data ? data : [];
        },
    },
    actions: {
        [STORE_LIST](context, payload) {
            return Vue.http.get(API['store-list'], {headers: payload.headers}).then((res) => {
                return res.json();
            }, (err) => {
                return err.data;
            }).then(data => {                
                if(data.code === '0') {
                    context.commit('STORE_LIST', data.content);
                    return data.code;
                }
            });
        },
        [STORE_LOCATION_LIST](context, payload) {
            return Vue.http.get(API['store-location-list'], { params: payload.params, headers: payload.headers}).then((res) => {
                return res.json();
            }, (err) => {
                return err.data;
            }).then(data => {                
                if(data.code === '0') {
                    context.commit('STORE_LOCATION_LIST', data.content);
                    return data.code;
                }
            });
        }
    }
}