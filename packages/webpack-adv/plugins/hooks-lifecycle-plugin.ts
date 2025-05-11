import type { Compiler, WebpackPluginInstance } from 'webpack'
import logger from '@lbd/webpack-adv/utils/logger'

// 自定义 Webpack 插件类
class HooksLifecyclePlugin implements WebpackPluginInstance {
  // Webpack 插件的入口方法，用于注册钩子
  apply(compiler: Compiler) {
    compiler.hooks.entryOption.tap('PluginName', (context, entry) => {
      logger.log('入口配置 (entryOption)', {
        // context: 基础目录
        context,
      })

      logger.msg('entry:', entry)
    })

    compiler.hooks.afterPlugins.tap('PluginName', (compiler) => {
      // 所有插件已注册完成
      logger.log('所有插件已注册完成 (afterPlugins)')
    })

    compiler.hooks.afterResolvers.tap('PluginName', (compiler) => {
      // 解析器（resolver）已设置完成
      logger.log('解析器已设置完成 (afterResolvers)')
    })

    compiler.hooks.environment.tap('PluginName', () => {
      // 环境变量已设置（如 process.env）
      logger.log('环境变量已设置 (environment)')
    })

    compiler.hooks.beforeRun.tapAsync('PluginName', (compiler, callback) => {
      // 编译即将开始（异步）
      logger.log('编译即将开始 (beforeRun)')
      callback()
    })

    compiler.hooks.run.tapAsync('PluginName', (compiler, callback) => {
      // 编译开始（异步）
      logger.log('编译开始 (run)')
      callback()
    })

    compiler.hooks.compile.tap('PluginName', (compilationParams) => {
      // 编译准备工作完成，即将创建 Compilation 对象
      logger.log('编译准备工作完成 (compile)')
      // compilationParams 包含创建 Compilation 的参数
    })

    compiler.hooks.thisCompilation.tap('PluginName', (compilation) => {
      // Compilation 对象已创建，但模块尚未构建
      logger.log('Compilation 对象已创建 (thisCompilation)')
    })

    compiler.hooks.compilation.tap('PluginName', (compilation) => {
      // Compilation 对象已创建，可监听 Compilation 钩子
      logger.log('Compilation 创建完成 (compilation)')

      compilation.hooks.optimize.tap('PluginName', () => {
        // 资源优化阶段
        logger.log('资源优化阶段 (optimize)')
      })

      // 模块解析前
      compilation.hooks.normalModuleLoader.tap('PluginName', (loaderContext, module) => {
        // 修改 Loader 上下文或模块配置
        logger.log('模块解析前 (normalModuleLoader)')
      })

      // 模块解析完成
      compilation.hooks.succeedModule.tap('PluginName', (module) => {
        // module: 已解析的模块对象
        logger.log('模块解析完成 (succeedModule)')
      })

      // 优化模块（去重、合并等）
      compilation.hooks.optimizeModules.tap('PluginName', (modules) => {
        // modules: 所有模块的数组
        logger.log('优化模块 (optimizeModules)')
      })

      // 优化 chunks
      compilation.hooks.optimizeChunks.tap('PluginName', (chunks, modules) => {
        // chunks: 所有 chunk 的数组
        logger.log('优化 chunks (optimizeChunks)')
      })

      // 优化资源大小
      compilation.hooks.optimizeAssets.tap('PluginName', (assets) => {
        // assets: 所有资源的对象 { filename: source }
        logger.log('优化资源大小 (optimizeAssets)')
      })
    })

    compiler.hooks.make.tapAsync('PluginName', (compilation, callback) => {
      // 开始构建模块图（递归分析依赖）
      logger.log('开始构建模块图 (make)')
      callback()
    })

    compiler.hooks.done.tap('PluginName', (stats) => {
      // 编译完成
      // stats: 包含构建统计信息
      logger.log('构建耗时 (done)', stats.endTime - stats.startTime, 'ms')
    })

    compiler.hooks.failed.tap('PluginName', (error) => {
      // 编译失败
      logger.log('编译错误 (failed)', error)
    })
  }
}

export default HooksLifecyclePlugin
