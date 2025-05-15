import type { Plugin } from 'vite'
import logger from '@lbd/webpack-adv/utils/logger'

const DATA = {
  name: 'data-from-build',
  version: '1.0.0',
}

const virtualModuleId = 'virtual:custom-data'
const resolvedVirtualModuleId = '\0' + virtualModuleId

export default function customDataPlugin() {
  return {
    name: 'data-plugin',

    resolveId(id) {
      if (id === virtualModuleId) {
        logger.log('resolveId', {
          id,
        })
        return resolvedVirtualModuleId
      }
    },

    load(id) {
      if (id === resolvedVirtualModuleId) {
        logger.log('load')
        return `export default ${JSON.stringify(DATA)}`
      }
    },

    config() {
      return {
        define: {
          __DATA_FROM_PLUGIN__: JSON.stringify(DATA),
        },
      }
    },
  } as Plugin
}
