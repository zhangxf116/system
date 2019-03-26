import {ANGENT_ASSISTANT_LIST} from './type';

import Vue from 'vue';
import {API} from './api.js';

export default {
    state: {
        list: []
    },
    mutations: {
        [ANGENT_ASSISTANT_LIST](state, data) {
            state.list = data ? data : [];
        },
    },
    actions: {
        [ANGENT_ASSISTANT_LIST](context, payload) {
            return Vue.http.get(API['agent-assistant'], {params: payload.params, headers: payload.headers}).then((res) => {
                return res.json();
            }, (err) => {
                return err.data;
            }).then(data => {                
                if(data.code === '0') {
                    context.commit('ANGENT_ASSISTANT_LIST', data.content);
                    return data.code;
                }
            });
        }
    }
}