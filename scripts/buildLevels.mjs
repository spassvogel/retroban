import fs from 'fs'
import xmlJs from 'xml-js'
import path from 'path'
import {fileURLToPath} from 'url'
import cities from '../src/cities.json' assert {
  type: 'json'
}

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const xmlDir = path.resolve(__dirname, '../public/xml')
const levelsJsonPath = path.resolve(__dirname, '../src/levels.json')
const files = fs.readdirSync(xmlDir)
const levels = files.map((f, i) => {
  try {
    const contents = fs.readFileSync(`${xmlDir}/${f}`)
    const xml = xmlJs.xml2js(contents.toString(), { compact: true })
    const level = xml.puzzle._attributes.level
    const index = ++f.match(/(level)(\d\d\d\d).xml/)[2]

    return {
      // name: `${name ? `(${name})` : ''}${f}`,
      name: `${cities[index - 1000]}`,
      level: +level,
      path: `xml/${f}`
    }
  } catch(e) {
    console.log(`Error reading ${xmlDir}/${f}. \n${e}`,)
  }
})
const json = JSON.stringify({
  "_NOTE": "Dont write to this file. It will be overwritten when the app is compiled!",
  levels
}, null, 2)
try {
  fs.writeFileSync(levelsJsonPath, json);
  // file written successfully
  console.log(`Succesfully written ${levels.length} levels to levels.json file!`)
} catch (err) {
  console.error(err)
}
