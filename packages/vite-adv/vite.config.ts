import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import customLifecycleHookPlugin from './plugins/customLifecycleHookPlugin'
import customDataPlugin from './plugins/customDataPlugin'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), 0 ? customLifecycleHookPlugin() : null, customDataPlugin()],
})
