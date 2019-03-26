import {SUMMARY_AGENT, SUMMARY_AGENT_EXPORT, SUMMARY_DASHBOARD, SUMMARY_NEW_SIGN_UP,
    SUMMARY_BOARD_DETAIL, SUMMARY_ASSIGNMENTS, CONTACT_RATE, SUMMARY_RESERVATION,
    SUMMARY_WORK_TRACK, AGENT_CONVERSION_INDEX, SUMMARY_WORK_TRACK_EXPORT,
    SUMMARY_SIGN_IN_PROGRESS, SUMMARY_SIGN_IN_PROGRESS_MONTH, SUMMARY_WX_INDEX,
    SUMMARY_LEADER_BOARD,SUMMARY_LEADER_BOARD_SIGN,SUMMARY_LEADER_BOARD_INVITE,
    SUMMARY_SIGN_IN_TREND} from './type';

import Vue from 'vue';
import {API} from './api.js';

export default {
    state: {
        dataReport: {
            pageNo: 1,
            pageSize: 50,
            totalCount: 0,

            items: []
        },
        dashboard: {
            allUserCount: 0,

            reserveUserCount: 0,
            newSignUpUserCount: 0,
            onboardingUserCount: 0,
            signInUserCount: 0,
            validOnboardingUserCount: 0,

            onboardingLeaderboard: [],
            signInLeaderboard: []
        },
        newSignUpReport: {
            pageNo: 1,
            pageSize: 50,
            totalCount: 0,

            items: []
        },
        boardDetail: {
            pageNo: 1,
            pageSize: 50,
            totalCount: 0,

            items: []
        },
        assignments: {
            pageNo: 1,
            pageSize: 50,
            totalCount: 0,

            items: []
        },
        contactRate: {
            pageNo: 1,
            pageSize: 50,
            totalCount: 0,

            items: []
        },
        reservation: {
            pageNo: 1,
            pageSize: 20,
            totalCount: 0,

            items: []
        },
        workTrack: {
            pageNo: 1,
            pageSize: 20,
            totalCount: 0,

            items: []
        },
        conversion: {
            pageNo: 1,
            pageSize: 20,
            totalCount: 0,

            items: []
        },
        leaderBoard: {},
        leaderBoardSign: {},
        leaderBoardInvite: {},
    },
    mutations: {
        [SUMMARY_AGENT](state, data) {
            state.dataReport.pageNo = data ? data.pageNo : 1;
            state.dataReport.pageSize = data ? data.pageSize : 50;
            state.dataReport.totalCount = data ? data.totalCount : 0;

            state.dataReport.items = data && data.items ? data.items : [];
        },
        [SUMMARY_LEADER_BOARD](state, data) {
            state.leaderBoard = data;
        },
        [SUMMARY_LEADER_BOARD_SIGN](state, data) {
            state.leaderBoardSign = data;
        },
        [SUMMARY_LEADER_BOARD_INVITE](state, data) {
            state.leaderBoardInvite = data;
        },
        [SUMMARY_DASHBOARD](state, data) {
            state.dashboard.allUserCount = data ? data.allUserCount : 0;

            state.dashboard.reserveUserCount = data && data.reserveUserCount ? data.reserveUserCount : 0;
            state.dashboard.newSignUpUserCount = data ? data.newSignUpUserCount : 0;
            state.dashboard.onboardingUserCount = data ? data.onboardingUserCount : 0;
            state.dashboard.signInUserCount = data ? data.signInUserCount : 0;
            state.dashboard.validOnboardingUserCount = data ? data.validOnboardingUserCount : 0;

            state.dashboard.onboardingLeaderboard = data ? data.onboardingLeaderboard : [];
            state.dashboard.signInLeaderboard = data ? data.signInLeaderboard : [];
        },
        [SUMMARY_NEW_SIGN_UP](state, data) {
            state.newSignUpReport.pageNo = data ? data.pageNo : 1;
            state.newSignUpReport.pageSize = data ? data.pageSize : 50;
            state.newSignUpReport.totalCount = data ? data.totalCount : 0;

            state.newSignUpReport.items = data && data.items ? data.items : [];
        },
        [SUMMARY_BOARD_DETAIL](state, data) {
            state.boardDetail.pageNo = data ? data.pageNo : 1;
            state.boardDetail.pageSize = data ? data.pageSize : 50;
            state.boardDetail.totalCount = data ? data.totalCount : 0;

            state.boardDetail.items = data && data.items ? data.items : [];
        },
        [SUMMARY_ASSIGNMENTS](state, data) {
            state.assignments.pageNo = data ? data.pageNo : 1;
            state.assignments.pageSize = data ? data.pageSize : 50;
            state.assignments.totalCount = data ? data.totalCount : 0;

            state.assignments.items = data && data.items ? data.items : [];
        },
        [CONTACT_RATE](state, data) {
            state.contactRate.pageNo = data ? data.pageNo : 1;
            state.contactRate.pageSize = data ? data.pageSize : 50;
            state.contactRate.totalCount = data ? data.totalCount : 0;

            state.contactRate.items = data && data.items ? data.items : [];
        },
        [SUMMARY_RESERVATION](state, data) {
            state.reservation.pageNo = data ? data.pageNo : 1;
            state.reservation.pageSize = data ? data.pageSize : 20;
            state.reservation.totalCount = data ? data.totalCount : 0;

            state.reservation.items = data && data.items ? data.items : [];
        },
        [SUMMARY_WORK_TRACK](state, data) {
            state.workTrack.pageNo = data ? data.pageNo : 1;
            state.workTrack.pageSize = data ? data.pageSize : 20;
            state.workTrack.totalCount = data ? data.totalCount : 0;

            state.workTrack.items = data && data.items ? data.items : [];
        },
        [AGENT_CONVERSION_INDEX](state, data) {
            state.conversion.pageNo = data ? data.pageNo : 1;
            state.conversion.pageSize = data ? data.pageSize : 20;
            state.conversion.totalCount = data ? data.totalCount : 0;

            state.conversion.items = data && data.items ? data.items : [];
        },
    },
    actions: {
        [SUMMARY_AGENT](context, payload) {
            return Vue.http.get(API['summary-agent'], {params: payload.params, headers: payload.headers}).then((res) => {
                return res.json();
            }, (err) => {
                return err.data;
            }).then(data => {                
                if(data.code === '0') {
                    context.commit('SUMMARY_AGENT', data.content);
                    return data.code;
                }
            });
        },
        [SUMMARY_AGENT_EXPORT](context, payload) {
            return Vue.http.get(API['summary-agent'], {params: payload.params, responseType: 'blob', headers: payload.headers}).then((res) => {
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
        [SUMMARY_DASHBOARD](context, payload) {
            return Vue.http.get(API['summary-dashboard'], {params: payload.params, headers: payload.headers}).then((res) => {
                return res.json();
            }, (err) => {
                return err.data;
            }).then(data => {                
                if(data.code === '0') {
                    context.commit('SUMMARY_DASHBOARD', data.content);
                    return data.code;
                }
            });
        },
        [SUMMARY_NEW_SIGN_UP](context, payload) {
            return Vue.http.get(API['summary-new-sign-up'], {params: payload.params, headers: payload.headers}).then((res) => {
                return res.json();
            }, (err) => {
                return err.data;
            }).then(data => {                
                if(data.code === '0') {
                    context.commit('SUMMARY_NEW_SIGN_UP', data.content);
                    return data.code;
                }
            });
        },
        [SUMMARY_BOARD_DETAIL](context, payload) {
            return Vue.http.get(API['summary-board-detail'], {params: payload.params, headers: payload.headers}).then((res) => {
                return res.json();
            }, (err) => {
                return err.data;
            }).then(data => {                
                if(data.code === '0') {
                    context.commit('SUMMARY_BOARD_DETAIL', data.content);
                    return data.code;
                }
            });
        },
        [SUMMARY_ASSIGNMENTS](context, payload) {
            return Vue.http.get(API['summary-assignments'], {params: payload.params, headers: payload.headers}).then((res) => {
                return res.json();
            }, (err) => {
                return err.data;
            }).then(data => {                
                if(data.code === '0') {
                    context.commit('SUMMARY_ASSIGNMENTS', data.content);
                    return data.code;
                }
            });
        },
        [CONTACT_RATE](context, payload) {
            return Vue.http.get(API['contact-rate'], {params: payload.params, headers: payload.headers}).then((res) => {
                return res.json();
            }, (err) => {
                return err.data;
            }).then(data => {                
                if(data.code === '0') {
                    context.commit('CONTACT_RATE', data.content);
                    return data.code;
                }
            });
        },
        [SUMMARY_RESERVATION](context, payload) {
            return Vue.http.get(API['summary-reservation'], {params: payload.params, headers: payload.headers}).then((res) => {
                return res.json();
            }, (err) => {
                return err.data;
            }).then(data => {                
                if(data.code === '0') {
                    context.commit('SUMMARY_RESERVATION', data.content);
                    return data.code;
                }
            });
        },
        [SUMMARY_WORK_TRACK](context, payload) {
            return Vue.http.get(API['summary-work-tracking'], {params: payload.params, headers: payload.headers}).then((res) => {
                return res.json();
            }, (err) => {
                return err.data;
            }).then(data => {                
                if(data.code === '0') {
                    context.commit('SUMMARY_WORK_TRACK', data.content);
                    return data.code;
                }
            });
        },
        [SUMMARY_WORK_TRACK_EXPORT](context, payload) {
            return Vue.http.get(API['summary-work-tracking'], {params: payload.params, responseType: 'blob', headers: payload.headers}).then((res) => {
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
        [AGENT_CONVERSION_INDEX](context, payload) {
            return Vue.http.get(API['agent-conversion-index'], {params: payload.params, headers: payload.headers}).then((res) => {
                return res.json();
            }, (err) => {
                return err.data;
            }).then(data => {
                if(data.code === '0') {
                    context.commit('AGENT_CONVERSION_INDEX', data.content);
                    return data.code;
                }
            });
        },
        [SUMMARY_SIGN_IN_PROGRESS](context, payload) {
            return Vue.http.get(API['summary-sign-in-progress'], {params: payload.params, headers: payload.headers}).then((res) => {
                return res.json();
            }, (err) => {
                return err.data;
            }).then(data => {
                if(data.code === '0') {
                    return data;
                }
            });
        },
        [SUMMARY_SIGN_IN_PROGRESS_MONTH](context, payload) {
            return Vue.http.get(API['summary-sign-in-progress'], {params: payload.params, headers: payload.headers}).then((res) => {
                return res.json();
            }, (err) => {
                return err.data;
            }).then(data => {
                if(data.code === '0') {
                    return data;
                }
            });
        },
        [SUMMARY_WX_INDEX](context, payload) {
            return Vue.http.get(API['summary-wx-index'], {params: payload.params, headers: payload.headers}).then((res) => {
                return res.json();
            }, (err) => {
                return err.data;
            }).then(data => {
                if(data.code === '0') {
                    return data.content;
                }
            });
        },
        [SUMMARY_SIGN_IN_TREND](context, payload) {
            return Vue.http.get(API['summary-sign-in-trend'], {params: payload.params, headers: payload.headers}).then((res) => {
                return res.json();
            }, (err) => {
                return err.data;
            }).then(data => {
                if(data.code === '0') {
                    return data.content;
                }
            });
        },
        [SUMMARY_LEADER_BOARD](context, payload) {
            return Vue.http.get(API['summary-leader-board'], {params: payload.params, headers: payload.headers}).then((res) => {
                return res.json();
            }, (err) => {
                return err.data;
            }).then(data => {
                if(data.code === '0') {
                    context.commit('SUMMARY_LEADER_BOARD', data.content);
                    return data;
                }
            });
        },
        [SUMMARY_LEADER_BOARD_SIGN](context, payload) {
            return Vue.http.get(API['summary-leader-board'], {params: payload.params, headers: payload.headers}).then((res) => {
                return res.json();
            }, (err) => {
                return err.data;
            }).then(data => {
                if(data.code === '0') {
                    context.commit('SUMMARY_LEADER_BOARD_SIGN', data.content);
                    return data;
                }
            });
        },
        [SUMMARY_LEADER_BOARD_INVITE](context, payload) {
            return Vue.http.get(API['summary-leader-board'], {params: payload.params, headers: payload.headers}).then((res) => {
                return res.json();
            }, (err) => {
                return err.data;
            }).then(data => {
                if(data.code === '0') {
                    context.commit('SUMMARY_LEADER_BOARD_INVITE', data.content);
                    return data;
                }
            });
        },

    }
}