/**  任务分类 **/
let taskCategory  = {
	pending: '0',
	history: '1'
};

/** 注记的沟通方式 **/
let recordWay = [{key: 0, value: "手机"}, {key: 1, value: "微信"}, {key: 3, value: "固话"}];

/** 快速注记类型 **/
let quickRecordList = ['暂无工作意向', '近期找工作 可尽快到岗', '目前在职，想换新工作', '电话都没打通'];

/** 岗位申请状态 **/
let applyStatusList = [
	{ key: 1, value: '已申请'},
	{ key: 2, value: '取消申请'},
	{ key: 10, value: '已预约'},
	{ key: 11, value: '取消预约'},
	{ key: 20, value: '已签到'},
	{ key: 30, value: '已上车'},
	{ key: 40, value: '已录取'},
	{ key: 41, value: '未录取'},
	{ key: 50, value: '已入职'},
	{ key: 51, value: '未入职'},
	{ key: 97, value: '已外派'},
	{ key: 98, value: '已转正'},
	{ key: 99, value: '已离职'}
];

/** 岗位列表快速查询枚举值 **/
let positionTypeList = [
	// { key: 'MAJOR', value: '主推'},
	{ key: 'INCENTIVE', value: '高额奖励'},
	{ key: 'SHIPPING', value: '企业急招'},
	{ key: 'NONLOCAL', value: '异地招聘'},
	{ key: 'ZX', value: '周薪职位'}
];

/** 特殊标记 **/
let customerTags = [
	{ key: '少数民族', value: 1},
	{ key: '烟疤', value: 2},
	{ key: '残疾', value: 3},
	{ key: '纹身', value: 4},
	{ key: '骂人', value: 5},
	{ key: '有案底', value: 6}
];

/** 个性标记 **/
let personalityTags = [
	{ key: '不怕脏', value: 11},
	{ key: '不怕累', value: 12},
	{ key: '不看显微镜', value: 13},
	{ key: '不穿无尘服', value: 14},
	{ key: '希望高返费', value: 15},
	{ key: '倾向小厂', value: 16},
	{ key: '倾向大厂', value: 17},
	{ key: '倾向短期工作', value: 18},
	{ key: '倾向稳定工作', value: 19},
	{ key: '要求包吃住', value: 20},
	{ key: '要求五险一金', value: 21},
];

/** 学历 **/
let education = ['本科及以上', '大专', '高中/中专/技校', '初中', '小学及以下'];

/** 薪资 **/
let salary = ['3000-4000元', '4000-5000元', '5000-6000元', '6000元以上'];

/** 求职意向 **/
let objective = ['工厂普工', '服务业', '司机家政', '不限']

/** 期望入职时间 **/
let expectedEntryTime = ['3天以内', '1周以内', '2周以内', '1个月以内'];

/** 婚姻状况 **/
let marryStatus = [
	{ key: '已婚', value: 'MARRIED'},
	{ key: '未婚', value: 'UNMARRIED'},
	{ key: '订婚', value: 'GOT_ENGAGED'},
	{ key: '有对象', value: 'HAVING_BG_FRIEND'},
	{ key: '单身', value: 'SINGLE'},
];

/** 抱团/单人 **/
let peopleGroup = ['1人', '2人', '3人', '多人'];

/** 分页大小配置 **/
let pageSizes = [10, 20, 50, 100, 150, 200];

/** 客户等级 **/
let userRankList = ['A', 'B'];

/** 入离职状态 **/
let jobStatus = [
	{ key: '未入职', value: 0},
	{ key: '已入职', value: 1},
	{ key: '已离职', value: 2},
];

export {
	taskCategory,
	recordWay,
	quickRecordList,
	applyStatusList,
	positionTypeList,
	customerTags,
	personalityTags,
	education,
	salary,
	objective,
	expectedEntryTime,
	marryStatus,
	peopleGroup,
	
	pageSizes,
	userRankList,

	jobStatus
}