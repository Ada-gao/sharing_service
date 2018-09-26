'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: "http://10.9.70.235:9999" // 市场活动本地开发机
  // BASE_API:"http://10.9.60.141:5050" // 服务器
})