import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import Account from './account';

import FileResourceController from './file-resource';

import AgentAssignmentController from './agent-assignment-controller';

import AgentAssistantController from './agent-assistant-controller';

import AgentController from './agent-controller';

import AgentProfileController from './agent-profile-controller';

import AgentRewardController from './agent-reward-controller';

import AgentSignInController from './agent-sign-in-controller';

import AgentTaskController from './agent-task-controller';

import AppDialController from './app-dial-controller';

import ApplicationController from './application-controller';

import ReservationController from './reservation-controller';

import CustomerRecordController from './customer-comment-controller';

import CustomerController from './customer-controller';

import EnterpriseController from './enterprise-controller';

import PositionController from './position-controller';

import StoreController from './store-controller';

import SummaryController from './summary-controller';

import SalaryController from './weekly-salary-controller';

import WorkRegionController from './work-region-controller';

import WorkSchedulingController from './work-scheduling-controller' ;

import AssignRuleConfigureController from './assign-rule-configure-controller' ;

import CallCenterController from './call-center-controller';

import ReturnVisit from './return-visit';//新户回访

import weChatAccountController from './wechat-account-controller';

import ServiceFollowUpController from './service-follow-up-controller';

import ServiceEventController  from './service-event-controller';

import SourceConfigureController from './source-configure-controller';

export default new Vuex.Store({
    strict: process.env.NODE_ENV === 'DEV',
    modules: {
    	Account,
        FileResourceController,
        
    	AgentAssignmentController,
        AgentAssistantController,
    	AgentController,
    	AgentProfileController,
        AgentRewardController,
        AgentSignInController,
    	AgentTaskController,

        AppDialController,

        ApplicationController,
        ReservationController,
    	CustomerRecordController,
    	CustomerController,
        EnterpriseController,
        PositionController,
        StoreController,
        SummaryController,
        weChatAccountController,

        SalaryController,

        WorkRegionController,

        WorkSchedulingController,
        
        AssignRuleConfigureController,

        CallCenterController,

        ReturnVisit,

        ServiceFollowUpController,
        ServiceEventController,

        SourceConfigureController
    }
})