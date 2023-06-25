import fs from 'fs'
import xmlJs from 'xml-js'
import path from 'path'
import {fileURLToPath} from 'url'
import levelJson from '../src/levels.json' assert {
  type: 'json'
}

// Reads the levels and presents the data
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const publicDir = path.resolve(__dirname, '../public')

const table = levelJson.levels.map((l) => {
  const contents = fs.readFileSync(`${publicDir}/${l.path}`)
  const xml = xmlJs.xml2js(contents.toString(), { compact: true })
  const {
    name,
    source,
    sourceURL,
    author,
    authorEmail
  } = xml.puzzle._attributes

  let solution
  if (xml.puzzle.solutions?.solution?._text) {
    solution = xml.puzzle.solutions?.solution?._text
  }

  return {
    ...l,
    sourceName: name,
    source: source.substring(0, 45),
    sourceURL: sourceURL?.substring(0, 22),
    author: author?.substring(0, 24),
    authorEmail,
    solution: solution?.substring(0, 10)
  }
})

console.table(table, ['name', 'path', 'level', 'solution', 'sourceName', 'source', 'sourceURL', 'author', 'authorEmail'])
