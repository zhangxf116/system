import {AGENT_TASK_LIST, AGENT_TASK_TYPE, AGENT_TASK_COMPLETE, AGENT_SIGN_UP_TASK, AGENT_TASK_CLAIM} from './type';

import Vue from 'vue';
import {API} from './api.js';

export default {
    state: {
        pageNo: 1,
        pageSize: 50,
        totalCount: 0,
        items: [],

        typeList: [],

        signUpTask: {
            taskId: '',
            taskTypeId: '',
            userId: '',
        }
    },
    mutations: {
        [AGENT_TASK_LIST](state, data) {
            state.pageNo = data ? data.pageNo : 1;
            state.pageSize = data ? data.pageSize : 50;
            state.totalCount = data ? data.totalCount : 0;
            state.items = data && data.items ? data.items : [];
        },
        [AGENT_TASK_TYPE](state, data) {
            state.typeList = data ? data : [];
        },
        [AGENT_SIGN_UP_TASK](state, data) {
            state.signUpTask.taskId = data && data.taskId ? data.taskId : '';
            state.signUpTask.taskTypeId = data && data.taskTypeId ? data.taskTypeId : '';
            state.signUpTask.userId = data && data.userId ? data.userId : '';
        },
    },
    actions: {
        [AGENT_TASK_LIST](context, payload) {
            return Vue.http.post(API['agent-tasks-list'], payload.body, {headers: payload.headers}).then((res) => {
                return res.json();
            }, (err) => {
                return err.data;
            }).then(data => {                
                if(data.code === '0') {
                    context.commit('AGENT_TASK_LIST', data.content);
                    return data.code;
                }
            });
        },
        [AGENT_TASK_TYPE](context, payload) {
            return Vue.http.get(API['agent-tasks-type'], {params: payload.params, headers: payload.headers}).then((res) => {
                return res.json();
            }, (err) => {
                return err.data;
            }).then(data => {                
                if(data.code === '0') {
                    context.commit('AGENT_TASK_TYPE', data.content);
                    return data.content;
                }
            });
        },
        [AGENT_TASK_COMPLETE](context, payload) {
            return Vue.http.post(API['agent-tasks-complete'], payload.body, {headers: payload.headers}).then((res) => {
                return res.json();
            }, (err) => {
                return err.data;
            }).then(data => {                
                if(data.code === '0') {
                    return data.code;
                }
            });
        },
        [AGENT_SIGN_UP_TASK](context, payload) {
            return Vue.http.get(API['sign-up-task'], {params: payload.params, headers: payload.headers}).then((res) => {
                return res.json();
            }, (err) => {
                return err.data;
            }).then(data => {                
                if(data.code === '0') {
                    context.commit('AGENT_SIGN_UP_TASK', data.content);
                    return data.code;
                }
            });
        },
        [AGENT_TASK_CLAIM](context, payload) {
            return Vue.http.get(API['task-claim'], {headers: payload.headers}).then((res) => {
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