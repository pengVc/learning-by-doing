import type { LoaderDefinition } from 'webpack'

const customLoader: LoaderDefinition = function (source) {
  let finalSource = source.replace(/hello/g, '你好')

  finalSource = finalSource.replace(/<!--loader-outlet-->/g, () => {
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

    return cnStr
  })

  return finalSource
}

export const pitch: LoaderDefinition['pitch'] = (remainingRequest) => {
  // 这里可以根据需要处理 remainingRequest
  console.log('customLoader.pitch', {
    remainingRequest,
  })
}

export default customLoader
