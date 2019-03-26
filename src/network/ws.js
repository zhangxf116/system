import {API} from '@/store/api.js';
import {getKeyValue, getZeroTime, getEndTime, uuid, clearLoginCache} from '@/kit/common';
import {taskCategory} from '@/kit/data.js';

import { MessageBox } from 'element-ui';

/** websocket 全局连接 **/
global.clinet = {
	userId: '',
	ws: null
};
global.wsTaskType = [];
global.wsTask = {
	pageNo: 1,
	pageSize: 10,
	totalCount: 0,
	list: []
};
global.wsTaskDetail = {
	pageNo: 1,
	pageSize: 10,
	totalCount: 0,
	list: []
};

global.clinetInit = () => {

	clinet.ws = new WebSocket(API['ws']);

	clinet.ws.onopen = (e) => {
		/** 连通之后先做登陆事件 **/
		let body = {
			id: uuid(),
			path: '/authorize',
			arguments: getKeyValue('accesstoken')
		};
		clinet.ws.send(JSON.stringify(body));
	};

	clinet.ws.onmessage = (event) => {
		let data = JSON.parse(event.data);
		let path = data.path;
		let result = data.result;
		let code = result.code;

		/** path=/authorize, 登陆返回数据 **/
		if (path === "/authorize") {
			/**  登陆成功： **/
			if (result && code) {
				/**请求任务列表 和 任务类型 **/
				let taskBody = {
					id: uuid(),
					path: '/agent-tasks-with-types',
					arguments: {
						taskTypeId: '14',
						taskCategory: taskCategory.pending,
						from: getZeroTime(),
						to: getEndTime(),
						pageNo: 1,
						pageSize: 20
					}
				};
				clinet.ws.send(JSON.stringify(taskBody));

				/** 客户详情任务 **/
				if (clinet.userId) {
					let taskDetailBody = {
						id: uuid(),
						path: '/agent-tasks',
						arguments: {
							userId: clinet.userId,
							taskCategory: taskCategory.pending,
							pageNo: 1,
							pageSize: 10
						}
					};
					clinet.ws.send(JSON.stringify(taskDetailBody));
				}
			}
		}

		/** path=/agent-tasks-with-types, 任务类型和任务列表 **/
		if (path === "/agent-tasks-with-types") {
			if (result && result.content && result.content.taskTypes) {
				wsTaskType.splice(0, wsTaskType.length);
				for(let i in result.content.taskTypes) {
					wsTaskType.push(result.content.taskTypes[i]);
				}
			}
			if (result && result.content && result.content.tasks) {
				wsTask.pageNo = result.content.tasks.pageNo;
	            wsTask.pageSize = result.content.tasks.pageSize;
	            wsTask.totalCount = result.content.tasks.totalCount;
	            wsTask.items = result.content.tasks.items ? result.content.tasks.items : [];
			}
		}

		/** path=/agent-tasks, 任务列表 **/
		if (path === "/agent-tasks") {
			if (result && result.content) {
				wsTaskDetail.pageNo = result.content.pageNo;
	            wsTaskDetail.pageSize = result.content.pageSize;
	            wsTaskDetail.totalCount = result.content.totalCount;
	            wsTaskDetail.items = result.content.items ? result.content.items : [];
			}
		}

		/** 登陆过期 **/
		if (code === '410001' || code === '400001' || code === '400002' || code === '400003' || code === '400004' || code === '400005' || code === '400006' || code === 'access_denied' || code === 'invalid_token') {
            
            // 清空 localStorage
            clearLoginCache();
            
            MessageBox.alert("登陆失效，请重新登陆", '提示', {
                showClose: false,
                confirmButtonText: '确定',
                type: 'warning'
            }).then(() => {
                // 刷新当前页面
                window.location = window.location;
            });

            return;
        }
	};

	clinet.ws.onclose = (e) => {
		if (getKeyValue('accesstoken')) {
			setTimeout(() => {
				clinetInit();
			}, 1000);
		}
	};

	clinet.ws.onerror = (e) => {};
}