import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
    }),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/lib.ts'),
      name: '@ethan/team-two',
      fileName: (format) => `lib.${format}.js`
    },
    rollupOptions: {
      external: ['react', 'react-dom', '@ethan/header', 'react-router-dom', '@emotion/css'],
      output: {
          globals: {
              react: 'React',
              'react-dom': 'ReactDOM',
          },
      },
    }
  }
});