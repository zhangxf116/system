import {AGENT_PROFILE_HEADER, AGENT_PROFILE, AGENT_ID_INFO, EDIT_AGENT_PROFILE, AGENT_PROFILE_ADD_ROLES, AGENT_PROFILE_ROLES} from './type';

import Vue from 'vue';
import {API} from './api.js';

export default {
    state: {
        info: {
            addStarCardNo:'--',
            age: 0,
            birthday: 0,
            formattedBirthday: '',
            agentId: '--',
            constellation: '--',
            jiguan: '--',
            name: '',
            nick: '',
            phone: '--',
            sex: '',
            wechat: '--',
            regions: [],
            headImages: [],
            wxQrCodeUrl: ''
        },
        infoHead: {
            addStarCardNo:'--',
            age: 0,
            birthday: 0,
            formattedBirthday: '',
            agentId: '--',
            constellation: '--',
            jiguan: '--',
            name: '',
            nick: '',
            phone: '--',
            sex: '',
            wechat: '--',
            regions: [],
            headImages: [],
        },
        agentRoles: []
    },
    mutations: {
        [AGENT_PROFILE](state, data) {
            state.info.addStarCardNo = data && data.addStarCardNo ? data.addStarCardNo : '--';
            state.info.age = data ? data.age : 0;
            state.info.birthday = data ? data.birthday : 0;
            state.info.formattedBirthday = data ? data.formattedBirthday : '';
            state.info.agentId = data && data.agentId ? data.agentId : '--';
            state.info.constellation = data && data.constellation ? data.constellation : '--';
            state.info.jiguan = data && data.jiguan ? data.jiguan : '--';
            state.info.name = data && data.name ? data.name : '';
            state.info.nick = data && data.nick ? data.nick : '';
            state.info.phone = data && data.phone ? data.phone : '--';
            state.info.sex = data ? data.sex : '';
            state.info.wechat = data && data.wechat ? data.wechat : '--';

            state.info.regions = data && data.regions ? data.regions : [];
            state.info.headImages = data && data.headImages ? data.headImages : [];
            state.info.wxQrCodeUrl = data && data.wxQrCodeUrl ? data.wxQrCodeUrl : '';

        },
        [AGENT_PROFILE_HEADER](state, data) {
            state.infoHead.addStarCardNo = data && data.addStarCardNo ? data.addStarCardNo : '--';
            state.infoHead.age = data ? data.age : 0;
            state.infoHead.birthday = data ? data.birthday : 0;
            state.infoHead.formattedBirthday = data ? data.formattedBirthday : '';
            state.infoHead.agentId = data && data.agentId ? data.agentId : '--';
            state.infoHead.constellation = data && data.constellation ? data.constellation : '--';
            state.infoHead.jiguan = data && data.jiguan ? data.jiguan : '--';
            state.infoHead.name = data && data.name ? data.name : '';
            state.infoHead.nick = data && data.nick ? data.nick : '';
            state.infoHead.phone = data && data.phone ? data.phone : '--';
            state.infoHead.sex = data ? data.sex : '';
            state.infoHead.wechat = data && data.wechat ? data.wechat : '--';

            state.infoHead.regions = data && data.regions ? data.regions : [];
            state.infoHead.headImages = data && data.headImages ? data.headImages : [];

        },
        [AGENT_ID_INFO](state, data) {
            state.info.age = data ? data.age : 0;
            state.info.constellation = data && data.constellation ? data.constellation : '--';
            state.info.jiguan = data && data.jiguan ? data.jiguan : '--';
            state.info.sex = data ? data.sex : 0;
        },
        [AGENT_PROFILE_ROLES](state, data) {
            state.agentRoles = data ? data : [];
        }
    },
    actions: {
        [AGENT_PROFILE_ADD_ROLES](context, payload) {
            return Vue.http.post(API['agent-profile'], payload.body, {headers: payload.headers}).then((res) => {
                return res.json();
            }, (err) => {
                return err.data;
            }).then(data => {                
                if(data.code === '0') {
                    return data.code;
                }
            });
        },
        [AGENT_PROFILE_ROLES](context, payload) {
            return Vue.http.get(API['agent-profile-roles'], {headers: payload.headers}).then((res) => {
                return res.json();
            }, (err) => {
                return err.data;
            }).then(data => {
                if(data.code === '0') {
                    context.commit('AGENT_PROFILE_ROLES', data.content);
                    return data.code;
                }
            });
        },
        [AGENT_PROFILE](context, payload) {
            return Vue.http.get(API['agent-profile'], {params: payload, headers: {Authorization: 'Basic d2ViLWFwcDo='}}).then((res) => {
                return res.json();
            }, (err) => {
                return err.data;
            }).then(data => {
                if(data.code === '0') {
                    context.commit('AGENT_PROFILE', data.content);
                    return data.content;
                }
            });
        },
        [AGENT_PROFILE_HEADER](context, payload) {
            return Vue.http.get(API['agent-profile'], {headers: {Authorization: 'Basic d2ViLWFwcDo='}}).then((res) => {
                return res.json();
            }, (err) => {
                return err.data;
            }).then(data => {                
                if(data.code === '0') {
                    context.commit('AGENT_PROFILE_HEADER', data.content);
                    return data.content;
                }
            });
        },
        [AGENT_ID_INFO](context, payload) {
            return Vue.http.get(API['agent-id-info'], {params: payload.params, headers: payload.headers}).then((res) => {
                return res.json();
            }, (err) => {
                return err.data;
            }).then(data => {                
                if(data.code === '0') {
                    context.commit('AGENT_ID_INFO', data.content);
                    return data.code;
                }
            });
        },
        [EDIT_AGENT_PROFILE](context, payload) {
            return Vue.http.put(API['agent-profile'], payload, {headers: {Authorization: 'Basic d2ViLWFwcDo='}}).then((res) => {
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