import Vue from 'vue';
import VueResource from 'vue-resource';

Vue.use(VueResource);

import {getKeyValue, clearLoginCache} from '@/kit/common';
import { MessageBox, Message } from 'element-ui';

export default Vue.http.interceptors.push(function(req, next) {
    if (req.headers.has('Authorization')) {
        if (req.url === '/oauth/token') {
            /** 登陆接口不重置 Authorization **/
        } else {
            req.headers.set('Authorization', getKeyValue('accesstoken'));
        }
    }

    /** 请求方式 **/
    let method = req.method;

    next(function(res) {

        let code = res && res.data && (res.data.code || res.data.code === '0') ? res.data.code : null;
        let message = res && res.data && res.data.error && res.data.error.message ? res.data.error.message : '请求失败~';

        /** 410001: 资源不可访问 **/
        if (code === '410001' || code === '400001' || code === '400002' || code === '400003' || code === '400004' || code === '400005' || code === '400006' || code === 'access_denied') {
            
            MessageBox.alert("登陆失效，请重新登陆", '提示', {
                showClose: false,
                confirmButtonText: '确定',
                type: 'warning'
            }).then(() => {
                // 清空 localStorage
                clearLoginCache();
                
                // 刷新当前页面
                window.location = window.location;
            });
        }
        /** 登陆 | 修改密码接口 处理 **/
        if (req.url === '/auth/token' || req.url === '/auth/password') {

            if (res.status === 200) {
                /** 登陆成功 **/
            } else {
                let accountMessage =  res && res.data && res.data.message ? res.data.message : '请检查您的网络~';
                Message({
                    message: accountMessage,
                    showClose: false,
                    type: 'error'
                });
            }
        }

        /** post 请求错误信息提示, 排除登陆接口 **/
        if (method === 'POST' && code !== '0' && (req.url !== '/auth/token' && req.url !== '/auth/password')) {
            Message({
                message: message,
                showClose: false,
                type: 'error'
            });
        }

        /** delete 请求错误信息提示 **/
        if (method === 'DELETE' && code !== '0') {
            Message({
                message: message,
                showClose: false,
                type: 'error'
            });
        }

        if (method === 'PUT' && code !== '0') {
            Message({
                message: message,
                showClose: false,
                type: 'error'
            });
        }

        /** get 请求错误信息提示 **/
        if (method === 'GET' && req.url === '/api/agent-tasks/customers-claiming' && code !== '0') {
            Message({
                message: message,
                showClose: false,
                type: 'error'
            });
        }
    });
});