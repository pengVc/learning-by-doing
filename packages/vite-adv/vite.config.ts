import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import myVitePlugin from './plugins/myVitePlugins.ts'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), myVitePlugin()],
})
