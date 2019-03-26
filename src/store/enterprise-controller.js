import {ENTERPRISE_POSITION, ENTERPRISE_CITY} from './type';

import Vue from 'vue';
import {API} from './api.js';

export default {
    state: {
        position: {
            pageNo: 1,
            pageSize: 50,
            totalCount: 0,

            items: []
        },
        cityList: []
    },
    mutations: {
        [ENTERPRISE_POSITION](state, data) {
            state.position.pageNo = data ? data.pageNo : 1;
            state.position.pageSize = data ? data.pageSize : 50;
            state.position.totalCount = data ? data.totalCount : 0;

            state.position.items = data && data.items ? data.items : [];
        },
        [ENTERPRISE_CITY](state, data) {
            state.cityList = data ? data : [];
        }
    },
    actions: {
        [ENTERPRISE_POSITION](context, payload) {
            return Vue.http.post(API['enterprise-position'], payload.body, {headers: payload.headers}).then((res) => {
                return res.json();
            }, (err) => {
                return err.data;
            }).then(data => {                
                if(data.code === '0') {
                    context.commit('ENTERPRISE_POSITION', data.content);
                    return data.code;
                }
            });
        },
        [ENTERPRISE_CITY](context, payload) {
            return Vue.http.get(API['enterprise-city'], {headers: payload.headers}).then((res) => {
                return res.json();
            }, (err) => {
                return err.data;
            }).then(data => {                
                if(data.code === '0') {
                    context.commit('ENTERPRISE_CITY', data.content);
                    return data.code;
                }
            });
        }
    }
}