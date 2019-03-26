import Vue from 'vue';
import router from './router/';
import store from './store/';

import network from './network';
import './network/ws';

import echarts from 'echarts';
Vue.prototype.$echarts = echarts;

import filter from './kit/filter';
Vue.use(filter);

import "./static/css/index.less";

import ElementUI from 'element-ui';
Vue.use(ElementUI);

import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard);

Vue.config.devtools = process.env.NODE_ENV === 'DEV';
Vue.config.productionTip = process.env.NODE_ENV === 'DEV';

/** 挂载 Vue 到 #app 元素 **/
new Vue({
    store,
    router
}).$mount('#app');