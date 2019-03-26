import Layout from '@/layout/index';

/** 首页 **/
import Home from '@/page/home/index';

/** 任务管理 **/
import Task from '@/page/task/index';
import TaskHistory from '@/page/task/history';
import TaskAll from '@/page/task/list';

/** 客户管理 **/
import CustomerManage from '@/page/customer/index';
import CustomerDetail from '@/page/customer/detail';
import CustomerAssign from '@/page/customer/assign';
import CustomerNoteList from '@/page/customer/note-list';
import CustomerCore from '@/page/customer/core-user';
import CustomerReferral from '@/page/customer/referral';
import CustomerEvent from '@/page/customer/event';
import CustomerEventRecord from '@/page/customer/event-record';
import CustomerSpringReserve from '@/page/customer/spring-reserve';
import CustomerActive from '@/page/customer/active';
import CustomerSpringTrip from '@/page/customer/spring-trip';

/** 岗位详情 **/
import PositionRecommend from '@/page/position/recommend';
import PositionDetail from '@/page/position/detail';
import PositionList from '@/page/position/list';

/** 小职姐管理 **/
import Agent from '@/page/agent/index';
import AgentInfo from '@/page/agent/info';
import AgentEditInfo from '@/page/agent/edit-info';
import AgentSignIn from '@/page/agent/sign-in';
import AgentSingleSignIn from '@/page/agent/single-sign-in';
import Scheduling from '@/page/agent/scheduling';
import AgentAccount from '@/page/agent/account';
import SingleAssign from '@/page/agent/single-assign';
import AllAssign from '@/page/agent/all-assign';
import Wechat from '@/page/wechat/index';

/** 报表 **/
import Dashboard from '@/page/report/dashboard';
import SummaryAgent from '@/page/report/index';
import SummaryAssignments from '@/page/report/assignments';
import Contact from '@/page/report/contact';
import CustomerReserve from '@/page/report/reserve';
import WorkTrack from '@/page/report/work-track';
import Conversion from '@/page/report/conversion';

/** 打卡记录 、领周薪、日日返、小职姐提成 **/
import SalarySign from '@/page/fund/salary-sign';
import SalaryRelease from '@/page/fund/salary-release';
import DayRelease from '@/page/fund/day-release';
import Bonus from '@/page/fund/bonus';

/** 电话 **/
import CallRecord from '@/page/call/record';
import CallSingleRecord from '@/page/call/single-record';
import CallSeat from '@/page/call/seat';
import CallAssistantSeat from '@/page/call/assistant-seat';

/** 工作区域配置 **/
import WorkRegion from '@/page/region/index';

/** 组员配置 **/
import TeamConFig from '@/page/agent/team-config'

/** 新户回访 **/
import ReturnVisit from '@/page/return-visit/index';

/** 客服系统 **/
import Entryin from '@/page/custome-system/entryin';
import ReturnVisitStatistics from '@/page/custome-system/return-visit-statistics';

/** 登录 **/
import Login from '@/page/account/index';
import Password from '@/page/account/password';

import ErrorPage from '@/page/404/index';

/** pv 页面编码 **/
import {pv} from '@/analytics/pv';

/**渠道配置**/
import Channel from '@/page/channel/index';

const config = [{
    path: '/',
    component: Layout,
    children: [{
        path: '/',
        name: 'home',
        meta: {
            isAuth: true,
            title: '欢迎来到小职姐服务系统！ - 小职姐系统',
            pageTitle: '欢迎来到小职姐服务系统！',
            pv: pv['home']
        },
        component: Home
    }, {
        path: '/dashboard',
        name: 'dashboard',
        meta: {
            isAuth: true,
            title: 'Dashboard - 小职姐系统',
            pageTitle: 'Dashboard',
            pv: pv['dashboard']
        },
        component: Dashboard
    }, {
        path: '/report-agent-summary',
        name: 'report-agent-summary',
        meta: {
            isAuth: true,
            title: '日报数据 - 小职姐系统',
            pageTitle: '日报数据',
            pv: pv['daily-summary']
        },
        component: SummaryAgent
    }, {
        path: '/report-agent-assignments',
        name: 'report-agent-assignments',
        meta: {
            isAuth: true,
            title: '小职姐用户数 - 小职姐系统',
            pageTitle: '小职姐用户数',
            pv: pv['agent-user-count']
        },
        component: SummaryAssignments
    }, {
        path: '/report-contact',
        name: 'report-contact',
        meta: {
            isAuth: true,
            title: '电话、微信接通率 - 小职姐系统',
            pageTitle: '电话、微信接通率',
            pv: pv['agent-contact']
        },
        component: Contact
    }, {
        path: '/task',
        name: 'task',
        meta: {
            isAuth: true,
            title: '待办任务 - 小职姐系统',
            pageTitle: '待办任务',
            pv: pv['task']
        },
        component: Task
    }, {
        path: '/task/history',
        name: 'task-history',
        meta: {
            isAuth: true,
            title: '历史任务 - 小职姐系统',
            pageTitle: '历史任务',
            pv: pv['history-task']
        },
        component: TaskHistory
    }, {
        path: '/task/all',
        name: 'task-all',
        meta: {
            isAuth: true,
            title: '小职姐任务列表 - 小职姐系统',
            pageTitle: '小职姐任务列表',
            pv: pv['agent-history-task']
        },
        component: TaskAll
    }, {
        path: '/customer',
        name: 'customer',
        meta: {
            isAuth: true,
            title: '客户列表 - 小职姐系统',
            pageTitle: '客户列表',
            pv: pv['customer-list']
        },
        component: CustomerManage
    }, {
        path: '/customer/detail/:customerId',
        name: 'customer-detail',
        meta: {
            isAuth: true,
            title: '客户详情 - 小职姐系统',
            pageTitle: '客户详情',
            pv: pv['customer-detail']
        },
        component: CustomerDetail
    }, {
        path: '/customer/note-list/:customerId',
        name: 'customer-note-list',
        meta: {
            isAuth: true,
            title: '历史注记 - 小职姐系统',
            pageTitle: '历史注记',
            pv: pv['history-note']
        },
        component: CustomerNoteList
    }, {
        path: '/customer-core',
        name: 'customer-core',
        meta: {
            isAuth: true,
            title: '核心客户 - 小职姐系统',
            pageTitle: '核心客户',
            pv: pv['core-customer']
        },
        component: CustomerCore
    }, {
        path: '/customer-referral',
        name: 'customer-referral',
        meta: {
            isAuth: true,
            title: '邀请客户 - 小职姐系统',
            pageTitle: '邀请客户列表',
            pv: pv['referral-customer']
        },
        component: CustomerReferral
    }, {
        path: '/customer-event',
        name: 'customer-event',
        meta: {
            isAuth: true,
            title: '今日概要 - 小职姐系统',
            pageTitle: '今日概要',
            pv: pv['service-outline']
        },
        component: CustomerEvent
    }, {
        path: '/customer-event-record',
        name: 'customer-event-record',
        meta: {
            isAuth: true,
            title: '录入事件 - 小职姐系统',
            pageTitle: '录入事件',
            pv: pv['service-event']
        },
        component: CustomerEventRecord
    }, {
        path: '/customer-spring-reserve',
        name: 'customer-spring-reserve',
        meta: {
            isAuth: true,
            title: '预约春节后岗位的客户列表 - 小职姐系统',
            pageTitle: '预约春节后岗位的客户列表',
            pv: pv['customer-spring-reserve']
        },
        component: CustomerSpringReserve
    },  {
        path: '/customer-spring-trip',
        name: 'customer-spring-trip',
        meta: {
            isAuth: true,
            title: '瓜分路费客户的客户列表 - 小职姐系统',
            pageTitle: '瓜分路费客户的客户列表',
            pv: pv['customer-spring-trip']
        },
        component: CustomerSpringTrip
    }, {
        path: '/customer-active',
        name: 'customer-active',
        meta: {
            isAuth: true,
            title: '活跃用户 - 小职姐系统',
            pageTitle: '活跃用户',
            pv: pv['customer-active']
        },
        component: CustomerActive
    }, {
        path: '/entryin',
        name: 'entryin',
        meta: {
            isAuth: true,
            title: '入职客户 - 小职姐系统',
            pageTitle: '入职客户',
            pv: pv['service-entry-customer']
        },
        component: Entryin
    }, {
        path: '/return-visit-statistics',
        name: 'return-visit-statistics',
        meta: {
            isAuth: true,
            title: '回访统计 - 小职姐系统',
            pageTitle: '回访统计',
            pv: pv['service-statistics']
        },
        component: ReturnVisitStatistics
    }, {
        path: '/customer-assign',
        name: 'customer-assign',
        meta: {
            isAuth: true,
            title: '客户分配 - 小职姐系统',
            pageTitle: '客户分配',
            pv: pv['customer-assign']
        },
        component: CustomerAssign
    }, {
        path: '/customer-reserve',
        name: 'customer-reserve',
        meta: {
            isAuth: true,
            title: '预约客户列表 - 小职姐系统',
            pageTitle: '预约客户列表',
            pv: pv['reserve-customer']
        },
        component: CustomerReserve
    }, {
        path: '/work-track',
        name: 'work-track',
        meta: {
            isAuth: true,
            title: '工作监控 - 小职姐系统',
            pageTitle: '工作监控',
            pv: pv['work-track']
        },
        component: WorkTrack
    }, {
        path: '/conversion',
        name: 'conversion',
        meta: {
            isAuth: true,
            title: '小职姐转化奖励表 - 小职姐系统',
            pageTitle: '小职姐转化奖励表',
            pv: pv['conversion']
        },
        component: Conversion
    }, {
        path: '/position/recommend/:customerId',
        name: 'position-recommend',
        meta: {
            isAuth: true,
            title: '推荐工作 - 小职姐系统',
            pageTitle: '推荐工作',
            pv: pv['recommend-position-list']
        },
        component: PositionRecommend
    }, {
        path: '/position/detail/:positionId/:positionName/',
        name: 'position-detail',
        meta: {
            isAuth: true,
            title: '岗位详情 - 小职姐系统',
            pageTitle: '岗位详情',
            pv: pv['position-detail']
        },
        component: PositionDetail
    }, {
        path: '/position/list/',
        name: 'position-list',
        meta: {
            isAuth: true,
            title: '企业职位列表 - 小职姐系统',
            pageTitle: '企业职位列表',
            pv: pv['position-list']
        },
        component: PositionList
    }, {
        path: '/agent',
        name: 'agent',
        meta: {
            isAuth: true,
            title: '更换小职姐 - 小职姐系统',
            pageTitle: '更换小职姐',
            pv: pv['agent-change-log']
        },
        component: Agent
    }, {
        path: '/agent-info',
        name: 'agent-info',
        meta: {
            isAuth: true,
            title: '个人资料 - 小职姐系统',
            pageTitle: '个人资料',
            pv: pv['agent-info']
        },
        component: AgentInfo
    }, {
        path: '/agent-info-edit',
        name: 'agent-info-edit',
        meta: {
            isAuth: true,
            title: '修改资料 - 小职姐系统',
            pageTitle: '修改资料',
            pv: pv['agent-info-edit']
        },
        component: AgentEditInfo
    }, {
        path: '/agent-sign-in',
        name: 'agent-sign-in',
        meta: {
            isAuth: true,
            title: '上下线记录 - 小职姐系统',
            pageTitle: '上下线记录',
            pv: pv['online']
        },
        component: AgentSignIn
    }, {
        path: '/agent-single-sign-in',
        name: 'agent-single-sign-in',
        meta: {
            isAuth: true,
            title: '上下线记录 - 小职姐系统',
            pageTitle: '上下线记录',
            pv: pv['my-work']
        },
        component: AgentSingleSignIn
    }, {
        path: '/agent-scheduling',
        name: 'agent-scheduling',
        meta: {
            isAuth: true,
            title: '排班记录 - 小职姐系统',
            pageTitle: '排班记录',
            pv: pv['scheduling']
        },
        component: Scheduling
    }, {
        path: '/agent-account',
        name: 'agent-account',
        meta: {
            isAuth: true,
            title: '账号管理 - 小职姐系统',
            pageTitle: '账号管理',
            pv: pv['account']
        },
        component: AgentAccount
    }, {
        path: '/agent-assign-count',
        name: 'agent-assign-count',
        meta: {
            isAuth: true,
            title: '小职姐分配数 - 小职姐系统',
            pageTitle: '小职姐分配数',
            pv: pv['single-agent-assign']
        },
        component: SingleAssign
    }, {
        path: '/agent-assign-count-all',
        name: 'agent-assign-count-all',
        meta: {
            isAuth: true,
            title: '总分配数 - 小职姐系统',
            pageTitle: '总分配数',
            pv: pv['total-assign']
        },
        component: AllAssign
    },{
        path: '/wechat',
        name: 'wechat',
        meta: {
            isAuth: true,
            title: '微信号管理 - 小职姐系统',
            pageTitle: '微信号管理',
            pv: pv['wechat']
        },
        component: Wechat
    }, {
        path: '/salary-sign/:userId/',
        name: 'salary-sign',
        meta: {
            isAuth: true,
            title: '打卡记录 - 小职姐系统',
            pageTitle: '打卡记录',
            pv: pv['sign-in']
        },
        component: SalarySign
    }, {
        path: '/salary-release/:userId/',
        name: 'salary-release',
        meta: {
            isAuth: true,
            title: '领周薪发放记录 - 小职姐系统',
            pageTitle: '领周薪发放记录',
            pv: pv['zx-pay']
        },
        component: SalaryRelease
    }, {
        path: '/day-release/:userId/',
        name: 'day-release',
        meta: {
            isAuth: true,
            title: '日日返发放记录 - 小职姐系统',
            pageTitle: '日日返发放记录',
            pv: pv['daily-pay']
        },
        component: DayRelease
    }, {
        path: '/bonus/',
        name: 'bonus',
        meta: {
            isAuth: true,
            title: '小职姐提成 - 小职姐系统',
            pageTitle: '小职姐提成',
            pv: pv['bonus']
        },
        component: Bonus
    }, {
        path: '/call-record/',
        name: 'call-record',
        meta: {
            isAuth: true,
            title: '通话记录 - 小职姐系统',
            pageTitle: '通话记录',
            pv: pv['call']
        },
        component: CallRecord
    }, {
        path: '/call-single-record/:userId/',
        name: 'call-single-record',
        meta: {
            isAuth: true,
            title: '通话记录 - 小职姐系统',
            pageTitle: '通话记录',
            pv: pv['single-call'],
        },
        component: CallSingleRecord
    }, {
        path: '/call-seat/',
        name: 'call-seat',
        meta: {
            isAuth: true,
            title: '坐席配置 - 小职姐系统',
            pageTitle: '坐席配置',
            pv: pv['call-seat']
        },
        component: CallSeat
    }, {
        path: '/call-assistant-seat/',
        name: 'call-assistant-seat',
        meta: {
            isAuth: true,
            title: '坐席配置 - 小职姐系统',
            pageTitle: '坐席配置',
            pv: pv['assistant-manager-call-seat']
        },
        component: CallAssistantSeat
    }, {
        path: '/work-region',
        name: 'work-region',
        meta: {
            isAuth: true,
            title: '工作区域 - 小职姐系统',
            pageTitle: '工作区域',
            pv: pv['work-region']
        },
        component: WorkRegion
    }, {
        path: '/team-config',
        name: 'team-config',
        meta: {
            isAuth: true,
            title: '组员配置 - 小职姐系统',
            pageTitle: '组员配置',
            pv: pv['team-config']
        },
        component: TeamConFig
    }, {
        path: '/channel',
        name: 'channel',
        meta: {
            isAuth: true,
            title: '渠道配置 - 小职姐系统',
            pageTitle: '渠道配置',
            pv: pv['channel']
        },
        component: Channel
    }, {
        path: '/password',
        name: 'password',
        meta: {
            isAuth: true,
            title: '修改密码 - 小职姐系统',
            pageTitle: '修改密码',
            pv: pv['change-password']
        },
        component: Password
    }, {
        path: '/return-visit',
        name: 'return-visit',
        meta: {
            isAuth: true,
            title: '新户回访 - 小职姐系统',
            pageTitle: '新户回访',
            pv: pv['return-visit']
        },
        component: ReturnVisit
    }]
}, {
	path: '/login',
	name: 'login',
    meta: {
        isAuth: false,
        title: '登录 - 小职姐系统',
        pageTitle: '登录',
        pv: pv['login']
    },
    component: Login
}, {
	path: '*',
    meta: {
        isAuth: false,
        title: '404 - 小职姐系统',
        pageTitle: '404'
    },
    component: ErrorPage
}];

export default config;