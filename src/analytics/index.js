import Vue from 'vue';
import VueResource from 'vue-resource';

Vue.use(VueResource);


import {getKeyValue, getTimestamp} from '@/kit/common.js';

const base = (url, params={}) => {
	return Vue.http.get(url, {
		params: {
			domain: 'xzj-crm',
        	channel: 'web',
        	source: 'crm',
        	u: getKeyValue('userId') ? getKeyValue('userId') : '',
        	t: getTimestamp(),
			...params
		}
	});
}

const analytics = {};

analytics.track = (params) => {
	return base('/tick', params);
}

export default analytics;