import {
    ENTRYIN_LIST,
    ENTRYIN_LIST_CLAIM,
    ENTRYIN_LIST_COMPLETE,

    ENTRYIN_CLAIM,
    ENTRYIN_VISIT,
    ENTRYIN_VISIT_RECORDS,
    ENTRYIN_HISTORY_RECORDS,
    ENTRYIN_STATISTICS,
    
    EVENT_RECEPTIONIST,
    EVENT_REGIST
} from './type';

import Vue from 'vue';
import {API} from './api.js';

export default {
    state: {
        entryin: {},
        entryinClaim: {},
        entryinComplete: {},
        historyList: [],
        visitList: {},

        receptionist: {
            eventCount: 0,
            name: '',
            receptionCount: '',
            satisfaction: 0,
            upTime: 0
        }
    },
    mutations: {
        [ENTRYIN_LIST](state, data) {
            state.entryin = data ? data : {};
        },
        [ENTRYIN_LIST_CLAIM](state, data) {
            state.entryinClaim = data ? data: {};
        },
        [ENTRYIN_LIST_COMPLETE](state, data) {
            state.entryinComplete = data ? data: {};
        },
        [ENTRYIN_HISTORY_RECORDS](state, data) {
            data.sort((a, b) => a.createTime - b.createTime).reverse();
            state.historyList = data ? data : [];
        },
        [ENTRYIN_STATISTICS](state, data) {
            state.visitList = data ? data : {};
        },
        [EVENT_RECEPTIONIST](state, data) {
            state.receptionist.eventCount = data.eventCount ? data.eventCount : 0;
            state.receptionist.name = data.name ? data.name : '';
            state.receptionist.receptionCount = data.receptionCount ? data.receptionCount : 0;
            state.receptionist.satisfaction = data.satisfaction ? data.satisfaction : 0;
            state.receptionist.upTime = data.upTime ? data.upTime : 0;
        }
    },
    actions: {
        // 入职客户
        [ENTRYIN_LIST](context, payload) {
            return Vue.http.get(API['entryin-list'], {params: payload.params, headers: payload.headers}).then((res) => {
                return res.json();
            }, (err) => {
                return err.data;
            }).then(data => {
                if (data.code === '0') {

                    context.commit('ENTRYIN_LIST', data.content);
                    return data.code;
                }
            });
        },
        [ENTRYIN_LIST_CLAIM](context, payload) {
            return Vue.http.get(API['entryin-list'], {params: payload.params, headers: payload.headers}).then((res) => {
                return res.json();
            }, (err) => {
                return err.data;
            }).then(data => {
                if (data.code === '0') {
                    context.commit('ENTRYIN_LIST_CLAIM', data.content);
                    return data.code;
                }
            });
        },
        [ENTRYIN_LIST_COMPLETE](context, payload) {
            return Vue.http.get(API['entryin-list'], {params: payload.params, headers: payload.headers}).then((res) => {
                return res.json();
            }, (err) => {
                return err.data;
            }).then(data => {
                if (data.code === '0') {
                    context.commit('ENTRYIN_LIST_COMPLETE', data.content);
                    return data.code;
                }
            });
        },

        [ENTRYIN_STATISTICS](context, payload) {
            return Vue.http.get(API['entryin-statistics'], {params: payload.params, headers: payload.headers}).then((res) => {
                return res.json();
            }, (err) => {
                return err.data;
            }).then(data => {
                if (data.code === '0') {
                    context.commit('ENTRYIN_STATISTICS', data.content);
                    return data.code;
                }
            });
        },
        [ENTRYIN_CLAIM](context, payload) {
            return Vue.http.post(API['entryin-claim'], payload.body, {headers: payload.headers}).then((res) => {
                return res.json();
            }, (err) => {
                return err.data;
            }).then(data => {
                return data.code;
            });
        },
        [ENTRYIN_VISIT](context, payload){
            return Vue.http.post(API['entryin-visit'], payload.body, {headers: payload.headers}).then((res) => {
                return res.json();
            }, (err) => {
                return err.data;
            }).then(data => {
                if (data.code === '0') {
                    return data.code;
                }
            });
        },

        [EVENT_RECEPTIONIST](context, payload) {
            return Vue.http.get(API['event-receptionist'], {params: payload.params, headers: payload.headers}).then((res) => {
                return res.json();
            }, (err) => {
                return err.data;
            }).then(data => {
                if (data.code === '0') {
                    context.commit('EVENT_RECEPTIONIST', data.content);
                    return data.code;
                }
            });
        },

        [EVENT_REGIST](context, payload) {
            return Vue.http.post(API['event-regist'], payload.body, {headers: payload.headers}).then((res) => {
                return res.json();
            }, (err) => {
                return err.data;
            }).then(data => {
                if (data.code === '0') {
                    return data.code;
                }
            });
        },

        [ENTRYIN_HISTORY_RECORDS](context, payload) {
            return Vue.http.get(API['entryin-visit-records'], {params: payload.params, headers: payload.headers}).then((res) => {
                return res.json();
            }, (err) => {
                return err.data;
            }).then(data => {
                if (data.code === '0') {
                    context.commit('ENTRYIN_HISTORY_RECORDS', data.content);
                    return data.code;
                }
            });
        },
        [ENTRYIN_VISIT_RECORDS](context, payload) {
            return Vue.http.post(API['entryin-visit-records'], payload.body, {headers: payload.headers}).then((res) => {
                return res.json();
            }, (err) => {
                return err.data;
            }).then(data => {
                if (data.code === '0') {
                    return data.code;
                }
            });
        },
    }
}