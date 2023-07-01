import { useMemo } from "react"
import { useSelector } from "react-redux"
import { SokobanStoreState } from "../store/store"
import { ObjectType, TileObject, TilesStoreState } from "../store/reducers/tiles"
import { peekNeighor } from "../utils/grid"
import { DIRECTION, Direction } from "../store/utils/moves"


// Will return a value indicating whether the player is currently right next to a box
const useIsAtBox = (x: number, y: number, index: number, orientation: Direction) => {
  const { columns, static: staticTiles } = useSelector<SokobanStoreState, TilesStoreState>(state => state.tiles)
  const objects = useSelector<SokobanStoreState, TileObject[]>(state => state.tiles.objects)

  const isAtBox = useMemo(() => {
    const rows = staticTiles.length / columns
    const { x, y } = DIRECTION[orientation]
    const destination = peekNeighor(index, columns, rows, x, y)

    return !!objects.find((o) => o.tileIndex === destination && o.objectType === ObjectType.box)
  }, [columns, orientation, index, objects, staticTiles.length])

  return isAtBox
}

export default useIsAtBox
