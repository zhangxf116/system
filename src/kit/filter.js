// 过滤器

Date.prototype.format = function(format) {
	var date = {
		"M+": this.getMonth() + 1,
		"d+": this.getDate(),
		"h+": this.getHours(),
		"m+": this.getMinutes(),
		"s+": this.getSeconds(),
		"q+": Math.floor((this.getMonth() + 3) / 3),
		"S+": this.getMilliseconds()
	};

	if (/(y+)/i.test(format)) {
		format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
	}

	for (var k in date) {
		if (new RegExp("(" + k + ")").test(format)) {
			format = format.replace(RegExp.$1, RegExp.$1.length == 1? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
		}
	}
	
	return format;
}

let filter = {}

filter.install = function (Vue) {
	/** 经纪人性别字典 **/
	Vue.filter('sexMap', function(value) {

		switch(value) {
			case 0: return '男';
			case 1: return '女';
			default: return '--';
		}

	});

	/** 客户性别字典 **/
	Vue.filter('customerSexMap', function(value) {

		switch(value) {
			case 0: return '未知';
			case 1: return '男';
			case 2: return '女';
			default: return '--';
		}

	});

	/** 时间格式化 **/
	Vue.filter('dateFormat01', function(value) {
		if(!value) { return ''; }

	    let time = new Date(parseInt(value))	    
	    return time.format('yyyy-MM-dd hh:mm')

	});

	Vue.filter('dateFormat02', function(value) {
		if(!value) { return ''; }
		
	    let time = new Date(parseInt(value))	    
	    return time.format('yyyy-MM-dd')

	});

	Vue.filter('dateFormat03', function(value) {
		if(!value) { return ''; }
		
	    let time = new Date(parseInt(value))	    
	    return time.format('yyyy.MM.dd')

	});

    Vue.filter('dateFormat04', function(value) {
        if(!value) { return ''; }

        let time = new Date(parseInt(value))
        return time.format('yyyy-MM')

    });

	/** 电话号码脱敏 **/
	Vue.filter('phoneMap', function(value) {
		let num = value ? value : '';

		if (num) {
			return num.substr(0,3) + "****" + num.substr(7);
		} else {
			return '--';
		}

	});

	/** 姓名脱敏 **/
	Vue.filter('nameMap', function(value) {
		let name = value ? value : '';

		if (name) {
			return name.substr(0,1)+"**"
		} else {
			return '--';
		}

	});

	/** 任务状态 **/
	Vue.filter('taskStastusMap', function(value) {
		switch(value) {
			case 0: return '待处理';
			case 19: return '已完成';
			case 29: return '已关闭';
			default: return '--';
		}
	});

	/** 岗位申请状态 **/
	Vue.filter('applyStatusMap', function(value) {
		switch(value) {
			case 1: return '已申请';
			case 2: return '取消申请';
			case 10: return '已预约';
			case 11: return '取消预约';
			case 20: return '已签到';
			case 30: return '已上车';
			case 40: return '已录取';
			case 41: return '未录取';
			case 50: return '已入职';
			case 51: return '未入职';
			case 60: return '已结算奖励';
			case 99: return '已离职';
			default: return '--';
		}
	});

	/** 岗位上下线情况 **/
	Vue.filter('jobStatusMap', function(value) {
		switch(value) {
			case 0: return '下线';
			case 1: return '上线';
			default: return '--';
		}
	});

	/** 快返保状态 **/
	Vue.filter('assureStatusMap', function(value) {
		switch(value) {
			case 0: return '快返保未生效';
			case 1: return '倒计时中';
			case 2: return '倒计时结束';
			case 3: return '快返保失效';
			default: return '--';
		}
	});

	/** 奖励状态 **/
	Vue.filter('returnFeeStatusMap', function(value) {
		switch(value) {
			case 0: return '已创建';
			case 1: return '已初始化';
			case 2: return '已取消';
			case 3: return '考勤确认中';
			case 8: return '进入奖励批次';
			case 14: return '待发放';
			case 15: return '可提现';
			case 16: return '提现中';
			case 18: return '提现失败';
			case 19: return '提现成功';
			default: return '--';
		}
	});

	/** 注记方式 **/
	Vue.filter('recordWayMap', function(value) {
		switch(value) {
			case 0: return '手机';
			case 1: return '微信';
			case 2: return 'QQ';
			case 3: return '固话';
			default: return '--';
		}
	});

	/** 用户标记 **/
	Vue.filter('userTagsMap', function(value) {
		switch(value) {
			case 1: return '少数名族';
			case 2: return '烟疤';
			case 3: return '残疾';
			case 4: return '纹身';
			case 5: return '骂人';
			case 6: return '有案底';
			default: return '--';
		}
	});

	/** 个性标记 **/
	Vue.filter('personalityTagsMap', function(value) {
		switch(value) {
			case 11: return '不怕脏';
			case 12: return '不怕累';
			case 13: return '不看显微镜';
			case 14: return '不穿无尘服';
			case 15: return '希望高返费';
			case 16: return '倾向小厂';
			case 17: return '倾向大厂';
			case 18: return '倾向短期工作';
			case 19: return '倾向稳定工作';
			case 20: return '要求包吃住';
			case 21: return '要求五险一金';
			default: return '--';
		}
	});

	/** 工作状态 **/
	Vue.filter('userJobStatusMap', function(value) {
		switch(value) {
			case 1: return '在职';
			case 2: return '离职';
			default: return '';
		}
	});

	/** 客户分配：在职状态 **/
	Vue.filter('onboardingStatusMap', function(value) {
		switch(value) {
			case 0: return '未入职';
			case 1: return '已入职';
			case 2: return '已离职';
			default: return '';
		}
	});

	/** 核心用户当前状态 **/
	Vue.filter('userCurrentJobStatusMap', function(value) {
		switch(value) {
			case 0: return '已签到';
			case 1: return '已入职';
			case 2: return '已离职';
			default: return '';
		}
	});

	/** 婚姻状况 **/
	Vue.filter('marryStatusMap', function(value) {
		switch(value) {
			case 'MARRIED': return '已婚';
			case 'UNMARRIED': return '未婚';
			case 'GOT_ENGAGED': return '订婚';
			case 'HAVING_BG_FRIEND': return '有对象';
			case 'SINGLE': return '单身';
			default: return '';
		}
	});

	/** 技能标签 **/
	Vue.filter('userSkillTagStatusMap', function(value) {
		switch(value) {
			case 101: return '普工';
			case 102: return '技术工';
			default: return '';
		}
	});

	/** 小职姐账号状态 **/
	Vue.filter('agentAccountStatusMap', function(value) {
		switch(value) {
			case 1: return '禁用';
			case 0: return '启用';
			default: return '--';
		}
	});

	/** 领周薪发放记录--工资类型 **/
	Vue.filter('salaryReleaseType', function(value) {
		switch(value) {
			case 1: return '周薪';
			case 2: return '剩余工资';
			default: return '--';
		}
	});

	/** 领周薪发放记录--发放状态 **/
	Vue.filter('salaryReleaseStatus', function(value) {
		switch(value) {
			case 0: return '未发放';
			case 1: return '发放中';
			case 2: return '已发放';
			case 3: return '发放失败';
			case 9: return '付款取消';
			default: return '--';
		}
	});

	/** 日日返--发放状态 **/
	Vue.filter('dayReleaseStatus', function(value) {
		switch(value) {
			case 0: return '待审核';
			case 1: return '审核中';
			case 2: return '审核无效';
			case 3: return '审核成功';
			case 4: return '提现中';
			case 5: return '提现失败';
			case 6: return '提现成功';
			default: return '--';
		}
	});

	/** 电话接通状态 **/
	Vue.filter('callConnectStatusMap', function(value) {
		switch(value) {
			case 0: return '未接通';
			case 1: return '接通';
			default: return '--';
		}
	});

	/** 通话状态 **/
	Vue.filter('callStatusMap', function(value) {
		switch(value) {
			case 0: return '呼出';
			case 1: return '呼入';
			default: return '--';
		}
	});

	/** 预约人类型 **/
	Vue.filter('reservePersonMap', function(value) {
		switch(value) {
			case 0: return '用户';
			case 1: return '小职姐';
			case 2: return '小职姐助理';
			default: return '--';
		}
	});

	/** 预约状态 **/
	Vue.filter('reserveStatusMap', function(value) {
		switch(value) {
			case 1: return '已签到';
			case 2: return '未签到';
			case 0: return '取消';
			case 10: return '取消';
			case 20: return '取消';
			case 30: return '取消';
			default: return '--';
		}
	});

	/** 支付状态 **/
	Vue.filter('paymentStatusMap', function(value) {
		switch(value) {
			case 0: return '未支付';
			case 1: return '支付中';
			case 2: return '已支付';
			case 3: return '已取消';
			case 4: return '支付失败';
			default: return '--';
		}
	});

	/** 退款状态 **/
	Vue.filter('refundStatusMap', function(value) {
		switch(value) {
			case 0: return '未退款';
			case 1: return '审核中';
			case 2: return '退款中';
			case 3: return '审核拒绝';
			case 4: return '已退款';
			case 5: return '退款失败';
			default: return '--';
		}
	});

	/** 支付方式 **/
	Vue.filter('paymentTypeMap', function(value) {
		switch(value) {
			case 'WECHAT': return '微信';
			case 'BAITIAO': return '白条';
			default: return '--';
		}
	});

   /** 用户状态 **/
   Vue.filter('userStatusMap', function(value) {
       switch(value) {
           case 0: return '无';
           case 1: return '未接通';
           case 2: return '在职';
           case 3: return '离职';
           default: return '--';
       }
   });

   /** 单位 **/
   Vue.filter('unitMap', function(value) {
       switch(value) {
           case 'HOUR': return '小时';
           case 'DAILY': return '天';
           default: return '';
       }
   });

   /** Dashboard 弹层 title **/
    Vue.filter('dashboardTitleMap', function(value) {
       switch(value) {
           case 'RESERVE': return '预约数';
           case 'SIGN': return '签到用户数';
           case 'RUZHI': return '入职用户数';
           case 'EFFECTIVE': return '有效入职数';
           default: return '';
       }
   });

    /** 车费发放状态 **/
    Vue.filter('userPaymentStatusMap', function(value) {
        switch(value) {
            case 0: return '未提现';
            case 1: return '可提现';
            case 2: return '提现中';
            case 3: return '提现成功';
            case 4: return '提现失败';
            default: return '--';
        }
    });
    
    /** 工牌状态 **/
    Vue.filter('workCardMap', function(value) {
        switch(value) {
            case 0: return '待审核';
            case 8: return '驳回';
            case 9: return '已通过';
            default: return '';
        }
    });

    /** 提成列表标题头 **/
    Vue.filter('bonusPageManagerMap', function(value) {
        switch(value) {
            case 0: return '经理';
            case 1: return '当前经理';
            case 2: return '邀请时经理';
            default: return '';
        }
    });
    Vue.filter('bonusPageSupervisorMap', function(value) {
        switch(value) {
            case 0: return '主管';
            case 1: return '当前主管';
            case 2: return '邀请时主管';
            default: return '';
        }
    });
    Vue.filter('bonusPageAgentMap', function(value) {
        switch(value) {
            case 0: return '小职姐';
            case 1: return '当前小职姐';
            case 2: return '邀请时小职姐';
            default: return '';
        }
    });
}

export default filter;