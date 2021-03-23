import { IConfig } from 'umi-types'
import { resolve } from 'path'
import routes from './src/routes'
// @ts-ignore
import MomentTimezoneDataPlugin from 'moment-timezone-data-webpack-plugin'

// ref: https://umijs.org/config/
const config: IConfig = {
  title: '大杂院',
  routes,
  antd: {},
  dva: { skipModelValidate: true },
  dynamicImport: {
   // loading: '@/components/Loader/index',
  },
  targets: {
    // { chrome: 49, firefox: 45, safari: 10, edge: 13, ios: 10 }
    ie: 11,
  },
  hash: true,
  ignoreMomentLocale: true,
  alias: {
    themes: resolve(__dirname, './src/themes'),
    components: resolve(__dirname, './src/components'),
    customerHooks: resolve(__dirname, './src/customerHooks'),
    utils: resolve(__dirname, './src/utils'),
    models: resolve(__dirname, './src/models'),
  },
  extraBabelPlugins: [
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    //['transform-remove-console', { 'exclude': ['error', 'warn'] }], //打包去除debugger及console.log
    "jsx-control-statements",
  ],
  chainWebpack(config) {
    /***
     *  优化moment-timezone里的latest.json
     *  matchZones 保留匹配到的时区的数据
     *  startYear 不处理该年之前的日期
     *  endYear 不处理该年之后的日期
     **/
    config.plugin('moment-timezone-data-webpack-plugin').use(MomentTimezoneDataPlugin, [
      {
        matchZones: [
          'Asia/Shanghai',
          'Asia/Chungking',
          'Asia/Harbin',
          'Asia/Chongqing',
          'Asia/PRC',
        ],
      },
    ])
  },
  // proxy: {
  //   '/api/__': {
  //     target: 'http://api-puck.d.xyz/',
  //     changeOrigin: false,
  //     pathRewrite: { '^/api': '/' },
  //   },
  // },
}

export default config
