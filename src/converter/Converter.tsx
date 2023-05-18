import { useState } from "react"
import { TileType } from "../store/reducers/tiles"
import { peekNeighor } from "../grid/utils/grid"
import App from "../App"

import "./converter.scss"

const getTileType = (input: string) => {
  switch (input) {
    case '#':
    case 'X':
      return TileType.wall
    case '+':
    case '*':
    case '.':
      return TileType.dropzone
    default:
      return TileType.empty
  }
}
const Converter = () => {
const [input, setInput] = useState("")
const [name, setName] = useState("")
const [source, setSource] = useState("")
const [sourceURL, setSourceURL] = useState("")
const [author, setAuthor] = useState("")
const [authorEmail, setAuthorEmail] = useState("")
const [level, setLevel] = useState("1")
const [output, setOutput] = useState("")

  const handleConvert = () => {
    console.log(`input`, input)
    const split = input.trimEnd().split('\n')
    const columns = split.reduce((acc, value) => {
      if (value.length > acc) {
        acc = value.length
      }
      return acc
    }, 0)

    const attributes = [
      `width="${columns}"`,
      `created="${new Date().toISOString()}"`,
      `name="${name}"`,
      `level="${level}"`,
      ...(source ? [`source="${source}"`] : []),
      ...(sourceURL ? [`sourceURL="${sourceURL}"`] : []),
      ...(author ? [`author="${author}"`] : []),
      ...(authorEmail ? [`authorEmail="${authorEmail}"`] : []),
    ]

    const result = [
      `<puzzle type="Sokoban" ${attributes.join(' ')} >`,
      ` <tiles>`,
      `   <static>`
    ]

    let playerIndex = -1
    const boxIndices: number[] = []
    const tiles: TileType[] = []
    // Make the tile list, we regard 'floor' as 'empty' as this point
    split.forEach((line, lineIndex) => {
      const trimmed = line.trimEnd()
      for (let i = 0; i < columns; i++) {
        const type = getTileType(trimmed[i])
        tiles.push(type)

        if (['@', '+'].includes(trimmed[i])) {
          // Found the player
          playerIndex = lineIndex * columns + i
        }

        if (['$', '*'].includes(trimmed[i])) {
          // Found a box
          boxIndices.push(lineIndex * columns + i)
        }
      }
    })
    if (playerIndex === -1) {
      throw new Error('No player found!')
    }
    const rows = tiles.length / columns

    // Starting at the players position, 'flood' fill the empty tiles to be 'floor'
    const floor = new Set()
    const searchSpace = [playerIndex]

    const checkNeighbor = (tileIndex: number, xDistance: number, yDistance: number) => {
      const neighborIndex = peekNeighor(tileIndex, columns, rows, xDistance, yDistance)
      if (neighborIndex === undefined) {
        return
      }
      if (floor.has(neighborIndex)){
        return
      }
      if (tiles[neighborIndex] === TileType.empty || tiles[neighborIndex] === TileType.dropzone) {
        searchSpace.push(neighborIndex)
      }
    }

    while(searchSpace.length) {
      const tileIndex = searchSpace.shift()
      if (!tileIndex) return
      floor.add(tileIndex)

      checkNeighbor(tileIndex, 0, -1) // check north
      checkNeighbor(tileIndex, 1, 0)  // check east
      checkNeighbor(tileIndex, 0, 1)  // check south
      checkNeighbor(tileIndex, -1, 0) // check west
    }
    result.push(...tiles.map((tT, index) => {
      if (tT == TileType.empty && floor.has(index)) {
        return `     <tile type="floor" />`
      }
      return `     <tile type="${TileType[tT]}" />`
    }))
    result.push(`   </static>`)
    result.push(`   <objects>`)
    result.push(`     <object tileIndex="${playerIndex}" type="player" />`)
    result.push(...boxIndices.map((i) => `     <object tileIndex="${i}" type="box" />`))
    result.push(`   </objects>`)
    result.push(` </tiles>`)
    result.push(`</puzzle>`)

    setOutput(result.join(' \n'))
  }
  return (
    <div className="converter">
      <div>
        <label>Input (in <a href="http://www.sokobano.de/wiki/index.php?title=Level_format">Sokoban standard notation</a>).
        <br/>Make sure the area where the player is is fully walled in.</label>
        <textarea name="" id="" rows={10} value={input} onChange={(e) => setInput(e.target.value)}></textarea>
        <div className="properties">
          <div className="form-control">
            <label>Name</label>
            <input type="text" name="name" value={name} onChange={e => setName(e.target.value)}></input>
          </div>
          <div className="form-control">
            <label>Source</label>
            <input type="text" name="source" value={source} onChange={e => setSource(e.target.value)}></input>
          </div>
          <div className="form-control">
            <label>Source URL</label>
            <input type="text" name="sourceURL" value={sourceURL} onChange={e => setSourceURL(e.target.value)}></input>
          </div>
          <div className="form-control">
            <label>Author</label>
            <input type="text" name="author" value={author} onChange={e => setAuthor(e.target.value)}></input>
          </div>
          <div className="form-control">
            <label>Author Email</label>
            <input type="text" name="source-URL" value={authorEmail} onChange={e => setAuthorEmail(e.target.value)}></input>
          </div>
          <div className="form-control">
            <label>level</label>
            <select value={level} onChange={(e) => setLevel(e.currentTarget.value)}>
              <option value="1">Storage Unit (easy)</option>
              <option value="2">Warehouse (medium)</option>
              <option value="3">Logistics center (hard)</option>
            </select>
          </div>
        </div>
        <div>
          <button onClick={handleConvert}>CONVERT</button>
        </div>
      </div>
      <div>
        output
        <textarea name="" id="" rows={10} value={output}>

        </textarea>

      </div>
      <div className="preview">
        { output && <App gameData={output} />}
      </div>
    </div>
  )
}

export default Converter
