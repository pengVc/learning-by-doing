import { renderToString } from 'react-dom/server'
import App from './components/App'
import { StrictMode } from 'react'

type TRenderParams = {
  url: string
}
export const render = (params?: TRenderParams) => {
  const { url } = params ?? {}

  console.log('server render:', url)

  const body = renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  )

  return {
    body,
    head: `<title>Vite + TS + SSR</title>`,
  }
}

export type SSRender = typeof render

export default render
