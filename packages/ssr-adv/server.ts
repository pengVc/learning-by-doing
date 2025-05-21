import * as path from 'node:path'
import * as fs from 'node:fs/promises'
import express from 'express'
import compression from 'compression'
import { fileURLToPath } from 'url'

import { createServer } from 'vite'
import sirv from 'sirv'

import type { SSRender } from './src/main.server.tsx'
import type { ViteDevServer } from 'vite'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/**
 * 设置环境变量和基本配置常量
 * - isProduction: 判断当前是否为生产环境
 * - port: 服务器监听的端口号，默认5173
 * - base: 应用的基础路径，默认'/'
 */
const isProduction = process.env.NODE_ENV === 'production'
const port = process.env.PORT || 5173
const base = process.env.BASE || '/'

let tplHtml = isProduction ? await fs.readFile('./dist/client/index.html', 'utf-8') : ''

const app = express()

/**
 * 根据环境加载不同的中间件
 * - 生产环境：使用压缩等中间件
 * - 开发环境：使用Vite开发服务器作为中间件
 */
let viteDevServ: ViteDevServer | undefined
let render: SSRender
if (isProduction) {
  app.use(compression())
  app.use(base, sirv('./dist/client', { extensions: [] }))
  render = (await import('./dist/server/main.server.js')).render
} else {
  viteDevServ = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
    base,
  })

  app.use(viteDevServ.middlewares)
}

app.use('*all', async (req, res) => {
  try {
    const url = req.originalUrl.replace(base, '')

    let finalHtml = tplHtml
    if (!isProduction) {
      render = (await viteDevServ!.ssrLoadModule('./src/main.server.tsx')).render
      finalHtml = await fs.readFile(path.resolve(__dirname, 'index.html'), 'utf-8')
      finalHtml = await viteDevServ!.transformIndexHtml(url, finalHtml)
    }

    const { head, body } = await render({
      url,
    })

    finalHtml = finalHtml.replace('<!--ssr-outlet-head-->', head).replace('<!--ssr-outlet-body-->', body)

    res.send(finalHtml)
  } catch (err) {
    const error = err as Error
    viteDevServ?.ssrFixStacktrace(error)
    res.status(500).send(getErrorMsg(error))
  }
})

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`)
})


const getErrorMsg = (err: any, fallback?: string): string => {
  return err?.message ?? err?.msg ?? err?.toString() ?? fallback ?? 'Unknown error'
}
