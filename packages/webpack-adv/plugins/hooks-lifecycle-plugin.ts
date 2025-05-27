import type { Compiler, WebpackPluginInstance } from 'webpack'
import { logger } from '@lbd/shared'

// 自定义 Webpack 插件类
class HooksLifecyclePlugin implements WebpackPluginInstance {
  // Webpack 插件的入口方法，用于注册钩子
  apply(compiler: Compiler) {
    compiler.hooks.initialize.tap('HooksLifecyclePlugin', () => {
      logger.log('初始化完成 (initialize)')
    })

    compiler.hooks.entryOption.tap('HooksLifecyclePlugin', (context, entry) => {
      logger.log('入口配置 (entryOption)', {
        // context: 基础目录
        context,
      })

      logger.msg('entry:', entry)
    })

    compiler.hooks.afterPlugins.tap('HooksLifecyclePlugin', (compiler) => {
      // 所有插件已注册完成
      logger.log('所有插件已注册完成 (afterPlugins)')
    })

    compiler.hooks.afterResolvers.tap('HooksLifecyclePlugin', (compiler) => {
      // 解析器（resolver）已设置完成
      logger.log('解析器已设置完成 (afterResolvers)')
    })

    compiler.hooks.environment.tap('HooksLifecyclePlugin', () => {
      // 环境变量已设置（如 process.env）
      logger.log('环境变量已设置 (environment)')
    })

    compiler.hooks.afterEnvironment.tap('HooksLifecyclePlugin', () => {
      // 环境变量已设置完成（如 process.env）
      logger.log('环境变量已设置完成 (afterEnvironment)')
    })

    compiler.hooks.beforeRun.tapAsync('HooksLifecyclePlugin', (compiler, callback) => {
      // 编译即将开始（异步）
      logger.log('编译即将开始 (beforeRun)')
      callback()
    })

    compiler.hooks.normalModuleFactory.tap('HooksLifecyclePlugin', () => {
      // NormalModuleFactory 创建完成，可监听 NormalModuleFactory 钩子
      logger.log('NormalModuleFactory 创建完成 (normalModuleFactory)')
    })

    compiler.hooks.contextModuleFactory.tap('HooksLifecyclePlugin', () => {
      // ContextModuleFactory 对象已创建，可监听 ContextModuleFactory 钩子
      logger.log('ContextModuleFactory 对象已创建 (contextModuleFactory)')
    })

    compiler.hooks.run.tapAsync('HooksLifecyclePlugin', (compiler, callback) => {
      // 编译开始（异步）
      logger.log('编译开始 (run)')
      callback()
    })

    compiler.hooks.compile.tap('HooksLifecyclePlugin', (compilationParams) => {
      // 编译准备工作完成，即将创建 Compilation 对象
      logger.log('编译准备工作完成 (compile)')
      // compilationParams 包含创建 Compilation 的参数
    })

    compiler.hooks.thisCompilation.tap('HooksLifecyclePlugin', (compilation) => {
      // Compilation 对象已创建，但模块尚未构建
      logger.log('Compilation 对象已创建 (thisCompilation)')
    })

    compiler.hooks.compilation.tap('HooksLifecyclePlugin', (compilation) => {
      // Compilation 对象已创建，可监听 Compilation 钩子
      logger.log('Compilation 创建完成 (compilation)')

      compilation.hooks.optimize.tap('HooksLifecyclePlugin', () => {
        // 资源优化阶段
        logger.log('资源优化阶段 (optimize)')
      })

      // 模块解析前
      compilation.hooks.normalModuleLoader.tap('HooksLifecyclePlugin', (loaderContext, module) => {
        // 修改 Loader 上下文或模块配置
        logger.log('模块解析前 (normalModuleLoader)')
      })

      // 模块解析完成
      compilation.hooks.succeedModule.tap('HooksLifecyclePlugin', (module) => {
        // module: 已解析的模块对象
        logger.log('模块解析完成 (succeedModule)')
      })

      // 优化模块（去重、合并等）
      compilation.hooks.optimizeModules.tap('HooksLifecyclePlugin', (modules) => {
        // modules: 所有模块的数组
        logger.log('优化模块 (optimizeModules)')
      })

      // 优化 chunks
      compilation.hooks.optimizeChunks.tap('HooksLifecyclePlugin', (chunks, modules) => {
        // chunks: 所有 chunk 的数组
        logger.log('优化 chunks (optimizeChunks)')
      })

      // 优化资源大小
      compilation.hooks.optimizeAssets.tap('HooksLifecyclePlugin', (assets) => {
        // assets: 所有资源的对象 { filename: source }
        logger.log('优化资源大小 (optimizeAssets)')
      })
    })

    compiler.hooks.make.tapAsync('HooksLifecyclePlugin', (compilation, callback) => {
      // 开始构建模块图（递归分析依赖）
      logger.log('开始构建模块图 (make)')
      callback()
    })

    compiler.hooks.finishMake.tapAsync('HooksLifecyclePlugin', (compilation, callback) => {
      // 构建模块图完成
      logger.log('构建模块图完成 (finishMake)')
      callback()
    })

    compiler.hooks.emit.tapAsync('HooksLifecyclePlugin', (compilation, callback) => {
      // 资源生成完成，但尚未写入文件系统（异步）
      // 可修改最终资源内容
      logger.log('资源生成完成 (emit)')
      callback()
    })

    compiler.hooks.afterEmit.tapAsync('HooksLifecyclePlugin', (compilation, callback) => {
      // 资源已写入文件系统（异步）
      // 可执行文件操作（如复制、删除）
      logger.log('资源已写入文件系统 (afterEmit)')
      callback()
    })

    compiler.hooks.done.tap('HooksLifecyclePlugin', (stats) => {
      // 编译完成
      // stats: 包含构建统计信息
      logger.log('构建耗时 (done)', stats.endTime - stats.startTime, 'ms')
    })

    compiler.hooks.failed.tap('HooksLifecyclePlugin', (error) => {
      // 编译失败
      logger.log('编译错误 (failed)', error)
    })

    compiler.hooks.invalid.tap('HooksLifecyclePlugin', (error) => {
      // 在 Watch 模式下，文件变化导致编译无效时
      // 适合在 Watch 模式下处理文件变更（如通知开发者））
      console.error('构建错误:', error)
    })
  }
}

export default HooksLifecyclePlugin
