/*
 * @Author: Elaine
 * @Date: 2023-06-12 14:18:12
 * @LastEditors: Elaine
 * @LastEditTime: 2023-06-12 17:33:32
 * @Description: 请填写简介
 */
export function getWeek(){
    let now = new Date();
    let nowTime = now.getTime();
    let day = now.getDay();
    let month= now.getMonth()+1
    let nowYear = now.getYear()
    nowYear += (nowYear < 2000) ? 1900 : 0;
    let oneDayTime = 24*60*60*1000;
    //显示周一
    let MondayTime = nowTime - (day-1)*oneDayTime;
    //显示周日
    let SundayTime = nowTime + (7-day)*oneDayTime;
    //初始化日期时间
    let monday = Date.parse(new Date(MondayTime));
    let sunday = Date.parse(new Date(SundayTime));
    
    return {monday:formatTime(monday),sunday:formatTime(sunday),month,nowYear}
}
export function getTimeEn(str){
  let time= new Date(str).toDateString().split(' ')
  // "Sat Jun 20 2020"
  console.log(str)
  return {year:time[3],day:time[2],month:time[1],week:time[0]}
}
export function formatTime(str){
	let time = new Date(str);
	let y = time.getFullYear();
	let m = time.getMonth()+1;
	let d = time.getDate();
	//let h = time.getHours();
	//let mm = time.getMinutes();
	//let s = time.getSeconds();
	return y+'/'+(m)+'/'+(d);
}
/**
 * 获取上周、本周、上月、本月、上季度、本季度的开始日期、结束日期 start
 * 亲测无bug。获取上月开始结束日期考虑了年份的变化
 */
var now = new Date(); //当前日期
var nowDayOfWeek = now.getDay()-1; //今天本周的第几天
var nowDay = now.getDate(); //当前日
var nowMonth = now.getMonth(); //当前月
var nowYear = now.getYear(); //当前年
nowYear += (nowYear < 2000) ? 1900 : 0; //
var lastMonthDate = new Date(); //上月日期
lastMonthDate.setDate(1);
lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);
var lastYear = lastMonthDate.getYear();
var lastMonth = lastMonthDate.getMonth();
//格式化日期：yyyy-MM-dd
function formatDate(date) {
    var myyear = date.getFullYear();
    var mymonth = date.getMonth() + 1;
    var myweekday = date.getDate();
    if (mymonth < 10) {
        mymonth = "0" + mymonth;
    }
    if (myweekday < 10) {
        myweekday = "0" + myweekday;
    }
    return (myyear + "-" + mymonth + "-" + myweekday);
}


//获得某月的天数
function getMonthDays(myMonth) {
    var monthStartDate = new Date(nowYear, myMonth, 1);
    var monthEndDate = new Date(nowYear, myMonth + 1, 1);
    var days = (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24);
    return days;
}
//获得本季度的开始月份
function getQuarterStartMonth() {
    var quarterStartMonth = 0;
    if (nowMonth < 3) {
        quarterStartMonth = 0;
    }
    if (2 < nowMonth && nowMonth < 6) {
        quarterStartMonth = 3;
    }
    if (5 < nowMonth && nowMonth < 9) {
        quarterStartMonth = 6;
    }
    if (nowMonth > 8) {
        quarterStartMonth = 9;
    }
    return quarterStartMonth;
}


//获得本周的开始日期
function getWeekStartDate() {
    var weekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek);
    return formatDate(weekStartDate);
}
//获得本周的结束日期
function getWeekEndDate() {
    var weekEndDate = new Date(nowYear, nowMonth, nowDay + (6 - nowDayOfWeek));
    return formatDate(weekEndDate);
}
//获得上周的开始日期
function getLastWeekStartDate() {
    var weekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek - 7);
    return formatDate(weekStartDate);
}
//获得上周的结束日期
function getLastWeekEndDate() {
    var weekEndDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek - 1);
    return formatDate(weekEndDate);
}
//获得本月的开始日期
function getMonthStartDate() {
    var monthStartDate = new Date(nowYear, nowMonth, 1);
    return formatDate(monthStartDate);
}
//获得本月的结束日期
function getMonthEndDate() {
    var monthEndDate = new Date(nowYear, nowMonth, getMonthDays(nowMonth));
    return formatDate(monthEndDate);
}
//获得上月开始时间
function getLastMonthStartDate() {
    if(lastMonth==11){
        var lastMonthStartDate = new Date(nowYear-1, lastMonth, 1);
    }else{
        var lastMonthStartDate = new Date(nowYear, lastMonth, 1);
    }
    return formatDate(lastMonthStartDate);
}
//获得上月结束时间
function getLastMonthEndDate() {
    if(lastMonth==11){
        var lastMonthEndDate = new Date(nowYear-1, lastMonth, getMonthDays(lastMonth));
    }else{
        var lastMonthEndDate = new Date(nowYear, lastMonth, getMonthDays(lastMonth));
    }
    return formatDate(lastMonthEndDate);
}
//获得本季度的开始日期
function getQuarterStartDate() {
    var quarterStartDate = new Date(nowYear, getQuarterStartMonth(), 1);
    return formatDate(quarterStartDate);
}
//获得本季度的结束日期
function getQuarterEndDate() {
    var quarterEndMonth = getQuarterStartMonth() + 2;
    var quarterStartDate = new Date(nowYear, quarterEndMonth,
            getMonthDays(quarterEndMonth));
    return formatDate(quarterStartDate);
}
/**
 * 获取时间 end
 */