/*
 * @Author: Elaine
 * @Date: 2023-06-10 11:27:54
 * @LastEditors: Elaine
 * @LastEditTime: 2023-06-10 11:51:06
 * @Description: 请填写简介
 */
//vue.config.js
const webpack = require("webpack")
module.exports = {
    assetsDir: 'static',
    publicPath: process.env.NODE_ENV == 'development' ? '/':'/' ,
    outputDir: './dist',
    indexPath: 'index.html',
    productionSourceMap: false,
    lintOnSave: false,
    filenameHashing: true,
}