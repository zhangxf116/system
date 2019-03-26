import { UNCLAIMED_LIST ,NOTICES, CUSTOMERS_ALLOCATION, CLAIMED_LIST , CLAIM_SUCCESS, LOCATION_OF_EXPECTATION, REMARK_COMMENT, REMARK_COMMENTS, REMARK_USER, REMARK_USERS, COMPLETELIST, } from './type';

import Vue from 'vue';
import {API} from './api.js';

export default {
    state: {
        unclaime: {
            pageNo: 1,
            pageSize: 20,
            totalCount: 0,
            items: []
        },
        claimedList: {
            pageNo: 1,
            pageSize: 20,
            totalCount: 0,
            items: []
        },
        locationofexpectationList: [],
        remarkList: {
            pageNo: 1,
            pageSize: 20,
            totalCount: 0,
            items: []
        },
        remarkUser: {},
        completeList: {
            pageNo: 1,
            pageSize: 20,
            totalCount: 0,
            items: []
        },
        notices: {
            pageNo: 1,
            pageSize: 20,
            totalCount: 0,
            items: []
        }
    },
    mutations: {
        [UNCLAIMED_LIST](state, data) {
            state.unclaime.pageNo = data ? data.pageNo : 1;
            state.unclaime.pageSize = data ? data.pageSize : 20;
            state.unclaime.totalCount = data ? data.totalCount : 0;
            state.unclaime.items = data && data.items ? data.items : [];

        },
        [CLAIMED_LIST](state, data) {
            state.claimedList.pageNo = data ? data.pageNo : 1;
            state.claimedList.pageSize = data ? data.pageSize : 20;
            state.claimedList.totalCount = data ? data.totalCount : 0;
            state.claimedList.items = data && data.items ? data.items : [];
        },
        [NOTICES](state, data) {
            state.notices.pageNo = data ? data.pageNo : 1;
            state.notices.pageSize = data ? data.pageSize : 20;
            state.notices.totalCount = data ? data.totalCount : 0;
            state.notices.items = data && data.items ? data.items : [];
        },
        [LOCATION_OF_EXPECTATION](state, data) {
            state.locationofexpectationList = data ? data : [];
        },
        [COMPLETELIST](state, data) {
            state.completeList.pageNo = data ? data.pageNo : 1;
            state.completeList.pageSize = data ? data.pageSize : 50;
            state.completeList.totalCount = data ? data.totalCount : 0;
            state.completeList.items = data && data.items ? data.items : [];
        },
        [REMARK_COMMENTS](state, data) {
            state.remarkList.pageNo = data ? data.pageNo : 1;
            state.remarkList.pageSize = data ? data.pageSize : 50;
            state.remarkList.totalCount = data ? data.totalCount : 0;
            state.remarkList.items = data && data.items ? data.items : [];
        },
        [REMARK_USERS](state, data) {
            state.remarkUser = data ? data : {};
        },
        
    },
    actions: {
        [UNCLAIMED_LIST](context, payload) {
            return Vue.http.get(API['unclaimed-list'], { params: payload.params, headers: payload.headers}).then((res) => {
                return res.json();
            }, (err) => {
                return err.data;
            }).then(data => {                
                if(data.code === '0') {
                    context.commit('UNCLAIMED_LIST', data.content);
                    return data.code;
                }
            });
        },
        [COMPLETELIST](context, payload) {
            return Vue.http.get(API['claimed-list'], { params: payload.params, headers: payload.headers}).then((res) => {
                return res.json();
            }, (err) => {
                return err.data;
            }).then(data => {                
                if(data.code === '0') {
                    data.content.items.map((v,k)=>{
                        if(v.noteStatus){
                            v.noteStatus = false;
                        }else{
                            v.noteStatus = true;
                        }
                    })
                    context.commit('COMPLETELIST', data.content);
                    return data.code;
                }
            });
        },
        [CLAIMED_LIST](context, payload) {
            return Vue.http.get(API['claimed-list'], { params: payload.params, headers: payload.headers}).then((res) => {
                return res.json();
            }, (err) => {
                return err.data;
            }).then(data => {                
                if(data.code === '0') {
                    data.content.items.map((v,k)=>{
                        if(v.noteStatus){
                            v.noteStatus = false;
                        }else{
                            v.noteStatus = true;
                        }
                    })
                    context.commit('CLAIMED_LIST', data.content);
                    return data.code;
                }
            });
        },
        [NOTICES](context, payload) {
            return Vue.http.get(API['claimed-list'], { params: payload.params, headers: payload.headers}).then((res) => {
                return res.json();
            }, (err) => {
                return err.data;
            }).then(data => {                
                if(data.code === '0') {
                    data.content.items.map((v,k)=>{
                        if(v.noteStatus){
                            v.noteStatus = false;
                        }else{
                            v.noteStatus = true;
                        }
                    })
                    context.commit('NOTICES', data.content);
                    return data.code;
                }
            });
        },
        [CLAIM_SUCCESS](context, payload) {
            return Vue.http.post(API['claim-success'], payload.body, {headers: payload.headers}).then((res) => {
                return res.json();
            }, (err) => {
                return err.data;
            }).then(data => {                
                if(data.code === '0') {
                    return data.code;
                }
            });
        },
        [LOCATION_OF_EXPECTATION](context, payload) { 
            return Vue.http.get(API['location-of-expectation'], { params: payload.params, headers: payload.headers}).then((res) => {
                return res.json();
            }, (err) => {
                return err.data;
            }).then(data => {                
                if(data.code === '0') {
                    context.commit('LOCATION_OF_EXPECTATION', data.content);
                    return data.code;
                }
            });
        },
        [REMARK_COMMENT](context, payload) {
            return Vue.http.post(API['remark-comments'], payload.body, {headers: payload.headers}).then((res) => {
                return res.json();
            }, (err) => {
                return err.data;
            }).then(data => {                
                if(data.code === '0') {
                    return data.code;
                }
            });
        },
        [REMARK_USER](context, payload) {
            return Vue.http.post(API['remark-user'], payload.body, {headers: payload.headers}).then((res) => {
                return res.json();
            }, (err) => {
                return err.data;
            }).then(data => {                
                if(data.code === '0') {
                    return data.code;
                }
            });
        },
        [REMARK_COMMENTS](context, payload) { 
            return Vue.http.get(API['remark-comments'], { params: payload.params, headers: payload.headers}).then((res) => {
                return res.json();
            }, (err) => {
                return err.data;
            }).then(data => {                
                if(data.code === '0') {
                    context.commit('REMARK_COMMENTS', data.content);
                    return data.content.items;
                }
            });
        },
        [REMARK_USERS](context, payload) { 
            return Vue.http.get(API['remark-user'], { params: payload.params, headers: payload.headers}).then((res) => {
                return res.json();
            }, (err) => {
                return err.data;
            }).then(data => {                
                if(data.code === '0') {
                    context.commit('REMARK_USERS', data.content);
                    return data.content;
                }
            });
        },
        [CUSTOMERS_ALLOCATION](context, payload) {
            return Vue.http.post(API['customers-allocation'], payload.body, {headers: payload.headers}).then((res) => {
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