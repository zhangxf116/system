import { AGENT_REWARD, AGENT_REWARD_EXPORT, AGENT_REWARD_SUMMARY } from './type';

import Vue from 'vue';
import {API} from './api.js';

export default {
    state: {
       reward: {
            pageNo: 1,
            pageSize: 50,
            totalCount: 0,
            items: []
       },
       summary: {
            yesterdayOnboardingReward: 0,
            yesterdayWorkingReward: 0,
            yesterdayInviteReward: 0,
            monthlyOnboardingReward: 0,
            monthlyReward: 0,
            monthlyWorkingReward: 0,
            monthlyInviteReward: 0,
            yesterdayReward: 0
       }
    },
    mutations: {
        [AGENT_REWARD](state, data) {
            state.reward.pageNo = data ? data.pageNo : 1;
            state.reward.pageSize = data ? data.pageSize : 50;
            state.reward.totalCount = data ? data.totalCount : 0;

            state.reward.items = data && data.items ? data.items : [];
        },
        [AGENT_REWARD_SUMMARY](state, data) {
            state.summary.yesterdayOnboardingReward = data.yesterdayOnboardingReward ? data.yesterdayOnboardingReward : 0;
            state.summary.yesterdayWorkingReward = data.yesterdayWorkingReward ? data.yesterdayWorkingReward : 0;
            state.summary.yesterdayInviteReward = data.yesterdayInviteReward ? data.yesterdayInviteReward : 0;
            state.summary.monthlyOnboardingReward = data.monthlyOnboardingReward ? data.monthlyOnboardingReward : 0;
            state.summary.monthlyReward = data.monthlyReward ? data.monthlyReward : 0;
            state.summary.monthlyWorkingReward = data.monthlyWorkingReward ? data.monthlyWorkingReward : 0;
            state.summary.monthlyInviteReward = data.monthlyInviteReward ? data.monthlyInviteReward : 0;
            state.summary.yesterdayReward = data.yesterdayReward ? data.yesterdayReward : 0;
        }
    },
    actions: {
        [AGENT_REWARD](context, payload) {
            return Vue.http.get(API['agent-reward'], {params: payload.params, headers: payload.headers}).then((res) => {
                return res.json();
            }, (err) => {
                return err.data;
            }).then(data => {                
                if(data.code === '0') {
                    context.commit('AGENT_REWARD', data.content);
                    return data.code;
                }
            });
        },
        [AGENT_REWARD_EXPORT](context, payload) {
            return Vue.http.get(API['agent-reward'], {params: payload.params, responseType: 'blob', headers: payload.headers}).then((res) => {
                let headers = res.headers.map;

                let contentDisposition = headers['Content-Disposition'] ? headers['Content-Disposition'] : headers['content-disposition'];
                let filename = JSON.parse((contentDisposition[0] || '').split('filename=')[1]);

                let blob = res.body;
                let link = document.createElement('a');
                    link.href = window.URL.createObjectURL(blob);

                    link.download = filename;
                    link.click();
                
                return res.ok;
            }, (err) => {
                return err.data;
            }).then(data => {                
                if(data.code === '0') {
                    return data.code;
                }
            });
        },
        [AGENT_REWARD_SUMMARY](context, payload) {
            return Vue.http.get(API['agent-reward-summary'], {headers: payload.headers}).then((res) => {
                return res.json();
            }, (err) => {
                return err.data;
            }).then(data => {                
                if(data.code === '0') {
                    context.commit('AGENT_REWARD_SUMMARY', data.content);
                    return data.code;
                }
            });
        },
    }
}