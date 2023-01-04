import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: '@shared', replacement: path.resolve(__dirname, 'src/shared') },
      { find: '@pages', replacement: path.resolve(__dirname, 'src/pages') },
    ],
  },
  build: {
    outDir: 'dist',
  }
})