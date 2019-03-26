import Vue from 'vue';
import {UPLOAD_BASE64} from './type';
import {API} from './api';

export default {
    state: {
        list: []
    },
    mutations: {
        [UPLOAD_BASE64](state, data) {
            state.list = data ? data : [];
        }
    },
    actions: {
        [UPLOAD_BASE64](context, payload) {
            return Vue.http.post(API['upload-base64'], payload.body, { headers: payload.headers}).then((res) => {
                return res.json();
            }, (err) => {
                return err;
            }).then(data => {                
                if (data.code === '0') {
                    context.commit('UPLOAD_BASE64', data.content);
                    return data.code;
                }
            });
        }
    }
}