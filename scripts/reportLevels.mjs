import fs from 'fs'
import xmlJs from 'xml-js'

import { Console } from 'console'
import { Transform } from 'stream'
import path from 'path'
import {fileURLToPath} from 'url'
import levelJson from '../src/levels.json' assert {
  type: 'json'
}

// possible args:
// level <number> filter on level

const args = parseArgs();

// Reads the levels and presents the data
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const publicDir = path.resolve(__dirname, '../public')

const columns = ['name', 'path', 'lvl', 'solution', 'sourceName', 'source', 'sourceURL', 'author', 'authorEmail']
// used for calculating the available space
const availableChars = process.stdout.columns - ((columns.length - 2) * "  |  ".length) - "│ (index) │".length - " │ 'xml/level0000.xml' │".length - "  |  ".length

const table = levelJson.levels
  .filter((l) => {
    return !args.level || +args.level === l.level
  })
  .map((l) => {
    const {
      name,
      path,
      level
    } = l
    try {

      const contents = fs.readFileSync(`${publicDir}/${l.path}`)
      const xml = xmlJs.xml2js(contents.toString(), { compact: true })
      const {
        name: sourceName,
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
        name: name.substring(0, (1 / 7) * availableChars),
        path,
        lvl: level,
        sourceName: sourceName?.substring(0, (1 / 7) * availableChars),
        source: source?.substring(0, (1 / 7) * availableChars),
        sourceURL: sourceURL?.substring(0, (1 / 7) * availableChars),
        author: author?.substring(0, (1 / 7) * availableChars),
        authorEmail: authorEmail?.substring(0, (1 / 7) * availableChars),
        solution: solution?.substring(0, (1 / 7) * availableChars),
      }
    }
    catch (e) {
      console.error(`Error parsing ${publicDir}/${l.path}`)
      console.error(e)
    }
  })

  // summary
console.log(`# easy levels ${levelJson.levels.filter((l => l.level === 1)).length}`)
console.log(`# medium levels ${levelJson.levels.filter((l => l.level === 2)).length}`)
console.log(`# hard levels ${levelJson.levels.filter((l => l.level === 3)).length}`)
const lvlsWithoutSolution = table.filter(l => !l.solution).map(l => `- ${l.path}\n`)
if (lvlsWithoutSolution.length) {
  console.log(`\n Levels without solution (${lvlsWithoutSolution.length}):\n ${lvlsWithoutSolution}`)
}

console.table(table, columns)


function printTable(input, columns) {
  // @see https://stackoverflow.com/a/67859384
  const ts = new Transform({ transform(chunk, enc, cb) { cb(null, chunk) } })
  const logger = new Console({ stdout: ts })
  logger.table(input, columns)
  const table = (ts.read() || '').toString()
  let result = '';
  for (let row of table.split(/[\r\n]+/)) {
    let r = row.replace(/[^┬]*┬/, '┌');
    r = r.replace(/^├─*┼/, '├');
    r = r.replace(/│[^│]*/, '');
    r = r.replace(/^└─*┴/, '└');
    r = r.replace(/'/g, ' ');
    result += `${r}\n`;
  }
  console.log(result);
}

function parseArgs() {
  const argMap = {}
  const args = process.argv.slice(2);
  if (args.length % 2)
	throw new Error('Invalid number of arguments');

  for (let i = 0; i < args.length; i += 2) {
    let key = args[i];
    if (!/^--([a-z]+-)*[a-z]+$/g.test(key))
      throw new Error('Invalid argument name');

    key = key
    .replace(/^--/, '')
    .replace(/-([a-z])/g, g => g[1].toUpperCase());

    argMap[key] = args[i + 1];
  }
  return argMap
}
