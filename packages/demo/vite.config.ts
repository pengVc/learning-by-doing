import { defineConfig } from 'vite'
import fs from 'fs'
import path from 'path'

const mpaPrefix = 'src/pages'

// 获取所有页面入口
const pages = fs.readdirSync(path.resolve(__dirname, mpaPrefix))

export default defineConfig((config) => {
  return {
    plugins: [],
    build: {
      rollupOptions: {
        input: pages.reduce<Record<string, string>>((acc, page) => {
          acc[page] = path.resolve(__dirname, `${mpaPrefix}/${page}/index.html`)
          return acc
        }, {}),
      },
      outDir: path.resolve(__dirname, 'dist'),
    },
    base: './',
    // 指定项目根目录，避免了访问 MPA ，需要带上 src/pages
    root: mpaPrefix,
    server: {
      port: 3000,
    },
  }
})
