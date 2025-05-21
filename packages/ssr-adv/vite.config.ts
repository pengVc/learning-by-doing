import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import dts from 'vite-plugin-dts'
// import minimist from 'minimist'

// vite build --ssr
// const isSSR = process.env.BUILD_TARGET === 'ssr'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    {
      ...dts({
        tsconfigPath: './tsconfig.app.json',
      }),
      apply: (_, env) => {
        return env.command === 'build' && env.isSsrBuild === true
      },
    },
  ],
})
