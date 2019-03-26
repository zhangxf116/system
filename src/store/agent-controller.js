import {
    AGENT_LIST,
    AGENT_SCHEDULING_LIST,
    AGENT_ACCOUNT,
    AGENT_ENABLE,
    AGENT_TEAM,
    AGENT_SUPERVISOR,
    AGENT_TEAM_ADD,
    AGENT_TEAM_CHANGE,
    AGENT_TEAM_EDIT,
    AGENT_TEAM_DELETE,
    AGENT_TEAM_XZJ_LIST,
    AGENT_SYNCHRONIZATION,
    AGENT_SUPERVISOR_CANDIDATES
} from './type';

import Vue from 'vue';
import {API} from './api.js';

export default {
    state: {
        list: [],
        schedulingList: [],
        account: {
            pageNo: 1,
            pageSize: 50,
            totalCount: 0,
            
            items: [],
        },
        teamConfig: {
            pageNo: 1,
            pageSize: 50,
            totalCount: 0,
            
            items: [],
        },
        supervisorList: [],
        agentsGroupingList: []
    },
    mutations: {
        [AGENT_LIST](state, data) {
            state.list = data ? data : [];
        },
        [AGENT_SCHEDULING_LIST](state, data) {
            state.schedulingList = data ? data : [];
        },
        [AGENT_ACCOUNT](state, data) {
            state.account.pageNo = data ? data.pageNo : 1;
            state.account.pageSize = data ? data.pageSize : 50;
            state.account.totalCount = data ? data.totalCount : 0;
            state.account.items = data && data.items ? data.items : [];
        },
        // 组员配置
        [AGENT_TEAM](state, data) {
            state.teamConfig.pageNo = data ? data.pageNo : 1;
            state.teamConfig.pageSize = data ? data.pageSize : 50;
            state.teamConfig.totalCount = data ? data.totalCount : 0;
            state.teamConfig.items = data && data.items ? data.items : [];
        },
        [AGENT_SUPERVISOR](state, data) {
            state.supervisorList = data ? data : []
        },
        [AGENT_TEAM_XZJ_LIST](state, data) {
            state.agentsGroupingList = data ? data : []
        },
    },
    actions: {
        [AGENT_LIST](context, payload) {
            return Vue.http.get(API.agents, {params: payload.params, headers: payload.headers}).then((res) => {
                return res.json();
            }, (err) => {
                return err.data;
            }).then(data => {                
                if(data.code === '0') {
                    context.commit('AGENT_LIST', data.content);
                    return data.code;
                }
            });
        },
        [AGENT_SCHEDULING_LIST](context, payload) {
            return Vue.http.get(API.agents, {params: payload.params, headers: payload.headers}).then((res) => {
                return res.json();
            }, (err) => {
                return err.data;
            }).then(data => {                
                if(data.code === '0') {
                    context.commit('AGENT_SCHEDULING_LIST', data.content);
                    return data.code;
                }
            });
        },
        [AGENT_ACCOUNT](context, payload) {
            return Vue.http.get(API['agents-account'], {params: payload.params, headers: payload.headers}).then((res) => {
                return res.json();
            }, (err) => {
                return err.data;
            }).then(data => {                
                if(data.code === '0') {
                    context.commit('AGENT_ACCOUNT', data.content);
                    return data.code;
                }
            });
        },
        [AGENT_ENABLE](context, payload) {
            return Vue.http.post(API['agents-enable'], payload.body, {headers: payload.headers}).then((res) => {
                return res.json();
            }, (err) => {
                return err.data;
            }).then(data => {                
                if(data.code === '0') {
                    return data.code;
                }
            });
        },
        // 组员配置
        [AGENT_TEAM](context, payload) {
            return Vue.http.get(API['agent-team'], {params: payload.params, headers: payload.headers}).then((res) => {
                return res.json();
            }, (err) => {
                return err.data;
            }).then(data => {
                if(data.code === '0') {
                    context.commit('AGENT_TEAM', data.content);
                    return data.code;
                }
            });
        },
        [AGENT_SUPERVISOR](context, payload) {
            return Vue.http.get(API['supervisor'], {params: payload.params, headers: payload.headers}).then((res) => {
                return res.json();
            }, (err) => {
                return err.data;
            }).then(data => {
                if(data.code === '0') {
                    context.commit('AGENT_SUPERVISOR', data.content);
                    return data;
                }
            });
        },
        [AGENT_SUPERVISOR_CANDIDATES](context, payload) {
            return Vue.http.get(API['supervisor-candidates'], {params: payload.params, headers: payload.headers}).then((res) => {
                return res.json();
            }, (err) => {
                return err.data;
            }).then(data => {
                if(data.code === '0') {
                    return data;
                }
            });
        },
        [AGENT_TEAM_ADD](context, payload) {
            return Vue.http.post(API['supervisor-action'], payload.body, {headers: payload.headers}).then((res) => {
                return res.json();
            }, (err) => {
                return err.data;
            }).then(data => {
                if(data.code === '0') {
                    return data;
                }
            });
        },
        [AGENT_TEAM_CHANGE](context, payload) {
            return Vue.http.put(API['supervisor-action'], payload.body, {headers: payload.headers}).then((res) => {
                return res.json();
            }, (err) => {
                return err.data;
            }).then(data => {
                if(data.code === '0') {
                    return data;
                }
            });
        },
        [AGENT_TEAM_XZJ_LIST](context, payload) {
            return Vue.http.get(API['agent-team-xzj-list'], {params: payload.params, headers: payload.headers}).then((res) => {
                return res.json();
            }, (err) => {
                return err.data;
            }).then(data => {
                if(data.code === '0') {
                    context.commit('AGENT_TEAM_XZJ_LIST', data.content);
                    return data;
                }
            });
        },
        [AGENT_TEAM_EDIT](context, payload) {
            return Vue.http.put(API['agent-team-edit'], payload.body, {headers: payload.headers}).then((res) => {
                return res.json();
            }, (err) => {
                return err.data;
            }).then(data => {
                if(data.code === '0') {
                    return data;
                }
            });
        },
        [AGENT_TEAM_DELETE](context, payload) {
            return Vue.http.delete(API['agent-team-delete'], {params: payload.params, headers: payload.headers}).then((res) => {
                return res.json();
            }, (err) => {
                return err.data;
            }).then(data => {
                if(data.code === '0') {
                    return data.code;
                }
            });
        },
        [AGENT_SYNCHRONIZATION](context, payload) {
            return Vue.http.post(API['agent-synchronization'], {}, {headers: {Authorization: 'Basic d2ViLWFwcDo='}}).then((res) => {
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