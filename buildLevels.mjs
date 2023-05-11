import fs from 'fs'
import xmlJs from 'xml-js'
import path from 'path'
import {fileURLToPath} from 'url'


const __dirname = path.dirname( fileURLToPath(import.meta.url))

const files = fs.readdirSync(`${__dirname}/public/xml`)
const levels = files.map((f, i) => {
  const contents = fs.readFileSync(`${__dirname}/public/xml/${f}`)
  const xml = xmlJs.xml2js(contents.toString(), { compact: true })
  const name = xml.puzzle._attributes.name
  const level = xml.puzzle._attributes.level

  return {
    name: `${name ? `(${name})` : ''} ${f} (${level})`,
    path: `xml/${f}`
  }
})
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
