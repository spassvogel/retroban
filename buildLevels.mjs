import fs from 'fs'
import path from 'path'
import {fileURLToPath} from 'url'


const __dirname = path.dirname( fileURLToPath(import.meta.url))

const files = fs.readdirSync(`${__dirname}/public/xml`)
const levels = files.map((f, i) => ({
  name: `Level ${i + 1}`,
  path: `xml/${f}`
}))
const json = JSON.stringify({ 
  "_NOTE": "Dont write to this file. It will be overwritten when the app is compiled!",
  levels
}, null, 2)

try {
  fs.writeFileSync(`${__dirname}/levels.json`, json);
  // file written successfully
  console.log("Succesfully written levels.json file!")
} catch (err) {
  console.error(err);
}
