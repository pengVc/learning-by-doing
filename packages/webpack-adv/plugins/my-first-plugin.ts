import type { Compiler, WebpackPluginInstance } from 'webpack'
import logger from '@lbd/webpack-adv/utils/logger'

// 自定义 Webpack 插件类
class MyPlugin implements WebpackPluginInstance {
  // Webpack 插件的入口方法，用于注册钩子
  apply(compiler: Compiler) {
    // 监听编译开始的钩子，在编译开始时触发
    compiler.hooks.compile.tap('MyPlugin', (source) => {
      logger.start('call compile hook', { source })
    })

    // 监听编译输出文件前的钩子，异步方式执行
    compiler.hooks.emit.tapAsync('MyPlugin', (compilation, cb) => {
      logger.start('call emit hook', {
        compilation,
      })

      cb()
    })

    // 同步方式监听编译结束后的钩子
    compiler.hooks.afterEmit.tap('MyPlugin', (compilation) => {
      logger.start('call afterEmit-tap completed hook', {
        compilation,
      })
    })

    // 异步方式监听编译结束后的钩子
    compiler.hooks.afterEmit.tapAsync('MyPlugin', (compilation, cb) => {
      logger.start('call afterEmit-tapAsync completed hook', {
        compilation,
      })

      cb()
    })

    // Promise 方式监听编译结束后的钩子
    compiler.hooks.afterEmit.tapPromise('MyPlugin', async (compilation) => {
      logger.start('call afterEmit-tapPromise completed hook', {
        compilation,
      })
    })

    // 监听编译完成的钩子，在编译完成后触发
    compiler.hooks.done.tap('MyPlugin', (stats) => {
      logger.start('call compile done hook', {
        stats,
      })
    })
  }
}

export default MyPlugin
