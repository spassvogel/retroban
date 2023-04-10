import { useState } from "react"
import { TileType } from "../store/reducers/tiles"
import "./converter.scss"

const getTileType = (input: string) => {
  console.log(`input`, input)
  switch (input) {
    case '#':
    case 'X':
      return TileType.wall
    // case ' ':
    // case '$':
    // case '@': {
    //   return TileType.floor
    // }
    case '+':
    case '*':
    case '.':
      return TileType.dropzone
    default:
      return TileType.empty
  }
}
const Converter = () => {
  const [input, setInput] = useState(`
  XXXXX
  X   X
  X*  X
XXX  *XXX
X  *  * X
XXX X XXX X     XXXXXX
X   X XXX XXXXXXX  ..X
X *  *             ..X
XXXXX XXXX X@XXXX  ..X
  X      XXX  XXXXXX
  XXXXXXXX`)

  const handleConvert = () => {
    console.log(`input`, input)
    const split = input.split('\n')
    const columns = split.reduce((acc, value) => {
      if (value.length > acc) {
        acc = value.length
      }
      return acc
    }, 0)
    const result = [
      `<puzzle type="Sokoban" width="${columns}" created="${new Date().toISOString()}">`,
      ` <tiles>`,
      `   <static>`
    ]

    let playerIndex = -1
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
      }
    })
    if (playerIndex === -1) {
      throw new Error('No player found!')
    }

    // Starting at the players position, 'flood' fill the empty tiles to be 'floor'
    const floor = new Set()

    const neighborOffsets = [
      -columns, // north
      // -columns + 1, // northeast
      1, // east
      // columns + 1, // southeast
      columns, // south
      // columns - 1, // southwest
      -1, // west
      // -columns - 1 // northwest
    ]

    // https://codeguppy.com/blog/flood-fill/index.html
    // https://learnersbucket.com/examples/algorithms/flood-fill-algorithm-in-javascript

    const addNeighboringFloorTiles = (index: number) => {
      if (tiles[index] === TileType.empty) {
        floor.add(index)
      }

      const neighborIndices = neighborOffsets.map((o) => o + index)
      console.log(`neighborIndices`, neighborIndices)

      const neighboringFloorTiles = neighborIndices.filter((i) => tiles[i] === TileType.empty && !tiles.includes(i))
      console.log(`neighboringFloorTiles`, neighboringFloorTiles)
      neighboringFloorTiles.forEach((nI) => addNeighboringFloorTiles(nI))
      // const neighbourTypes = neighborIndices.map((i) => tiles[i])
      // console.log(`neighbourTypes`, neighbourTypes)
    }
    addNeighboringFloorTiles(playerIndex)
    console.log(`floor`, floor)

    // result.push(`   <tile type="${type}" />`)
    console.log(`result`, result.join(' \n'))
  }
  return (
    <div className="converter">
      <div>
        input
        <textarea name="" id="" rows={10} value={input} onChange={(e) => setInput(e.target.value)}></textarea>
        <button onClick={handleConvert}>CONVERT</button>
      </div>
      <div>
        output
        <textarea name="" id="" rows={10} value={`012
345
678`}>

        </textarea>

      </div>
    </div>
  )
}

export default Converter
