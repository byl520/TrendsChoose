/*
 * @Author: Elaine
 * @Date: 2023-06-10 11:30:43
 * @LastEditors: Elaine
 * @LastEditTime: 2023-06-10 11:30:49
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
    }]
})