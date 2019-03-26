export const API = {
	/** user **/
	'login': '/auth/token',
	'login-qr': '/api/agents/qr-access-token',
	'password': '/auth/password',

	/** file-resource ***/
	'upload-base64': '/upload/file/upload-base64',

	/** agent-assignment-controller  **/
	'user-assign': '/api/agent-assignments',
	'user': '/api/agent-assignments/customers',
	'agent-history': '/api/agent-assignments/history',
	'core-user': '/api/agent-assignments/core-customers',
	'active-customers': '/api/agent-assignments/active-customers',
	'active-customers-events': '/api/agent-assignments/customer-active-events',
	'referral-customer': '/api/agent-assignments/referral-customers',

	/** agent-assistant-controller **/
	'agent-assistant': '/api/agent-assistants',

	/** agent-controller **/
	'agents': '/api/agents',
	'agents-account': '/api/agents/accounts',
	'agents-enable': '/api/agents/enable',
    'supervisor': '/api/agents/supervisors',
    'supervisor-candidates': '/api/agents/supervisor-candidates',
	'agent-team': '/api/agents/subordinate-relationship',
	'supervisor-action': '/api/agents/supervisor',
    'agent-team-edit': '/api/agents/members',
    'agent-team-delete': '/api/agents/subordinate-relationship',
    'agent-team-xzj-list': '/api/agents/grouping-agents',

	/** agent-profile-controller **/
	'agent-profile': '/api/agent-profile',
	'agent-id-info': '/api/agent-profile/extracted-id-card-info',
	'agent-profile-roles': '/api/agent-profile/roles',

	/** agent-reward-controller **/
	'agent-reward': '/api/agent-rewards',
	'agent-reward-summary': '/api/agent-rewards/summary',

	/** agent-sign-in-controller **/
	'sign-in': '/api/agent-sign-in',
	'sign-in-record': '/api/agent-sign-in/records',

	/** agent-task-controller **/
	'agent-tasks-list': '/api/agent-tasks',
	'ws': (window.location.protocol === 'https:' ? 'wss://' : 'ws://') + window.location.host + '/websocket',
	'agent-tasks-complete': '/api/agent-tasks/completion',
	'agent-tasks-type': '/api/agent-tasks/types',
	'sign-up-task': '/api/agent-tasks/sign-up-task',
	'task-claim': '/api/agent-tasks/customers-claiming',

	/** app-dial-controller **/
	'app-call': '/api/app-dial',
	'app-call-status': '/api/app-dial/dialing-status',

	/** application-controller **/
	'apply-cancel': '/api/application/positions-application-cancel',
	'position-handle': '/api/application/position',
	'reserve-position-cancel': '/api/application/positions-reservation-cancel',
	'pick-up-cancel': '/api/application/pick-up-cancel',
	'reserve-notification': '/api/application/reserve-notification',
	'delay-task': '/api/application/trace-delay-notification',

	/** customer-comment-controller **/
	'record': '/api/customer-comments',

	/** customer-controller **/
	'customer': '/api/customers',
	'apply-history': '/api/customers/apply-history',
	'customer-following': '/api/customers/following',
	'customer-id': '/api/customers/id',
	'exception-return-fee': '/api/customers/exception-return-fee',
	'onboarding-list': '/api/customers/onboarding',
	'pick-up-list': '/api/customers/pick-up',
	'apply-position': '/api/customers/positions-application',
	'reserve-list': '/api/customers/positions-reservation',
	'return-fee-list': '/api/customers/return-fee',
	'sign-in-list': '/api/customers/sign-in',
	'sources': '/api/customers/sources',
	'customer-referral': '/api/customers/referral',
	'customer-remark': '/api/customers/remark',
	'position-applied': '/api/customers/position-applied',
	'spring-reserve': '/api/customers/chinese-new-year-reservation',
	'spring-trip': '/api/customers/chinese-new-year-toll',
	'work-card': '/api/customers/work-card',
	'customer-auth-name': '/api/customers/real-name-verification',

	/** enterprise-controller **/
	'enterprise-city': '/api/enterprise/cities',
	'enterprise-position': '/api/enterprise/positions',

	/** position-controller **/
	'position-list': '/api/positions',
	'position-city': '/api/positions/cities',
	'position-detail': '/api/positions/details',
	'interview-date': '/api/positions/interview-date',
	'position-welfare': '/api/positions/welfare',
	'position-feature': '/api/positions/features',

	/** store-controller **/
	'store-list': '/api/stores',
	'store-location-list': '/api/stores/pick-up-locations',

	/** summary-controller  **/
	'summary-agent': '/api/summary/agents',
	'summary-assignments': '/api/summary/assignments',
	'summary-dashboard': '/api/summary/dash-board',
	'summary-new-sign-up': '/api/summary/new-sign-up',
	'contact-rate': '/api/summary/line-connected-rate',
	'summary-reservation': '/api/summary/reservation',
	'summary-work-tracking': '/api/summary/agent-work-tracking',
	'summary-board-detail': '/api/summary/dash-board-details',
    'agent-conversion-index': '/api/summary/agent-conversion-index',
	'summary-sign-in-progress': '/api/summary/sign-in-progress',
	'summary-wx-index': '/api/summary/wx-index',
	'summary-leader-board': '/api/summary/dash-board-leader-board',
	'summary-sign-in-trend': '/api/summary/sign-in-trend',

	/** weekly-salary-controller **/
	'salary-sign-in': '/api/weekly-salary/customer-sign-in',
	'salary-payment': '/api/weekly-salary/payment-records',
	'salary-day': '/api/weekly-salary/daily-payment-records',

	/** work-region-controller **/
	'regions': '/api/work-regions',
	'regions-assigned-agents': '/api/work-regions/assigned-agents',
	'regions-assignment': '/api/work-regions/assignment',
	'regions-city': '/api/work-regions/cities',

	/** work-scheduling-controller **/
	'work-scheduling': '/api/work-scheduling',
	'work-scheduling-date': '/api/work-scheduling/last-schedule-date',

	/** assign-rule-configure-controller **/
  	'assign-rule-configure' :'/api/assign-rule/per-agent',
	'all-assign-rule-configure' :'/api/assign-rule/in-level',

	/** call-center-controller  **/
	'call': '/api/call-center/call',
	'call-record': '/api/call-center/call-records',
	'receptionist': '/api/call-center/receptionist',
	'sip-phone': '/api/call-center/sip-phones',
	'unbind': '/api/call-center/phone-binding',
	'call-way-list': '/api/call-center/direct-inward-dialing',
	'call-way-switch': '/api/call-center/direct-inward-dialing-changing',
	'call-is-tel': '/api/call-center/seat-configured',

	/** reservation-controller **/
	'reserve': '/api/reservation',
	'reserve-pickup-location': '/api/reservation/pick-up-locations',
	'reserve-pickup-date': '/api/reservation/pick-up-dates',
	'reserve-all-pickup': '/api/reservation/all-pick-up-parties',
	'reserve-toll': '/api/reservation/toll',

	/** 新户回访 **/
	'unclaimed-list': '/api/assistant-claim/claimable',
	'claimed-list': '/api/assistant-claim/customers',
	'claim-success': '/api/assistant-claim',
	'location-of-expectation': '/api/assistant-claim/cities',
	'remark-comments':'/api/assistant-comments',
	'remark-user':'/api/assistant-claim/customers-remark',
	'customers-allocation':'/api/assistant-claim/customers-allocation',

    /** we-chat-account-controller **/
    'wechat': '/api/agent-wx-accounts',

    /** service-follow-up-controller **/
	'event-receptionist': '/api/service-follow-up/receptionist',
	'event-regist': '/api/service-follow-up/sign-up',
	'entryin-list': '/api/service-follow-up/customers',
    'entryin-history-records': '/api/service-follow-up/records',
    'entryin-records': '/api/service-follow-up/records',
	'entryin-claim': '/api/service-follow-up/commissioner-claim',
	'entryin-visit': '/api/service-follow-up',
	'entryin-visit-records': '/api/service-follow-up/records',
	'entryin-statistics': '/api/service-follow-up/statistics',

	/** service-event-controller **/
	'event-customer': '/api/customer-events',

	/**source-configure-controller**/
	'sources-configure': '/api/source-configure/sources',
    'sources-configure-areas': '/api/source-configure/areas',
};