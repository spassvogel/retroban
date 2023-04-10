import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/retroban/',
  resolve: {
    alias: {
      stream: "stream-browserify", // needed for xml-js
    }
  },
  plugins: [
    svgr(),
    react(),
  ],
})
