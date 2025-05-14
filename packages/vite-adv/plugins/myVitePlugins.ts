import logger from '@lbd/webpack-adv/utils/logger'
import type { Plugin } from 'vite'
import type { InputOptions, NormalizedInputOptions } from 'rollup'

export default function myVitePlugin(options = {}) {
  return {
    name: 'my-vite-plugin',
    enforce: 'pre',
    apply: 'build',

    /* --- 通用钩子（继承自 Rollup) --- */
    options(inputOptions: InputOptions) {
      inputOptions.input
      logger.log('options', '修改 Rollup 输入选项')
    },
    buildStart(options: NormalizedInputOptions) {
      logger.log('buildStart', '构建开始时执行')
    },
    resolveId(source, importer, options) {
      // 解析模块路径
      logger.log('resolveId', '解析模块路径')
    },
    load(id) {
      // 加载模块内容
      logger.log('load', '加载模块内容')
    },
    transform(code, id) {
      // 转换模块代码
      logger.log('transform', '转换模块代码')
    },
    generateBundle(options, bundle) {
      // 生成 bundle 前执行
      logger.log('generateBundle', '生成 bundle 前执行')
    },
    buildEnd(error) {
      // 构建结束时执行
      logger.log('buildEnd', '构建结束时执行')
    },

    /* --- Vite 特有钩子 --- */
    config(config) {
      // 修改 Vite 配置
      logger.log('config', '修改 Vite 配置')
    },
    configResolved(resolvedConfig) {
      // 配置解析完成后执行
      logger.log('configResolved', '配置解析完成后执行')
    },
    configureServer(server) {
      // 配置开发服务器
      logger.log('configureServer', '配置开发服务器')
    },
    transformIndexHtml(html) {
      // 转换 HTML
      logger.log('transformIndexHtml', '转换 HTML')
    },
    handleHotUpdate(ctx) {
      // 处理 HMR 更新
      logger.log('handleHotUpdate', '处理 HMR 更新')
    },
  } as Plugin
}
