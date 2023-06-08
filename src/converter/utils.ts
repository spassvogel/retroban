import { peekNeighor } from "../grid/utils/grid"
import { TileType } from "../store/reducers/tiles"

const escapeXML = (unsafe: string) => {
  return unsafe.replace(/[<>&'"]/g, (c): string => {
    switch (c) {
      case '<': return '&lt;'
      case '>': return '&gt;'
      case '&': return '&amp;'
      case '\'': return '&apos;'
      case '"': return '&quot;'
    }
    return ''
  })
}


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

export const convertToXML = (levelData: string, name: string, level: string, source?: string, sourceURL?: string, author?: string, authorEmail?: string, solution?: string) => {
  const split = levelData.trimEnd().split('\n')
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
    ...(source ? [`source="${escapeXML(source)}"`] : []),
    ...(sourceURL ? [`sourceURL="${sourceURL}"`] : []),
    ...(author ? [`author="${escapeXML(author)}"`] : []),
    ...(authorEmail ? [`authorEmail="${authorEmail}"`] : []),
  ]

  const result = [
    `<puzzle type="Sokoban" ${attributes.join(' ')} >`,
    `  <tiles>`,
    `    <static>`
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
      return `      <tile type="floor" />`
    }
    return `      <tile type="${TileType[tT]}" />`
  }))
  result.push(`    </static>`)
  result.push(`    <objects>`)
  result.push(`      <object tileIndex="${playerIndex}" type="player" />`)
  result.push(...boxIndices.map((i) => `       <object tileIndex="${i}" type="box" />`))
  result.push(`    </objects>`)
  result.push(`  </tiles>`)
  if (solution) {
    result.push(`  <solutions>`)
    result.push(`    <solution>${solution}</solution>`)
    result.push(`  </solutions>`)
  }
  result.push(`</puzzle>`)

  return result.join(' \n')
}
