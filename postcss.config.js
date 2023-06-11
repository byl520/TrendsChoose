/*
 * @Author: Elaine
 * @Date: 2023-06-10 11:47:07
 * @LastEditors: Elaine
 * @LastEditTime: 2023-06-10 11:49:53
 * @Description: 请填写简介
 */
module.exports = {
    plugins: {
        'postcss-pxtorem': {
            rootValue({ file }) {
                return file.indexOf('vant') !== -1 ? 37.5 : 75;
            },
            propList: ['*'],
        },
    },
};