import { defineConfig } from 'vite'
import fs from 'fs'
import path from 'path'

const mpaPrefix = 'src/pages'

// 获取所有页面入口
const pages = fs
  .readdirSync(path.resolve(__dirname, mpaPrefix), {
    withFileTypes: true,
  })
  .filter((dirent) => dirent.isDirectory())

export default defineConfig((config) => {
  const input = pages.reduce<Record<string, string>>(
    (acc, page) => {
      const { name } = page
      acc[name] = path.resolve(__dirname, `${mpaPrefix}/${name}/index.html`)
      return acc
    },
    {
      index: path.resolve(__dirname, `${mpaPrefix}/index.html`),
    },
  )

  console.log({ input })

  return {
    plugins: [],
    build: {
      rollupOptions: {
        input,
      },
      // 相对于项目根目录 (root)
      outDir: path.resolve(__dirname, 'dist'),
    },
    // 指定项目根目录，避免了访问 MPA ，需要带上 src/pages
    root: mpaPrefix,
    base: './',
    server: {
      port: 3000,
    },
  }
})
