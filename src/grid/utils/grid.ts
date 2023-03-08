export const getPosition = (tileIndex: number, columns: number) => {
  return {
    x: tileIndex % columns,
    y: Math.floor(tileIndex / columns)
  }
}


// returns the index of the neighbor of given tileIndex, distance x and y away
// so peekNeighbour(2, 8, 1, 0) will return 3 (the tile to the right of `2`)
//    peekNeighbour(2, 8, 0, 1) will return 10 (the tile below `2`)
// if we would go out of bounds on one of the edges, returns undefined
export const peekNeighor = (tileIndex: number, columns: number, rows: number, xDistance = 0, yDistance = 0) => {
  if (xDistance < 0 && (tileIndex % columns) + xDistance < 0 || xDistance > 0 && (tileIndex % columns) + xDistance >= columns) {
    return undefined
  }
  if (yDistance < 0 && (( tileIndex + yDistance * columns) < 0) || yDistance > 0 && (( tileIndex + yDistance * columns) >= columns * rows) ) {
    return undefined
  }
  return tileIndex + xDistance + yDistance * columns
}
