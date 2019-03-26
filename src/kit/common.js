let md5 = require('md5');

// 刷新浏览器
export function refresh() {
	window.location.reload();
}

// 判断是否为空
export function isEmpty(value) {
	if(value === null || value === undefined || value === NaN|| value === "undefined" || value === "" || value.length === 0 || value === false) {
		return true;
	}
	if (typeof value === "object") {
		for(let key in value) {
			return false;
		}
		return true;
	}
	return false;
}
// 存取删 localStorage 的 key 值
export function getKeyValue(key) {
	let keyValue = localStorage.getItem(key);
	let myValue = keyValue === null || keyValue === undefined || keyValue === "undefined" || keyValue === "" || keyValue.length < 2 ? false : JSON.parse(keyValue);
	return myValue;
}
export function setKeyValue(key, value) {
	let myKey = isEmpty(key) ? false : key;
	let myValue = isEmpty(value) ? false : value;
	
	if(myKey && myValue) {
		localStorage.setItem(myKey, JSON.stringify(myValue));
	}
}
export function deleteKeyValue(key) {

	let myValue = getKeyValue(key);

	if(myValue) {
		localStorage.removeItem(key);
	}
}

//获取当前时间
export function getTimestamp() {
    return parseInt(new Date().getTime()) + '';
};

// 获取当天零点时间
export function getZeroTime() {
	let currentDate = new Date();
		currentDate.setHours(0);
		currentDate.setMinutes(0);
		currentDate.setSeconds(0);
		currentDate.setMilliseconds(0);

	return currentDate.getTime();
}
// 获取当天11:59的时间
export function getEndTime() {
	return new Date(new Date(new Date().toLocaleDateString()).getTime()+24*60*60*1000-1).getTime();
}
// 获取一天的长度
export function getOneDayLong() {
	return 24*60*60*1000-1;
}

/** 获取当前日期前N天 **/
export function getBeforeDate(n) {
	let d = new Date();
    d.setDate(d.getDate()-n);
    return d;
}

/** 时间范围赋值 **/
export function getTime(obj, timeRange, from, to) {
	if (this[obj][timeRange] && this[obj][timeRange].length === 2) {
		this[obj][from] = this[obj][timeRange][0];
		this[obj][to] = this[obj][timeRange][1];
	} else {
		this[obj][from] = '';
		this[obj][to]  = '';
	}
}

// 获取 32 位随机字符
export function uuid() {

	let s = [];
	let hexDigits = "0123456789abcdef";

	for (let i = 0; i < 36; i++) {

		s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);

	}

	s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
	s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
	s[8] = s[13] = s[18] = s[23] = "-";

	let uuid = s.join("").replace("-","").replace("-","").replace("-","").replace("-","");
	
	return uuid;
	
}

//签名排序
export function raw(args) {
	let keys = Object.keys(args);

		keys = keys.sort();

	var newArgs = {};

	keys.forEach(function (key) {
		newArgs[key.toLowerCase()] = args[key];
	});

	let string = '';

	for (var k in newArgs) {
		string += '&' + k + '=' + newArgs[k];
	}

	string = string.substr(1);

	return string;
};

export function getSign(param) {

	if(!param){
		param = {};
	}

	let obj = Object.assign({}, param);

		obj['x-nonce'] = uuid();
		obj['x-timestamp'] = getTimestamp();
		obj['x-merchant-no'] = getKeyValue('x-merchant-no');
		obj['api_key'] = getKeyValue('x-api-key');
		
	let order = raw(obj);
		obj['x-sign'] = md5(order);
		
	let header = {};

	header['x-nonce'] = obj['x-nonce'];
	header['x-timestamp'] = obj['x-timestamp'];
	header['x-merchant-no'] = obj['x-merchant-no'];

	header['x-sign'] = obj['x-sign'];

	return header;
};

// 验证手机号
export function verifyPhone(phone) {

	if(isEmpty(phone)) { return true; }
	
	let reg = /^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/;
	let isPhone = reg.test(phone);

	return isPhone;
}

// 身份证号
export function isIdCard(id) {
	if(isEmpty(id)) { return false; }
	let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
	
	if(reg.test(id) === true) {
		return true;
	} else {
		return false;
	}
}

// 判断是否有该角色
export function hasRole(roleName) {
	let arr = getKeyValue('roles') ? getKeyValue('roles') : [];
	for(let i in arr) {
		if (arr[i] === roleName) {
			return true;
		}
	}
	return false;
}

// 清除登陆缓存
export function clearLoginCache() {
	let loginConfig = ['accesstoken', 'userId','username', 'permissions', 'roles', 'crm-source'];

	for(let i in loginConfig) {
		localStorage.removeItem(loginConfig[i]);
	}
}

/** 列表分页 **/
export function	handlePageChange($event, argumentsObject, argumentsName, functionName) {
	this[argumentsObject][argumentsName] = $event;
	this[functionName]();
}

/** 获取视频地址 **/
export function videoSource(url) {
	if (url.indexOf('youku') > 0) {
		return 'http://player.youku.com/embed/' + url.split('.html')[0].split('/id_').pop();
	}
	if (url.indexOf('qq') > 0) {
		return 'http://v.qq.com/iframe/player.html?vid=' + url.split('.html')[0].split('/').pop() + '&auto=0';
	}
}