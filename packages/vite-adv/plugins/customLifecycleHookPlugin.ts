import { logger } from '@lbd/shared'
import type { Plugin } from 'vite'
import type { InputOptions, NormalizedInputOptions, LoadResult } from 'rollup'

export default function customLifecycleHookPlugin(options = {}) {
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
      0 && logger.log('resolveId', '解析模块路径')

      if (source.endsWith('HelloWorld.vue')) {
        logger.log('resolveId', 'HelloWorld.vue')
      }
    },

    async load(id, options): Promise<LoadResult> {
      // 加载模块内容
      // 在 load 中返回模块的字符串内容，Vite 会将其视为模块代码
      0 &&
        logger.log('load', '解析模块路径', {
          id,
        })

      if (id.endsWith('HelloWorld.vue')) {
        logger.log('load', '加载模块内容', {
          id,
          options,
        })
      }
    },

    transform(code, id) {
      // 转换模块代码
      logger.log('transform', '转换模块代码')

      if (id.endsWith('HelloWorld.vue')) {
        logger.log('transform', '加载模块内容', {
          code,
          id,
        })
      }
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
    config(config, env) {
      logger.log('config', '可修改 Vite 配置', config)

      return {
        // 合并或覆盖配置
        ...config,
      }
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
