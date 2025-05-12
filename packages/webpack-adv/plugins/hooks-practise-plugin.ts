import type { Compiler, WebpackPluginInstance } from 'webpack'
import * as fs from 'node:fs'
import * as path from 'node:path'

// 自定义 Webpack 插件类
class HooksPractisePlugin implements WebpackPluginInstance {
  // Webpack 插件的入口方法，用于注册钩子
  apply(compiler: Compiler) {
    compiler.hooks.emit.tap('HooksPractisePlugin', (compilation) => {
      const outputDir = compiler.options.output.path

      if (!outputDir) {
        console.log('Empty outputDir')
        return
      }

      // 读取指定目录下的所有文件，以便进行后续处理
      fs.readdir(outputDir, (err, files) => {
        // 如果在读取目录时发生错误，则抛出异常
        if (err) throw err

        // 遍历目录中的每个文件
        for (const file of files) {
          // 删除文件，如果删除过程中发生错误，则抛出异常
          fs.unlink(path.join(outputDir, file), (err) => {
            if (err) throw err
          })
        }
      })
    })

    compiler.hooks.emit.tapAsync('HooksPractisePlugin', (compilation, callback) => {
      // 资源生成完成，但尚未写入文件系统（异步）
      // 可修改最终资源内容
      const content = '这是自动生成的 README 文件内容。\n'

      const cnStr = new Date().toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        weekday: 'long',
      })

      // @ts-ignore
      compilation.assets[`readme-${cnStr}.txt`] = {
        source: () => content,
        size: () => content.length,
      }

      callback()
    })
  }
}

export default HooksPractisePlugin
