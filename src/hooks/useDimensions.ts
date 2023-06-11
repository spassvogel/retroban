import { useSelector } from "react-redux"
import { ObjectType, TileObject, TileType } from "../store/reducers/tiles"
import { SokobanStoreState } from "../store/store"
import { useMemo } from "react"
import { getPosition } from "../grid/utils/grid"

export const useDimensions = () => {
  const columns = useSelector<SokobanStoreState, number>(state => state.tiles.columns)
  const staticTiles = useSelector<SokobanStoreState, TileType[]>(state => state.tiles.static)
  const objects = useSelector<SokobanStoreState, TileObject[]>(state => state.tiles.objects)
  const tileSize = 100 / columns


  const player = useMemo(() => {
    return objects.find(o => o.objectType === ObjectType.player)
  }, [objects])


  const maxHorizontalTilesInViewport = 10
  const zoomedIn = columns > maxHorizontalTilesInViewport
  const playerPosition = getPosition(player?.tileIndex ?? 1, columns)

  let viewBoxHeight = Math.floor(staticTiles.length / columns ) * tileSize
  let zoomBoxX = 0
  let scale = 1

  if (zoomedIn) {
    let tileStartX = Math.floor(playerPosition.x - (maxHorizontalTilesInViewport / 2))
    if (tileStartX < 0) {
      tileStartX = 0
    }
    if (tileStartX > columns - Math.ceil((maxHorizontalTilesInViewport))) {
      tileStartX = columns - Math.ceil((maxHorizontalTilesInViewport))
    }

    zoomBoxX = -tileStartX * tileSize


    scale = columns / maxHorizontalTilesInViewport
    viewBoxHeight *= scale
  }



  // console.log(playerPosition)
  return {
    tileSize,
    zoomBoxTransform: `scale(${scale}) translate(${zoomBoxX}px  , 0)`,
    viewBox: `0 0 100 ${isNaN(viewBoxHeight) ? 100 : viewBoxHeight}`
    // viewBox: `${viewBoxMinX} 0 ${viewBoxWidth} 100`
  }
}

// todo: we cant animate the viewbox. set transform instead?
// https://codepen.io/gc-nomade/pen/vYZwqr
