import {REGIONS, REGIONS_CITY, REGIONS_ASSIGNED_AGENTS, REGIONS_ASSIGNMENT} from './type';

import Vue from 'vue';
import {API} from './api.js';

export default {
    state: {
        regions: [],
        regionsCity: [],
        regionsAssignedAgents: []
    },
    mutations: {
        [REGIONS](state, data) {
            state.regions = data ? data : [];
        },
        [REGIONS_CITY](state, data) {
            state.regionsCity = data ? data : [];
        },
        [REGIONS_ASSIGNED_AGENTS](state, data) {
            state.regionsAssignedAgents = data ? data : [];
        }
    },
    actions: {
        [REGIONS](context, payload) {
            return Vue.http.get(API['regions'], {params: payload.params, headers: payload.headers}).then((res) => {
                return res.json();
            }, (err) => {
                return err.data;
            }).then(data => {                
                if(data.code === '0') {
                    context.commit('REGIONS', data.content);
                    return data.code;
                }
            });
        },
        [REGIONS_CITY](context, payload) {
            return Vue.http.get(API['regions-city'], {params: payload.params, headers: payload.headers}).then((res) => {
                return res.json();
            }, (err) => {
                return err.data;
            }).then(data => {                
                if(data.code === '0') {
                    context.commit('REGIONS_CITY', data.content);
                    return data.code;
                }
            });
        },
        [REGIONS_ASSIGNED_AGENTS](context, payload) {
            return Vue.http.get(API['regions-assigned-agents'], {headers: payload.headers}).then((res) => {
                return res.json();
            }, (err) => {
                return err.data;
            }).then(data => {                
                if(data.code === '0') {
                    context.commit('REGIONS_ASSIGNED_AGENTS', data.content);
                    return data.code;
                }
            });
        },
        [REGIONS_ASSIGNMENT](context, payload) {
            return Vue.http.post(API['regions-assignment'], payload.body, {headers: payload.headers}).then((res) => {
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