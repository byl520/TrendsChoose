/*
 * @Author: Elaine
 * @Date: 2023-06-10 11:30:43
 * @LastEditors: Elaine
 * @LastEditTime: 2023-06-13 20:41:31
 * @Description: 请填写简介
 */
//index.js
import Vue from "vue"
import Router from "vue-router"

Vue.use(Router)
export default new Router({
    mode:"hash",
    base:process.env.BASE_URL,
    routes:[{
        path:'/',
        name:'Index',
        component :()=> import('@/views/index.vue'),
        meta:{
            title:'首页'
        }
    },{
        path:'/mock',
        name:'Mock',
        component :()=> import('@/views/mock.vue'),
        meta:{
            title:'首页2'
        }
    },
    {
        path:'/charts',
        name:'charts',
        component :()=> import('@/views/charts.vue'),
        meta:{
            title:'charts'
        }
    },
    {
        path:'/demo',
        name:'demo',
        component :()=> import('@/views/demo.vue'),
        meta:{
            title:'demo'
        }
    }
]
})