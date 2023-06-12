<template>
    <div class="box1">
      <div class="wrap">
        <ul id="echart_box">
          <li v-for="(item, index) in loadData" :key="index" :id="`echart_dom${index+1}`">加载中...</li>
        </ul>
      </div>
    </div>
    </template>
     
    <script>
    const echarts = require("echarts/lib/echarts");
require("echarts/lib/component/grid");
require("echarts/lib/component/visualMap");
require("echarts/lib/chart/line");
require("echarts/lib/component/markLine");
    export default {
      data() {
        return {
          boxStyle: {
            width: "9800px",
            overflowX: 'scroll'
          },
          loadCount: 0,
          // 已加载数据
          loadData: [{
              day: 1,
              show: true,
              info: {
                names: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
                counts: [5, 20, 36, 10, 10, 20]
              }
            },
            {
              day: 2,
              show: true,
              info: {
                names: ["衬衫1", "羊毛衫1", "雪纺衫1", "裤子1", "高跟鞋", "袜子"],
                counts: [5, 20, 36, 10, 10, 20]
              }
            },
            {
              day: 3,
              show: true,
              info: {
                names: ["衬衫2", "羊毛衫2", "雪纺衫2", "裤子2", "高跟鞋", "袜子"],
                counts: [5, 20, 36, 10, 10, 20]
              }
            },
            {
              day: 4,
              show: true,
              info: {
                names: ["衬衫3", "羊毛衫3", "雪纺衫3", "裤子", "高跟鞋", "袜子"],
                counts: [5, 20, 36, 10, 10, 20]
              }
            },
          ],
        }
      },
      mounted() {
        this.drawLine()
        console.log(document.body.clientWidth)
        let listenerDom = document.getElementById('echart_box')
        this.listenTouchDirection(listenerDom, false, false, this.rightCallback, false, this.leftCallback)
      },
      methods: {
        clientW() {
          return document.body.clientWidth
        },
        drawLine() {
          if (!this.loadData.length || this.loadData.length < this.loadCount + 1) {
            return false
          }
          this.loadCount += 1
          if (!!this.loadCount) {
            this.boxStyle.width += 980
          }
          let listenerDom = document.getElementById(`echart_dom${this.loadCount}`)
          let baseChart = echarts.init(listenerDom)
          baseChart.setOption({
            title: {
              text: `echarts ${this.loadCount}`
            },
            tooltip: {},
            xAxis: {
              data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
            },
            yAxis: {},
            series: [{
              name: '销量',
              type: 'bar',
              data: [5, 20, 36, 10, 10, 20]
            }]
          })
        },
        leftCallback() {
          this.drawLine()
          console.log('is left')
        },
        rightCallback() {
          console.log('is right')
        },
        addHandler(element, type, handler) {
          if (element.addEventListener)
            element.addEventListener(type, handler, false);
          else if (element.attachEvent) element.attachEvent("on" + type, handler);
          else element["on" + type] = handler;
        },
        removeHandler(element, type, handler) {
          if (element.removeEventListener)
            element.removeEventListener(type, handler, false);
          else if (element.detachEvent) element.detachEvent("on" + type, handler);
          else element["on" + type] = handler;
        },
        /**
         * @param target 要绑定监听的目标元素
         * @param isPreventDefault 是否屏蔽掉触摸滑动的默认行为
         * @param upCallback 向上滑动的监听回调（若不关心，可以不传，或传false）
         * @param rightCallback 向右滑动的监听回调（若不关心，可以不传，或传false）
         * @param downCallback 向下滑动的监听回调（若不关心，可以不传，或传false）
         * @param leftCallback 向左滑动的监听回调（若不关心，可以不传，或传false）*/
        listenTouchDirection(target, isPreventDefault, upCallback, rightCallback, downCallback, leftCallback) {
          this.addHandler(target, "touchstart", handleTouchEvent);
          this.addHandler(target, "touchend", handleTouchEvent);
          this.addHandler(target, "touchmove", handleTouchEvent);
          var startX;
          var startY;
     
          function handleTouchEvent(event) {
            switch (event.type) {
              case "touchstart":
                startX = event.touches[0].pageX;
                startY = event.touches[0].pageY;
                break;
              case "touchend":
                let spanX = event.changedTouches[0].pageX - startX;
                let spanY = event.changedTouches[0].pageY - startY;
                if (Math.abs(spanX) > Math.abs(spanY)) { //认定为水平方向滑动
                  if (spanX > 30) { //向右
                    if (rightCallback) {
                      rightCallback();
                    }
     
                  } else if (spanX < -30) { //向左
                    if (leftCallback) {
                      leftCallback();
                    }
                  }
                } else { //认定为垂直方向滑动
                  if (spanY > 30) { //向下
                    if (downCallback) {
                      downCallback();
                    }
                  } else if (spanY < -30) { //向上
                    if (upCallback) {
                      upCallback();
                    }
                  }
                }
                break;
              case "touchmove": //阻止默认行为
                if (isPreventDefault) event.preventDefault();
                break;
            }
          }
        }
      }
    }
    </script>
     
    <style>
    * {
      margin: 0;
      padding: 0;
    }
     
    li {
      list-style: none;
    }
     
    .box1 {
      width: 980px;
      height: 600px;
      overflow: hidden;
      background-color: skyblue;
    }
     
    .box1 .wrap {
      width: 980px;
      height: 606px;
      overflow-x: scroll;
      overflow-y: hidden;
    }
     
    .box1 .wrap ul {
      width: 4000px;
      display: flex;
    }
     
    .box1 .wrap ul li {
      flex: 1;
      width: 980px;
      height: 600px;
      box-sizing: border-box;
    }
    </style>