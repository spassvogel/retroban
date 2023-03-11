import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      stream: "stream-browserify", // needed for xml-js
    }
  },
  plugins: [react()],
})
