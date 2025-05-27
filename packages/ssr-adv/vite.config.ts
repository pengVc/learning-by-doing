import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import dts from 'vite-plugin-dts'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    {
      ...dts({
        tsconfigPath: './tsconfig.app.json',
        entryRoot: './src',
      }),
      apply: (_, env) => {
        return env.command === 'build' && env.isSsrBuild === true
      },
    },
  ],
})
