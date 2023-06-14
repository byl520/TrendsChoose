<!--
 * @Author: Elaine
 * @Date: 2023-06-10 11:31:07
 * @LastEditors: Elaine
 * @LastEditTime: 2023-06-13 16:57:25
 * @Description: 请填写简介
-->
<template>
  <div class="Echarts">
    <button @click="pushDate" id="myChart">{{ '向ios发送数据'+activenav+'，客户端返回：'+pullDateStr }}</button>
    <span>{{ pullDateStr }}</span>
    <div>{{ '安卓:'+isAndroid }}</div>
    <div>{{ 'Ios:'+isIos }}</div>
  </div>
</template>

<script>
const echarts = require("echarts/lib/echarts");
require("echarts/lib/component/grid");
require("echarts/lib/component/visualMap");
require("echarts/lib/chart/line");
require("echarts/lib/component/markLine");
import { getWeek, getTimeEn } from "./util";
import { mockData, monthEn, QuarterEn, WeekEn, monthDay } from "./mock";
export default {
  name: "treand",
  data() {
    return {
      activebar: "",
      activenav: 0,
      isChange: false,
      xList: [], //x坐标刻度
      showWeek: false,
      showMonth: false,
      diff: 0,
      currentDate: new Date(),
      proBarOpt: {
        backgroundColor: "#fff",
        tooltip: {
          trigger: "axis",
          formatter: function (params) {
            let str = params[0].name + "</br>" + "value:" + params[0].value;

            return str;
          },
        },
        color: ["#0A79C3", "#EBF6FE"],
        grid: {
          //网格
          left: 10,
          containLabel: true,
          bottom: 10,
          top: 30,
          right: 10,
        },
        xAxis: {
          type: "category",
          axisTick: {
            show: false,
            alignWithLabel: true,
            length: 0,
            min: 0,
            max: 100,
          },
          axisLabel: {
            //x坐标轴刻度标签
            showMinLabel: true, //是否显示最小 tick 的 label
            showMaxLabel: true,
            interval: 0, // 0 强制显示所有标签。1隔一个标签显示一个标签2，隔两标签显示1个标签，以此类推
            rotate: -90, //刻度标签旋转的角度，在类目轴的类目标签显示不下时可通过旋转防止标签重叠。-90 度到 90 度（默认0）
          },
          nameTextStyle: {
            fontFamily: "PingFangSC-Light, sans-serif",
            color: "#858585",
            fontSize: 24,
          },
          axisLine: {
            show: true, //显示坐标轴线
            onZero: true,
            lineStyle: {
              color: "#E5E5E7",
              type: "dashed",
            },
          },
          data: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        },
        yAxis: [
          {
            min: 0,
            max: 100,
            type: "value",
            name: "kg",
            nameLocation: "middle",
            position: "right",
            nameTextStyle: {
              color: "#858585 ",
              align: "right",
              fontSize: 28,
              fontFamily: "PingFangSC-Light, sans-serif",
            },
            nameGap: 93,
            scale: false, //显示零刻度
            axisLabel: {
              formatter: "{value} ",
              color: "#858585 ",
            },
            axisTick: {
              //坐标轴刻度
              show: false,
              length: 93,
            },
            axisLine: {
              show: true, //显示坐标轴线
              lineStyle: {
                color: "#E5E5E7",
                type: "dashed",
              },
            },
            splitLine: {
              //坐标轴在 grid 区域中的分隔区
              show: false,
              lineStyle: {
                type: "dashed",
                color: "#E5E5E7",
              },
            },
            splitArea: {
              show: true,
              areaStyle: {
                color: ["#EBF6FE", "#fff"],
              },
            },
          },
          {
            splitLine: { show: false },
            type: "value",
          },
        ],
        dataZoom: [
          //缩放
          {
            type: "slider", //对应第一个y轴
            show: false,
            start: 0, //%
            end: 100,
            // handleSize: 8
          },
          {
            type: "inside", //区域缩放
            start: 0,
            end: 100,
          },
          {
            type: "slider",
            show: false,
            yAxisIndex: 1, //第二个y轴
            filterMode: "empty",
            width: 12,
            height: "70%",
            // handleSize: 8,
            showDataShadow: false,
            left: "93%",
          },
        ],
        series: [
          {
            type: "line", //折线图
            data: [100, 15, 1, 3, 0, 5, 150, 5, 0, 7],
            yAxisIndex: 0,
            connectNulls: true,
            smooth: "none", //拐点样式
            lineStyle: {
              width: 1,
              type: "line",
              smooth: true,
            },
          },
        ],
      },
      mockData,
      monthEn,
      QuarterEn,
      WeekEn,
      pikckerSort: ["month", "year"],
      pikckerType: "month-year",
      pickerTitle: "Month",
      currentDateStr: "May 14-20,2023",
      columns: [],
      currenDateList: [], //当前日期筛选
      myChart: "",
      monthDay,
      currentMonthDays: 0,
      response:'',
      pullDateStr:''
    };
  },
  mounted() {
    window.pullDate=this.pullDate
  },
  computed:{
    isIos(){
      let u = navigator.userAgent
      return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
    },
    isAndroid(){
      let u = navigator.userAgent
      return u.indexOf('Android') > -1 || u.indexOf('Linux') > -1 //安卓
    }
  },
  created() {
   },
  methods: {
    pushDate(){
      let that = this
      that.activenav++
      if(that.isAndroid){//showMobile
        window.android.showMobile(that.activenav)
      }
      if(that.isIos){//showMobile
        window.webkit.messageHandlers.showMobile.postMessage(that.activenav)
      }
      
    },
    pullDate(str) {//从ios拿数据
      this.pullDateStr=str
    },
    decodeMethod(data){
        this.pullDateStr=data
    },
    changebgColor() {
      this.isChange = !this.isChange;
    },
    callJsFunction(str) {
        this.msg = "我通过原生方法改变了文字" + str
        return "js调用成功"
	},
    showAndroidToast() {
        $App.showToast("哈哈，我是js调用的")
    }
  },
};
</script>

<style lang="scss" scoped>
.Echarts {
  display: flexbox;
  width: 100%;
  height: 100%;
  background-color: #eff4f8;
}
#myChart {
  width: 200px;
  margin: 0 auto;
  height: calc(60vh - 140px);
}
.tab-tilte {
  background-color: #eff4f8;
  width: 100%;
  font-family: PingFangSC-Semibold;
  letter-spacing: 0;
  display: flex;
  box-sizing: border-box;
  padding: 30px;
  height: 150px;
}
.tab-tilte li {
  flex: 1;
  list-style: none;
  float: left;
  font-size: 28px;
  font-weight: 600;
  color: #333333;
  line-height: 42px;
  text-align: center;
  width: 130px;
  height: 59px;
  background-color: none;
  border-radius: 37px;
  line-height: 59px;
}
.tab-tilte .active {
  color: #fff;
  background-color: #0a79c3;
}
.currentDateStr {
  height: 39px;
  font-size: 28px;
  font-family: PingFangSC-Semibold, sans-seri;
  font-weight: 600;
  color: #618aa5;
  line-height: 42px;
  text-align: center;
  margin: 0 20px;
}
.box {
  background-color: #fff;
}
.boxpanel {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>