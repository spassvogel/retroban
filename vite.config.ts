import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import path from 'path'
import fs from 'fs'

const directoryPath = path.join(__dirname, 'public');
fs.readdirSync(directoryPath)

// https://vitejs.dev/config/
export default defineConfig({
  base: '/retroban/',
  resolve: {
    alias: {
      stream: "stream-browserify", // needed for xml-js
    }
  },
  build: {
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name].js`,
        chunkFileNames: `assets/[name].js`,
        assetFileNames: `assets/[name].[ext]`
      }
    }
  },
  plugins: [
    svgr(),
    react(),
  ],
})
