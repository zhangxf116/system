import Vue from 'vue';
import {SOURCE_CONFIGURE, SOURCE_CONFIGURE_ADD, SOURCE_CONFIGURE_EDIT, SOURCE_CONFIGURE_DELETE, SOURCE_CONFIGURE_AREA, SOURCE_CONFIGURE_AREA_ADD,SOURCE_CONFIGURE_AREA_DELTET} from './type';
import {API} from './api';

export default {
    state: {
        list: [],
        areaList: []
    },
    mutations: {
        [SOURCE_CONFIGURE](state, data) {
            state.list = data ? data : [];
        },
        [SOURCE_CONFIGURE_AREA](state, data) {
            state.areaList = data ? data : [];
        },
    },
    actions: {
        [SOURCE_CONFIGURE](context, payload) {
            return Vue.http.get(API['sources-configure'], {params: payload.params,  headers: payload.headers}).then((res) => {
                return res.json();
            }, (err) => {
                return err;
            }).then(data => {
                if (data.code === '0') {
                    context.commit('SOURCE_CONFIGURE', data.content);
                    return data.code;
                }
            });
        },
        [SOURCE_CONFIGURE_ADD](context, payload) {
            return Vue.http.post(API['sources-configure'], payload.body, { headers: payload.headers}).then((res) => {
                return res.json();
            }, (err) => {
                return err;
            }).then(data => {
                if (data.code === '0') {
                    return data.code;
                }
            });
        },
        [SOURCE_CONFIGURE_EDIT](context, payload) {
            return Vue.http.patch(API['sources-configure'], payload.body, { headers: payload.headers}).then((res) => {
                return res.json();
            }, (err) => {
                return err;
            }).then(data => {
                if (data.code === '0') {
                    return data.code;
                }
            });
        },
        [SOURCE_CONFIGURE_DELETE](context, payload) {
            return Vue.http.delete(API['sources-configure'], {params: payload.params,  headers: payload.headers}).then((res) => {
                return res.json();
            }, (err) => {
                return err;
            }).then(data => {
                if (data.code === '0') {
                    return data.code;
                }
            });
        },
        [SOURCE_CONFIGURE_AREA](context, payload) {
            return Vue.http.get(API['sources-configure-areas'], {headers: payload.headers}).then((res) => {
                return res.json();
            }, (err) => {
                return err;
            }).then(data => {
                if (data.code === '0') {
                    context.commit('SOURCE_CONFIGURE_AREA', data.content);
                    return data.code;
                }
            });
        },
        [SOURCE_CONFIGURE_AREA_ADD](context, payload) {
            return Vue.http.post(API['sources-configure-areas'], payload.body, {headers: payload.headers}).then((res) => {
                return res.json();
            }, (err) => {
                return err;
            }).then(data => {
                if (data.code === '0') {
                    return data.code;
                }
            });
        },
        [SOURCE_CONFIGURE_AREA_DELTET](context, payload) {
            return Vue.http.delete(API['sources-configure-areas'], {params: payload.params, headers: payload.headers}).then((res) => {
                return res.json();
            }, (err) => {
                return err;
            }).then(data => {
                if (data.code === '0') {
                    return data.code;
                }
            });
        },
    }
}