import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import path from 'path';
import fs from 'fs';

const directoryPath = path.join(__dirname, 'public');
fs.readdirSync(directoryPath)

console.log('hiya')
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
