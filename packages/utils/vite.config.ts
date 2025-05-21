import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  build: {
    lib: {
      entry: './lib/index.ts',
      name: 'Utils',
      fileName: 'utils',
    },
  },

  plugins: [
    {
      ...dts({
        tsconfigPath: './tsconfig.json',
        outDir: './dist/types',
        entryRoot: 'lib',
      }),
      apply: (_, env) => {
        return env.command === 'build'
      },
    },
  ],
})
