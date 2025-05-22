import { Compiler, WebpackPluginInstance } from 'webpack'
import * as fs from 'node:fs/promises'
import path from 'node:path'
import { getErrorMsg } from '@lbd/utils'

type DeleteDirPluginOptions = {
  dir: string
}

class DeleteDirPlugin implements WebpackPluginInstance {
  private options: DeleteDirPluginOptions

  constructor(options: DeleteDirPluginOptions) {
    this.options = options
  }

  apply(compiler: Compiler) {
    const { dir } = this.options

    // node version >= 14.14
    compiler.hooks.emit.tapPromise('DeleteDirPlugin', async (compilation) => {
      const outputDir = compiler.options.output.path

      if (!outputDir) {
        console.log('Empty outputDir')
        return
      }

      try {
        await fs.rm(dir, { recursive: true, force: true })
      } catch (error) {
        compilation.errors.push(
          new Error(`[DeleteDirPlugin] Failed to delete directory: ${dir}. ${getErrorMsg(error)}`),
        )
      }
    })

    // node version < 14
    0 &&
      compiler.hooks.emit.tapAsync('HooksPractisePlugin', async (compilation, cb) => {
        const outputDir = compiler.options.output.path

        if (!outputDir) {
          console.log('Empty outputDir')
          return
        }

        // 遍历目录中的每个文件
        const files = await fs.readdir(outputDir, {
          recursive: true,
          withFileTypes: true,
        })

        await Promise.all(
          files
            .filter((file) => file.isFile())
            .map((file) => {
              // 删除文件
              return fs.unlink(path.join(file.parentPath, file.name))
            }),
        )

        cb()
      })
  }
}

export default DeleteDirPlugin
