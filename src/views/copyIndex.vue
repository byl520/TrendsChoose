<!--
 * @Author: Elaine
 * @Date: 2023-06-10 11:31:07
 * @LastEditors: Elaine
 * @LastEditTime: 2023-06-13 10:56:11
 * @Description: 请填写简介
-->
<template>
    <div class="Echarts">
      <ul class="tab-tilte">
        <li :class="{ active: activenav == 0 }" @click="chooseNav(0)">W</li>
        <li :class="{ active: activenav == 1 }" @click="chooseNav(1)">M</li>
        <li :class="{ active: activenav == 2 }" @click="chooseNav(2)">3M</li>
        <li :class="{ active: activenav == 3 }" @click="chooseNav(3)">Y</li>
        <li :class="{ active: activenav == 4 }" @click="chooseNav(4)">ALL</li>
      </ul>
      <div class="box">
          <div class="boxpanel"> <span @click="prev">{{'<'}}</span><p class="currentDateStr" @click="showPicker">{{ currentDateStr }}</p><span @click="next">{{'>'}}</span></div>
        
        <van-popup v-model="showMonth" position="bottom">
          <!-- <van-datetime-picker
            type="date"
            v-model="currentDate"
            :columns-order="pikckerType"
            :title="pickerTitle"
            :formatter="formatter"
          /> -->
          <van-picker
            :title="pickerTitle"
            show-toolbar
            :columns="columns"
            @confirm="onConfirm"
            @cancel="onCancel"
            @change="onChange"
          />
        </van-popup>
  
        <van-calendar
          v-model="showWeek"
          type="range"
          @close="onConfirm"
          @confirm="onConfirm"
          color="#D1E1FB"
          :max-range="7"
          :show-confirm="false"
          :formatter="formatter"
          :min-date="minDate" :max-date="maxDate"
        />
        <div id="myChart" ref="myChart"></div>
        {{ diff }}
      </div>
    </div>
  </template>
  
  <script>
  const echarts = require("echarts/lib/echarts");
  require("echarts/lib/component/grid");
  require("echarts/lib/component/visualMap");
  require("echarts/lib/chart/line");
  require("echarts/lib/component/markLine");
  import {getWeek,getTimeEn} from './util'
  import { mockData, monthEn, QuarterEn, WeekEn,monthDay } from "./mock";
  export default {
    name: "treand",
    data() {
      return {
        activebar: "",
        activenav: 0,
        xList: [], //x坐标刻度
        showWeek: false,
        showMonth: false,
        diff:0,
        currentDate: new Date(),
        proBarOpt: {
          backgroundColor: "#fff",
          tooltip: {
                  trigger: 'axis',
                  formatter: function (params) {
                  
                      let str = params[0].name + '</br>' + 'value:' + params[0].value;
  
                      return str
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
              min:0,
              max:100
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
              min:0,
              max:100,
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
        currenDateList:[],//当前日期筛选
        myChart:'',
        monthDay,
        currentMonthDays:0
      };
    },
    computed: {
      xCol() {
        //x坐标刻度
      },
      minDate(){
          return new Date(mockData[0].date)
      },
      maxDate(){
          return new Date(mockData[mockData.length-1].date)
      }, 
    },
    watch: {
      // activenav: {
      //   handler(val) {
      //     this.fixDate(val);
      //     this.filterTime(val)
      //     switch (val) {
      //       case 2:
      //         this.pikckerSort = ["month", "year"];
      //         this.pikckerType = "month-year";
      //         this.pickerTitle = "Quarter";
      //         break;
      //       case 3:
      //         this.pikckerSort = ["year"];
      //         this.pikckerType = "month-year";
      //         this.pickerTitle = "Year";
      //         break;
      //       case 4:
      //         this.pikckerSort = ["year"];
      //         this.pickerTitle = "All";
      //         break;
      //     }
      //   },
      //   immediate: true,
      //   deep: true,
      // },
    },
    mounted() {
      // this.drawLine();
      this.getMonth()
    },
    created(){
    },
    methods: {
      chooseNav(val){
          this.activenav=val
          this.filterTime(val)
      },
      getMonth(){
      let date = new Date();
      let month = date.getMonth()+1;   //月份从0开始获取，所以需要加1
      let year = date.getYear();
      
      let d = new Date(year,month,0);    
      let day = d.getDate();
      let tempArr=[]
      for(let i=0;i<day;i++){
          if(i<10){
              tempArr.push(Number(0+i))
          }else{
              tempArr.push(Number(i))
          }
      }
      this.$nextTick(()=>{
          this.$set(this,'currentMonthDays',tempArr)
      })
      },
      prev(){
      },
      next(){
      },
      filterTime(type){
          let {monday,sunday,month,nowYear}=getWeek()
          this.currenDateList=[]
          if(type==0){//周
              let timerrang= this.mockData.filter(item=>{
              return (Date.parse(new Date(monday)) < Date.parse(new Date(item.date)) || Date.parse(new Date(monday))== Date.parse(new Date(item.date)))&&(Date.parse(new Date(sunday)) >  Date.parse(new Date(item.date)) || Date.parse(new Date(sunday))== Date.parse(new Date(item.date)))
              })
              this.currenDateList=timerrang.map(e=>{
                  return [getTimeEn(e.date).week,e.value?e.value:undefined]
              })
              this.pickerTitle = "Week";
              this.$set(this.proBarOpt.xAxis,'data',this.WeekEn)//x轴
              this.currentDateStr=getTimeEn(monday).month+' '+getTimeEn(monday).day+'-'+getTimeEn(sunday).day+','+getTimeEn(monday).year
          }
          if(type == 1){//月
              this.currenDateList=this.mockData.filter(e=>e.month==month).map(e=>{
                  console.log(getTimeEn(e.date).day,'?')
                  return [getTimeEn(e.date).day,e.value?e.value:undefined]
              })
              this.pickerTitle = "Month";
              this.$set(this.proBarOpt.xAxis,'data',this.currenDateList.map(e=>e[0]))//x轴
              this.currentDateStr=getTimeEn(monday).month+' '+getTimeEn(monday).year
          }
          if(type == 2){//季度
            let temparrQ= this.QuarterEn.filter(e=>e.value.includes(month)).map(i=>i.arr)
            let temparr=this.QuarterEn.filter(e=>e.value.includes(month)).map(i=>i.value)
            this.currentDateStr=temparr[0].toString()+' '+getTimeEn(monday).year
            this.pickerTitle = "Quarter";
            console.log(temparrQ,'temparrQ')
            this.$set(this.proBarOpt.xAxis,'data',...temparrQ)//x轴
            this.currenDateList=this.mockData.filter(e=>{ 
              return temparr[0].indexOf(e.month)
              }).map(e=>{
                  return [getTimeEn(e.date).month,e.value?e.value:undefined]
              })
            }
           
          if(type == 3){//年
              this.$set(this.proBarOpt.xAxis,'data',[getTimeEn(monday).year])
              this.currenDateList=this.mockData.filter(e=>e.year==nowYear).map(e=>{
                  return [nowYear,e.value?e.value:undefined]
              })
              this.currentDateStr=getTimeEn(monday).year
          }
          let ones=this.currenDateList.map(e=>e[1]).map(e=>e?e:0)
          console.log(this.currenDateList.map(e=>e[1]),'currenDateList')
          let maxNum=Math.max(...ones)
          // let minNum=Math.min(...this.currenDateList.map(e=>e[1]))
          console.log(maxNum,'maxNum')
          // Math.max(...arr)//动态最大值
          this.$nextTick(()=>{
             this.proBarOpt.yAxis[0].max=maxNum
             this.proBarOpt.yAxis[0].min=0
              this.$set(this.proBarOpt,'series',{
              type: "line", //折线图
              data:this.currenDateList,
              yAxisIndex: 0,
              connectNulls: true,
              smooth: "none", //拐点样式
              lineStyle: {
                width: 1,
                type: "line",
                smooth: true,
              },
            },)
            this.drawLine()
          })
      },
      fixDate(type) {
        let yearlist = [...new Set(this.mockData.map((e) => e.year))];
        let monthList = [...new Set(this.mockData.map((e) => Number(e.month)))];
        if(type==0){
         
         }
        if (type == 1) {
          //月份年
          if (monthList && monthList.length) {
            this.columns = [];
            let tempArr = [];
            this.monthEn.forEach((e, i) => {
              tempArr.push({
                text: e,
                disabled: monthList.includes(Number(i + 1)) ? false : true,
              });
            });
            this.columns = [{ values: tempArr }, { values: yearlist }];
          }
        }
        if (type == 2) {
          //季节,年
          this.columns = [];
          let tempArr = [];
          this.QuarterEn.forEach((e, i) => {
            tempArr.push({
              text: e.text,
              disabled: monthList.some((r) => e.value.includes(r)) ? false : true,
            });
          });
          this.columns = [{ values: tempArr }, { values: yearlist }];
        }
        if (type == 3 || type == 4) {
          this.columns = yearlist;
        }
      },
      onCancel() {},
      onChange() {},
      showPicker() {
        let that = this;
        if (that.activenav == 0) {
          that.showWeek = true;
        } else {
          that.showMonth = true;
        }
      },
      onConfirm(date) {
          const [start, end] = date;
          if(start&&end){
              this.showWeek=false
          }
          console.log(date,start, end)
      },
      drawLine() {
          let that = this
        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(document.getElementById("myChart"));
        // 绘制图表
        myChart.setOption(this.proBarOpt,true);
        myChart.on('dataZoom', function (params) {
          let start = params.batch[0].start
              let end = params.batch[0].end
              let diff = end - start
              that.$nextTick(()=>{
                  that.diff=diff
              })
              
              // diff小于40，算作‘缩放到一定程度’
              if (diff < 30) {//week
              //   let option = myChart.getOption()
              //   option.xAxis[0].data= this.WeekEn
                this.activenav=0
              //   myChart.clear()
              //   myChart.setOption(option, true)
              }
              if (diff >= 30) {//month
                  that.$nextTick(()=>{
                      that.$set(that,'activenav',1)
                  })
              //   let option = myChart.getOption() 
              //   myChart.clear()
              
              //   myChart.setOption(option, true)
              }
              if(31<diff<70){//季节
                  that.$nextTick(()=>{
                      that.$set(that,'activenav',2)
                  })
              //   let option = myChart.getOption() 
              //   myChart.clear()
              //   myChart.setOption(option, true)
              }
              if(80<diff){//年
                  that.$nextTick(()=>{
                      that.$set(that,'activenav',3)
                  })
              //   let option = myChart.getOption() 
              //   myChart.clear()
              //   myChart.setOption(option, true)
              }
      })
      },
      formatter(day) {
        let isHasData = false;
        let dayTimestamp = Date.parse(new Date(day.date));
     
        this.mockData.forEach((item)=>{
          if(dayTimestamp==Date.parse(new Date(item.date)) * 1000){
              day.className = "addDot";
          }
       })
        return day;
      },
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
    width: 100%;
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
  .boxpanel{
      display: flex;
      justify-content: center;
      align-items: center;
  }
  </style>
  <style scoped lang="scss">
  //有数据日期加点
  ::v-deep(.addDot) {
    position: relative;
  }
  ::v-deep(.addDot::after) {
    position: absolute;
    content: "";
    width: 12px;
    height: 12px;
    top: 26Px;
    left: 45px;
    border-radius: 50%;
    background-color: #0084ff;
  }
  //当天日期
  ::v-deep(.calendarToday) {
    position: relative;
    color: #fff;
    // font-size: 0;
    // z-index: 1;
  }
  ::v-deep(.calendarToday::before) {
    width: 35Px;
    height: 35Px;
    line-height: 35Px;
    position: absolute;
    top: 0;
    content: "今";
    text-align: center;
    font-size: 30px;
    border-radius: 50%;
    background-color: #ffae34;
    // z-index: -1;
  }
  //当天日期并且有数据
  ::v-deep(.addDot_calendarToday::after) {
    position: absolute;
    content: "";
    width: 12px;
    height: 12px;
    top: 26Px;
    left: 45px;
    border-radius: 50%;
    background-color: #fff;
    z-index: 4;
  }
  ::v-deep(.addDot_calendarToday::before) {
    width: 35Px;
    height: 35Px;
    line-height: 35Px;
    position: absolute;
    top: 0;
    content: "今";
    text-align: center;
    font-size: 30px;
    border-radius: 50%;
    color: #fff;
    background-color: #ffae34;
  }
  //有数据并且被选中
  ::v-deep(.addDot_Select::after) {
    position: absolute;
    content: "";
    width: 12px;
    height: 12px;
    top: 26Px;
    left: 45px;
    border-radius: 50%;
    background-color: #fff;
    z-index: 3;
  }
  
  </style>