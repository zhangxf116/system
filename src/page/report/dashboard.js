import html from './dashboard.html';
import {mapState, mapActions} from 'vuex';

import {isEmpty, getOneDayLong, getZeroTime, getEndTime, handlePageChange, getBeforeDate} from '@/kit/common';
import {pageSizes} from '@/kit/data';

export default {
	template: html,
	computed: {
		...mapState({
			dashboard: state => state.SummaryController.dashboard,
			newSignUpReport: state => state.SummaryController.newSignUpReport,
			boardDetail: state => state.SummaryController.boardDetail,
            trendData: state => state.SummaryController,
		})
	},
	data() {
		return {
            summaryProgress: [],
            summaryProgressMonth: [],
            percentage: 0,
            
			pageSizes: pageSizes,
            headers: {
                Authorization: 'Basic d2ViLWFwcDo='
            },

            timeRange:[],
            timeRangeWx: [],
            timeRangeDash: [],
            timeRangeBoard: [],
            timeRangeSign: '',
			dashboardData: {
				from: '',
				to: '',
			},
            wxDate: {
			    from: '',
                to: ''
            },
            signData: {
                from: '',
                to: ''
            },
			newSignUpData: {
                from: '',
                to: '',

                page_no: 1,
                page_size: 50
            },
			boardDetailParams: {
				type: '',
				from: '',
				to: '',

				page_no: 1,
                page_size: 50
			},
			dashboardTimeOptions: {
				disabledDate: time => {
					return time.getTime() > getEndTime();
				},
			},
			isShowNewSignUpReport: false,
			isShowBoardDetail: false,

            entryDate: new Date(),
            signDate: new Date(),
            inviteDate: new Date(),
            weekNum: 0,
            weekNumSign: 0,
            weekNumInvite: 0,
            leaderData: {
			    type: '',
                from: '',
                to: ''
            },
            leaderDataSign: {
                type: '',
                from: '',
                to: ''
            },
            leaderDataInvite: {
                type: '',
                from: '',
                to: ''
            },
            disabled: false,
            day: [],
            index: [],
            uploaded: [],
            daySign: [],
            accumulativeSignIn: [],
            dailySignIn: [],
            level: [],
            isDisabled: true,
            isDisabledSign: true,
            isDisabledInvite: true,

            Billboard: [],
		}
	},
	methods: {
		...mapActions(['SUMMARY_DASHBOARD', 'SUMMARY_NEW_SIGN_UP', 'SUMMARY_BOARD_DETAIL',
            'SUMMARY_SIGN_IN_PROGRESS', 'SUMMARY_SIGN_IN_PROGRESS_MONTH', 'SUMMARY_WX_INDEX',
            'SUMMARY_LEADER_BOARD', 'SUMMARY_LEADER_BOARD_SIGN', 'SUMMARY_LEADER_BOARD_INVITE',
            'SUMMARY_SIGN_IN_TREND']),
		getDashboard() {
			let params = {};
            for(let i in this.dashboardData) {
                if (!isEmpty(this.dashboardData[i])) {
                    params[i] = this.dashboardData[i];
                }
            }
            this.SUMMARY_DASHBOARD({params: params, headers: this.headers}).then(res => {});
		},
        getDashboardDetail() {
            let params = {};
            for(let i in this.boardDetailParams) {
                if (!isEmpty(this.boardDetailParams[i])) {
                    params[i] = this.boardDetailParams[i];
                }
            }
            this.SUMMARY_BOARD_DETAIL({params: params, headers: this.headers}).then(res => {});
        },
        getNewSignUp() {
            let params = {};
            for(let i in this.newSignUpData) {
                if (!isEmpty(this.newSignUpData[i])) {
                    params[i] = this.newSignUpData[i];
                }
            }
            this.SUMMARY_NEW_SIGN_UP({params: params, headers: this.headers}).then(res => {});
        },
        dashboardTime(from) {
            if (from) {
                let endTime = from + getOneDayLong();

                this.dashboardData.from = from;
                this.dashboardData.to = endTime;
                this.timeRange.push(from, endTime);

                this.wxDate.from = getBeforeDate(30).getTime();
                this.wxDate.to = endTime;
                this.timeRangeWx.push(getBeforeDate(30), endTime);

                let date = new Date();
                let year = date.getFullYear();
                let month = date.getMonth()+1;
                if(month < 10) {
                    month = "0"+month;
                } else {
                    month = month
                }
                this.timeRangeSign = year+'-'+month+'-01';
                this.signData.from = new Date(this.timeRangeSign).getTime();// 获取当前月第一天
                this.signData.to = new Date(year,month,0).getTime();// 获取当前月最后一天

                this.newSignUpData.from = from;
                this.newSignUpData.to = endTime;
                this.timeRangeDash.push(from, endTime);

                this.boardDetailParams.from = from;
                this.boardDetailParams.to = endTime;
                this.timeRangeBoard.push(from, endTime);
            }
            this.getDashboard();
        },
        updateList(val) {
		    if(val) {
                this.newSignUpData.from = val[0];
                this.newSignUpData.to = val[1];
                this.getNewSignUp();
            }
        },
        updateListBoard(val) {
		    if(val) {
                this.boardDetailParams.from = val[0];
                this.boardDetailParams.to = val[1];
                this.getDashboardDetail();
            }
        },
        showPopup(argumentsObject, argumentsName, functionName, showPopup, type) {
            this.timeRangeDash = this.timeRange;
            this.timeRangeBoard = this.timeRange;
            this.newSignUpData.from = this.timeRange[0];
            this.newSignUpData.to = this.timeRange[1];
            this.boardDetailParams.from = this.timeRange[0];
            this.boardDetailParams.to = this.timeRange[1];
            this.boardDetailParams.type = type;
            if (this[argumentsObject][argumentsName] > 0) {
                this[functionName]();
                this[showPopup] = true;
            }
        },
        handlePageChange,

        /**签到目标进度**/
        progressCommon(cont, type) {
            let signInLevel = [cont.signInLevel1,cont.signInLevel2,cont.signInLevel3,cont.signInLevel4,cont.signInLevel5];
            let signInLevelDifference =[cont.signInLevel1Difference, cont.signInLevel2Difference, cont.signInLevel3Difference,
                cont.signInLevel4Difference, cont.signInLevel5Difference];
            let rate = ['转化率0.1%', '转化率0.15%', '转化率0.17%', '转化率0.2%', '转化率0.3%'];
            for(let i=1; i<=5;i++) {
                let obj = ('obj'+i);
                obj = {};
                obj['completed'] = cont.completed;
                obj['rate'] = rate[i-1];
                obj['signInLevel'] = signInLevel[i-1];
                obj['signInLevelDifference'] = signInLevelDifference[i-1];
                if(obj.completed === 0) {
                    if(obj.signInLevelDifference<=0 && obj.signInLevel !=0) {
                        this.percentage = 100
                    } else {
                        this.percentage = 0
                    }
                } else {
                    if(obj.signInLevelDifference<=0) {
                        this.percentage = 100
                    }else {
                        this.percentage = Math.round(obj.completed / obj.signInLevel * 100)
                    }
                }
                obj['percentage'] = this.percentage;
                if (type == 0) {
                    this.summaryProgress.push(obj);
                } else {
                    this.summaryProgressMonth.push(obj);
                }
            }

            return this.summaryProgress || this.summaryProgressMonth;
        },
        getProgress() {
            this.summaryProgress = [];
		    this.SUMMARY_SIGN_IN_PROGRESS({params: { type: 0}, headers: this.headers}).then(res => {
                let cont = res.content;
                if(cont) {
                   this.progressCommon(cont, 0)
                }
            });
        },
        getProgressMonth() {
		    this.summaryProgressMonth = [];
            this.SUMMARY_SIGN_IN_PROGRESS_MONTH({params:{type: 1}, headers: this.headers}).then(res => {
                let cont = res.content;
                if(cont) {
                    this.progressCommon(cont, 1)
                }
            });
        },

        /**图表**/
        getWx() {
            let params = {};
            for(let i in this.wxDate) {
                if (!isEmpty(this.wxDate[i])) {
                    params[i] = this.wxDate[i];
                }
            }
            this.SUMMARY_WX_INDEX({params: params, headers: this.headers}).then(res => {
                res.indecies.forEach(i => {
                    this.day.push(new Date(i.day).format('MM/dd'));
                    this.uploaded.push(i.uploaded);
                    if(typeof(i.index)!="undefined"){
                        this.index.push(i.index);
                    }else{
                        this.index.push(null);
                    }
                });
                this.echartsWeixin();
            });
        },
        echartsWeixin() {
            let myChart = this.$echarts.init(document.getElementById('myChart'));
            myChart.setOption({
                tooltip : { trigger: 'axis' },
                grid: { x: 105, },
                legend: {
                    y: 'bottom',
                    data:['当前微信好友指标', '上传微信数']
                },
                xAxis : [
                    {
                        type : 'category',
                        axisLabel: {
                            rotate:45,
                        },
                        data : this.day,
                    }
                ],
                yAxis : [
                    {
                        type : 'value',
                        name : '数量',
                        axisLabel : {
                            formatter: '{value} 个'
                        }
                    }
                ],
                series : [
                    {
                        name:'上传微信数',
                        type:'bar',
                        itemStyle: {
                            normal: {
                                color: "#44bd58",
                                label : {
                                    show: true,
                                    formatter: function (val) {
                                        if(val.value == 0) {
                                            return '';
                                        }
                                    },
                                    rotate:"45"
                                },
                            }
                        },
                        data:this.uploaded,
                    },
                    {
                        name:'当前微信好友指标',
                        type:'line',
                        itemStyle: {
                            normal: {
                                color: "red",
                                lineStyle: {
                                    color: "red"
                                },
                                label : {
                                    show: true,
                                    rotate:"45"
                                },
                            }
                        },
                        data:this.index,
                    }
                ]
            });
        },
        getTimeChangeWx(val) {
            this.day = [];
            this.uploaded = [];
            this.index = [];
            if(val) {
                this.wxDate.from= val[0];
                this.wxDate.to= val[1];
                this.getWx();
            }
        },
        getSign() {
            let params = {};
            for(let i in this.signData) {
                if (!isEmpty(this.signData[i])) {
                    params[i] = this.signData[i];
                }
            }
            this.SUMMARY_SIGN_IN_TREND({params: params, headers: this.headers}).then(res => {
                if (res) {
                    res.trend.forEach(i => {
                        this.daySign.push(new Date(i.day).format('MM/dd'));
                        this.dailySignIn.push(i.dailySignIn);
                        if(typeof(i.accumulativeSignIn)!="undefined"){
                            this.accumulativeSignIn.push(i.accumulativeSignIn);
                        }else{
                            this.accumulativeSignIn.push(null);
                        }
                        if (i.level !=0) {
                            this.level.push(i);
                        }
                    });
                    this.echartsSignin();
                }
            });
        },
        echartsSignin() {
            let myChart = this.$echarts.init(document.getElementById('myChart1'));
            let data = [];
            this.level.forEach(i => {
                let day = new Date(i.day).format('MM/dd');
                let y = i.accumulativeSignIn;
                if (i.level == 1) {
                    data.push({name: '完成0.1%的转化率', xAxis: day, yAxis: y,symbolOffset:[0,'-150%']})
                }
                if (i.level == 2) {
                    data.push({name: '完成0.15%的转化率', xAxis: day, yAxis: y,symbolOffset:[0,'-150%']})
                }
                if (i.level == 3) {
                    data.push({name: '完成0.17%的转化率', xAxis: day, yAxis: y,symbolOffset:[0,'-150%']})
                }
                if (i.level == 4) {
                    data.push({name: '完成0.2%的转化率', xAxis: day, yAxis: y,symbolOffset:[0,'-150%']})
                }
                if (i.level == 5) {
                    data.push({name: '完成0.3%的转化率', xAxis: day, yAxis: y,symbolOffset:[0,'-150%']})
                }
            })
            myChart.setOption({
                tooltip : {
                    trigger: 'axis'
                },
                legend: {
                    y: 'bottom',
                    data:['累计签到人数', '签到人数']
                },
                xAxis : [
                    {
                        type : 'category',
                        axisLabel: {
                            rotate:45,
                        },
                        data : this.daySign
                    }
                ],
                yAxis : [
                    {
                        type : 'value',
                        name : '数量',
                        axisLabel : {
                            formatter: '{value} 个'
                        }
                    }
                ],
                series : [
                    {
                        name:'签到人数',
                        type:'bar',
                        barWidth: 30,
                        itemStyle: {
                            normal: {
                                color: "#44bd58",
                                label : {
                                    show: true,
                                    formatter: function (val) {
                                        if(val.value == 0) {
                                            return '';
                                        }
                                    }
                                }
                            }
                        },
                        data:this.dailySignIn
                    },
                    {
                        name:'累计签到人数',
                        type:'line',
                        itemStyle: {
                            normal: {
                                color: "red",
                                lineStyle: {
                                    color: "red"
                                },
                                label : {show: true}
                            }
                        },
                        markPoint: {
                            symbol: 'image://https://crm.xiaozhijie.com/static/image/smile.c27942a33f74602a88fb02c3820649a9.png',
                            symbolSize:[20, 20],
                            itemStyle: {
                                normal:{
                                    label: {
                                        show: true,
                                        position: 'top',
                                        color: '#000',
                                        formatter: function (val) {
                                            return val.data.name;
                                        },
                                    },
                                },
                            },
                            data: data,
                        },
                        data:this.accumulativeSignIn
                    }
                ]
            });
        },
        getTimeChangeSign(val) {
            this.daySign = [];
            this.accumulativeSignIn = [];
            this.dailySignIn = [];
            if(val) {
                let year = val.getFullYear();
                let month = val.getMonth()+1;
                if(month < 10) {
                    month = "0"+month;
                } else {
                    month = month
                }
                this.timeRangeSign = year+'-'+month+'-01';
                this.signData.from = new Date(this.timeRangeSign).getTime();
                this.signData.to = new Date(year,month,0).getTime();
                this.getSign();
            }
        },
        getTimeChange(val) {
            if(val) {
                this.dashboardData.from=val[0];
                this.dashboardData.to=val[1];
                this.getDashboard();
            }
        },

        /**风云榜**/
        commonDate() {
            let now = new Date();
            let nowTime = now.getTime();
            let day = now.getDay();
            let oneDayTime = 24*60*60*1000;
            let MondayTime = nowTime - (day-1)*oneDayTime; //当前周一日期
            let SundayTime =  nowTime + (7-day)*oneDayTime;//当前周日日期

            return [MondayTime, SundayTime];
        },
        showDate() {
            let dateStartForm = new Date(this.commonDate()[0]).format('M.d');
            let dateEndTo = new Date(this.commonDate()[1]).format('M.d');
            let dataFormat = dateStartForm+'~'+dateEndTo;
            this.entryDate = dataFormat;
            this.signDate = dataFormat;
            this.inviteDate = dataFormat;
            this.leaderData.from = this.commonDate()[0];
            this.leaderData.to = this.commonDate()[1];
            this.leaderDataSign.from = this.commonDate()[0];
            this.leaderDataSign.to = this.commonDate()[1];
            this.leaderDataInvite.from = this.commonDate()[0];
            this.leaderDataInvite.to = this.commonDate()[1];
        },
        getDateStr(date) {
            let year = date.getFullYear();
            let month = (date.getMonth()+1);
            let day = (date.getDate());
            return year+'.'+month+"."+day;
        },
        getWeekBeginAndEndArray(weekCount) {
            let beginEnd = new Array();
            let millisecond = 1000 * 60 * 60 * 24;
            let currentDate = new Date();
            currentDate = new Date(currentDate.getTime() + (millisecond * 7 * weekCount));
            let week = currentDate.getDay();
            let differDay=0;
            if(week==0){
                differDay= 6;
            }else{
                differDay=week-1;
            }
            let weekFirstDay = new Date(currentDate.getTime() - (millisecond * differDay));
            let weekLastDay = new Date(weekFirstDay.getTime() + (millisecond * 6));
            beginEnd.push(this.getDateStr(weekFirstDay));
            beginEnd.push(this.getDateStr(weekLastDay));
            return beginEnd;
        },
        addWeek(ope, name) {
            if(name == '入职风云榜') {
                if(ope === '-1') {
                    this.weekNum=this.weekNum-1;
                } else {
                    this.weekNum=this.weekNum+1;
                }
                let startDate = this.getWeekBeginAndEndArray(this.weekNum)[0];
                let endDate = this.getWeekBeginAndEndArray(this.weekNum)[1];
                let dataRange = startDate.substring(5)+'~'+endDate.substring(5);
                this.entryDate = dataRange
                this.leaderData.from = new Date(startDate).getTime();
                this.leaderData.to = new Date(endDate).getTime();
                if(new Date(this.commonDate()[1]).format('M.d') != endDate.substring(5)) {
                    this.isDisabled = false;
                } else {
                    this.isDisabled = true;
                }
                this.getLeader();
            } else if(name == '签到风云榜') {
                if(ope === '-1') {
                    this.weekNumSign=this.weekNumSign-1;
                } else {
                    this.weekNumSign=this.weekNumSign+1;
                }
                this.signDate = this.getWeekBeginAndEndArray(this.weekNumSign)[0].substring(5)+'~'+this.getWeekBeginAndEndArray(this.weekNumSign)[1].substring(5);
                this.leaderDataSign.from = new Date(this.getWeekBeginAndEndArray(this.weekNumSign)[0]).getTime();
                this.leaderDataSign.to = new Date(this.getWeekBeginAndEndArray(this.weekNumSign)[1]).getTime();
                if(new Date(this.commonDate()[1]).format('M.d') != this.getWeekBeginAndEndArray(this.weekNumSign)[1].substring(5)) {
                    this.isDisabledSign = false;
                } else {
                    this.isDisabledSign = true;
                }
                this.getLeaderSign();
            } else if(name == '邀请风云榜') {
                if(ope === '-1') {
                    this.weekNumInvite=this.weekNumInvite-1;
                } else {
                    this.weekNumInvite=this.weekNumInvite+1;
                }
                this.inviteDate = this.getWeekBeginAndEndArray(this.weekNumInvite)[0].substring(5)+'~'+this.getWeekBeginAndEndArray(this.weekNumInvite)[1].substring(5);
                this.leaderDataInvite.from = new Date(this.getWeekBeginAndEndArray(this.weekNumInvite)[0]).getTime();
                this.leaderDataInvite.to = new Date(this.getWeekBeginAndEndArray(this.weekNumInvite)[1]).getTime();
                if(new Date(this.commonDate()[1]).format('M.d') != this.getWeekBeginAndEndArray(this.weekNumInvite)[1].substring(5)) {
                    this.isDisabledInvite = false;
                } else {
                    this.isDisabledInvite = true;
                }
                this.getLeaderInvite();
            }else{}
        },
        getCommon(data, name, nameMenu, leaderboard) {
            let obj = {
                date: data,
                name: name,
                nameMenu: nameMenu,
                leaderboard: leaderboard
            };
            if(name == '入职风云榜') {
                this.Billboard.splice(0, 1, obj);
            }
            if(name == '签到风云榜') {
                this.Billboard.splice(1, 1, obj);
            }
            if(name == '邀请风云榜'){
                this.Billboard.splice(2, 2, obj);
            }
            return this.Billboard;
        },
        getLeader() {
            this.leaderData.type = 2;
            this.SUMMARY_LEADER_BOARD({params:this.leaderData, headers: this.headers}).then(res => {
                if (res.content) {
                    this.getCommon(this.entryDate, '入职风云榜', '入职人数', res.content.leaderboard)
                }
            });
        },
        getLeaderSign() {
            this.leaderDataSign.type = 1;
            this.SUMMARY_LEADER_BOARD_SIGN({params:this.leaderDataSign, headers: this.headers}).then(res => {
                if (res.content) {
                    this.getCommon(this.signDate, '签到风云榜', '签到用户数', res.content.leaderboard)
                }
            });
        },
        getLeaderInvite() {
            this.leaderDataInvite.type = 3;
            this.SUMMARY_LEADER_BOARD_INVITE({params:this.leaderDataInvite, headers: this.headers}).then(res => {
                if (res.content) {
                    this.getCommon(this.inviteDate, '邀请风云榜', '邀请注册人数', res.content.leaderboard)
                }
            });
        },
	},
	mounted() {
		this.dashboardTime(getZeroTime());
        this.getProgressMonth();
        this.getProgress();

        this.getWx();
        this.getSign();

        this.showDate();
		this.getLeader();
        setInterval(this.getLeaderSign(), 1000);
        setInterval(this.getLeaderInvite(), 2000);
	}
}