import fs from 'fs'
import path from 'path'
import {fileURLToPath} from 'url'


const __dirname = path.dirname( fileURLToPath(import.meta.url))
const testFolder = `${__dirname}/public/xml`;

const files = fs.readdirSync(testFolder)
const levels = files.map((f, i) => ({
  name: `Level ${i + 1}`,
  path: `xml/${f}`
}))
console.log(JSON.stringify({ 
  "_NOTE": "Dont write to this file. It will be overwritten when the app is compiled!",
  levels
}))
// const .forEach(file => {
//   console.log(file);
// });