<!--
 * @Author: Elaine
 * @Date: 2023-06-13 17:15:38
 * @LastEditors: Elaine
 * @LastEditTime: 2023-06-13 17:17:36
 * @Description:
-->
<template>
  <div class="Echarts">
  <div id="main"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      xData: [
        "一公司",
        "石化公司",
        "四公司",
        "燃供公司",
        "港服公司",
        "太平洋公司",
        "联盟国际公司",
        "环球滚装公司",
        "滚装码头",
        "远航矿石",
        
      ],
      y1Data: [
        18203, 23489, 29034, 104970, 131744, 154854, 256582, 356984, 541284,
        125487,
      ],
    };
  },
  methods: {
    draw() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = this.$echarts.init(document.getElementById("main"));
      // 大于一屏幕4个时，计算option个数及对应属性（timeLineData、series、xData......）进行合并
      let timeLineData = [];
      let optionArr = [];
      let len = Math.ceil(this.xData.length / 5);
      for (var i = 1; i <= len; i++) {
        timeLineData.push(i);
        let obj = {
          title: {
            text: "设备第" + i + "页",
          },
          series: [
            { data: this.y1Data.splice(0, 5) }, // 系列一的数据
          ],
          xAxis: {
            type: "category",
            data: this.xData.splice(0, 5),
          },
        };
        optionArr.push(obj);
      }
      console.log("optionArr", optionArr);
      var option = {
        baseOption: {
          timeline: {
            // `timeline.data` 中的每一项，对应于 `options`
            show:false,
            autoPlay: true,
            bottom: -23,
            controlStyle: {
              show: false,
            },
            data: timeLineData,
          },
          title: {
            text: "设备异常图",
          },
 
          grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true,
          },
          xAxis: {
            type: "category",
            data: this.xData,
          },
          yAxis: {
            type: "value",
            boundaryGap: [0, 0.01],
          },
 
          series: [
            {
              name: "高温",
              type: "line",
              data: this.y1Data,
              barWidth: "15%",
              areaStyle:{},
              smooth:true,
              label: {
                show: true,
                position: "top",
              },
            },
          ],
        },
        options: optionArr,
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
      window.addEventListener("resize", function () {
        myChart.resize();
      });
    },
  },
  mounted() {
    this.draw();
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
  #main {
    width: 100%;
    height: calc(60vh - 140px);
  }
</style>