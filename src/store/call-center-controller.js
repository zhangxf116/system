import {CALL, CALL_RECORD, CALL_SEAT, CALL_SIP_PHONE, CALL_ADD, CALL_DELETE, CALL_UNBIND, CALL_BIND_EDIT, CALL_WAY_SWITCH, CALL_WAY_LIST, CALL_IS_TEL} from './type';

import Vue from 'vue';
import {API} from './api.js';

export default {
    state: {
        record: {
            pageNo: 1,
            pageSize: 20,
            totalCount: 0,
            items: [],
        },
        seat: {
            pageNo: 1,
            pageSize: 20,
            totalCount: 0,
            items: [],
        },
        sipPhoneList: [],
        callWayList: [],
        isTel: false
    },
    mutations: {
        [CALL_RECORD](state, data) {
            state.record.pageNo = data ? data.pageNo : 1;
            state.record.pageSize = data ? data.pageSize : 20;
            state.record.totalCount = data ? data.totalCount : 0;
            state.record.items = data && data.items ? data.items : [];
        },
        [CALL_SEAT](state, data) {
            state.seat.pageNo = data ? data.pageNo : 1;
            state.seat.pageSize = data ? data.pageSize : 20;
            state.seat.totalCount = data ? data.totalCount : 0;
            state.seat.items = data && data.items ? data.items : [];
        },
        [CALL_SIP_PHONE](state, data) {   
            state.sipPhoneList = data ? data : [];
        },
        [CALL_WAY_LIST](state, data) {   
            state.callWayList = data ? data : [];
        },
        [CALL_IS_TEL](state, data) {   
            state.isTel = data ? data : false;
        }
    },
    actions: {
        [CALL](context, payload) {
            return Vue.http.post(API['call'], payload.body, {headers: payload.headers}).then((res) => {
                return res.json();
            }, (err) => {
                return err.data;
            }).then(data => {                
                if(data.code === '0') {
                    return data.content;
                }
            });
        },
        [CALL_RECORD](context, payload) {
            return Vue.http.get(API['call-record'], {params: payload.params, headers: payload.headers}).then((res) => {
                return res.json();
            }, (err) => {
                return err.data;
            }).then(data => {                
                if(data.code === '0') {
                    context.commit('CALL_RECORD', data.content);
                    return data.code;
                }
            });
        },
        [CALL_SEAT](context, payload) {
            return Vue.http.get(API['receptionist'], {params: payload.params, headers: payload.headers}).then((res) => {
                return res.json();
            }, (err) => {
                return err.data;
            }).then(data => {                
                if(data.code === '0') {
                    context.commit('CALL_SEAT', data.content);
                    return data.code;
                }
            });
        },
        [CALL_SIP_PHONE](context, payload) {
            return Vue.http.get(API['sip-phone'], {params: payload.params, headers: payload.headers}).then((res) => {
                return res.json();
            }, (err) => {
                return err.data;
            }).then(data => {                
                if(data.code === '0') {
                    context.commit('CALL_SIP_PHONE', data.content);
                    return data.code;
                }
            });
        },
        [CALL_ADD](context, payload) {
            return Vue.http.post(API['receptionist'], payload.body, {headers: payload.headers}).then((res) => {
                return res.json();
            }, (err) => {
                return err.data;
            }).then(data => {                
                if(data.code === '0') {
                    return data.code;
                }
            });
        },
        [CALL_DELETE](context, payload) {
            return Vue.http.delete(API['receptionist'], {body: payload.body, headers: payload.headers}).then((res) => {
                return res.json();
            }, (err) => {
                return err.data;
            }).then(data => {                
                if(data.code === '0') {
                    return data.code;
                }
            });
        },
        [CALL_UNBIND](context, payload) {
            return Vue.http.delete(API['unbind'], {body: payload.body, headers: payload.headers}).then((res) => {
                return res.json();
            }, (err) => {
                return err.data;
            }).then(data => {                
                if(data.code === '0') {
                    return data.code;
                }
            });
        },
        [CALL_BIND_EDIT](context, payload) {
            return Vue.http.post(API['unbind'], payload.body, {headers: payload.headers}).then((res) => {
                return res.json();
            }, (err) => {
                return err.data;
            }).then(data => {                
                if(data.code === '0') {
                    return data.code;
                }
            });
        },
        [CALL_WAY_LIST](context, payload) {
            return Vue.http.get(API['call-way-list'], {headers: payload.headers}).then((res) => {
                return res.json();
            }, (err) => {
                return err.data;
            }).then(data => {                
                if(data.code === '0') {
                    context.commit('CALL_WAY_LIST', data.content);
                    return data.content;
                }
            });
        },
        [CALL_WAY_SWITCH](context, payload) {
            return Vue.http.post(API['call-way-switch'], payload.body, {headers: payload.headers}).then((res) => {
                return res.json();
            }, (err) => {
                return err.data;
            }).then(data => {                
                if(data.code === '0') {
                    return data.code;
                }
            });
        },
        [CALL_IS_TEL](context, payload) {
            return Vue.http.get(API['call-is-tel'], {headers: payload.headers}).then((res) => {
                return res.json();
            }, (err) => {
                return err.data;
            }).then(data => {                
                if(data.code === '0') {
                    context.commit('CALL_IS_TEL', data.content);
                    return data.code;
                }
            });
        },
    }
}