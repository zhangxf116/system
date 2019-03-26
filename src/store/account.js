import {LOGIN, LOGIN_QR, LOGOUT, CHANGE_PASSWORD} from './type';
import Vue from 'vue';
import {API} from './api.js';

import { Message } from 'element-ui';

import { clearLoginCache } from '@/kit/common';

export default {
    state: {},
    mutations: {},
    actions: {
        [LOGIN](context, payload) {
            return Vue.http.post(API.login, payload.body, {headers: payload.headers, emulateJSON: true}).then((res) => {
                return res.json();
            }, (err) => {
                return err.ok;
            }).then(data => {
                if(data) {
                    let accesstoken = 'Bearer' + ' ' + data.accessToken;
                    let userId = data && data.userId ? data.userId : '--'; 
                    let username = data && data.username ? data.username : '--';
                    let permissions = data && data.permissions ? data.permissions : [];
                    let roles = data && data.roles ? data.roles : [];

                    let hasPermission = permissions.indexOf('AGENT_SYSTEM') > -1 || permissions.indexOf('KF_SYSTEM') > -1;
                    let hasRole = roles.indexOf('AGENT_ASSISTANT') > -1 || roles.indexOf('AGENT_ASSISTANT_MANAGER') > -1 || roles.indexOf('AGENT_MANAGER') > -1 || roles.indexOf('AGENT_SUPER_MANAGER') > -1 || roles.indexOf('KF_MANAGER') > -1 || roles.indexOf('KF_SEAT') > -1 || roles.indexOf('AGENT_YY_OPERATOR') > -1;

                    /** 有该系统权限且有小职姐权限则不能登录，仅提示 **/
                    if(hasPermission && roles.indexOf('AGENT_MEMBER') > -1) {
                        Message({
                            message: '请使用二维码登陆',
                            showClose: false,
                            type: 'error'
                        });
                    }
                    if (hasPermission && hasRole) {
                        
                        localStorage.setItem('accesstoken', JSON.stringify(accesstoken));
                        localStorage.setItem('userId', JSON.stringify(userId));
                        localStorage.setItem('username', JSON.stringify(username));
                        localStorage.setItem('permissions', JSON.stringify(permissions));
                        localStorage.setItem('roles', JSON.stringify(roles));

                        localStorage.setItem('crm-source', 'xiaozhijie-pc');

                        return　'Success';

                    } else {

                        Message({
                            message: '抱歉，您没有该系统的权限',
                            showClose: false,
                            type: 'error'
                        });

                    }
                }
            });
        },
        [LOGIN_QR](context, payload) {
            return Vue.http.get(API['login-qr'], {params: payload.params}).then((res) => {
                return res.json();
            }, (err) => {
                return err.ok;
            }).then(data => {
                if(data.code === '0' && data.content) {
                    let accesstoken = 'Bearer' + ' ' + data.content.accessToken;
                    let userId = data.content && data.content.userId ? data.content.userId : '--'; 
                    let username = data.content && data.content.username ? data.content.username : '--';
                    let permissions = data.content && data.content.permissions ? data.content.permissions : [];
                    let roles = data.content && data.content.roles ? data.content.roles : [];

                    let hasPermission = permissions.indexOf('AGENT_SYSTEM') > -1;
                    let hasRole = roles.indexOf('AGENT_MEMBER') > -1;

                    if (hasPermission && hasRole) {

                        localStorage.setItem('accesstoken', JSON.stringify(accesstoken));
                        localStorage.setItem('userId', JSON.stringify(userId));
                        localStorage.setItem('username', JSON.stringify(username));
                        localStorage.setItem('permissions', JSON.stringify(permissions));
                        localStorage.setItem('roles', JSON.stringify(roles));

                        localStorage.setItem('crm-source', 'xiaozhijie-pc');

                        return　'Success';

                    } else {

                        Message({
                            message: '抱歉，您不能使用二维码登陆',
                            showClose: false,
                            type: 'error'
                        });

                    }
                }
            });
        },
        [LOGOUT]() {
            clearLoginCache();
        },
        [CHANGE_PASSWORD](context, payload) {
            return Vue.http.post(API.password, payload.body, {headers: payload.headers, emulateJSON: true}).then((res) => {
                return res.ok;
            }, (err) => {
                return err.ok;
            }).then(data => {                
                if(data) {
                    return data;
                }
            });
        }
    }
}