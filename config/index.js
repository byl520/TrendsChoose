/*
 * @Author: Elaine
 * @Date: 2023-06-13 17:57:35
 * @LastEditors: Elaine
 * @LastEditTime: 2023-06-13 18:01:09
 * @Description: 请填写简介
 */
var  path = require( 'path' )
 
module.exports = {
   build: {
     index: path.resolve(__dirname,  'dist/index.html' ),
     assetsRoot: path.resolve(__dirname,  'dist' ),
     assetsSubDirectory:  'static' ,
     assetsPublicPath:  '/' ,
     productionSourceMap:  true
   },
   dev: {
     port: 8080,
     proxyTable: {}
   }
}