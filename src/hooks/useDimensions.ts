import { useSelector } from "react-redux"
import { ObjectType, TileObject, TileType } from "../store/reducers/tiles"
import { SokobanStoreState } from "../store/store"
import { useMemo } from "react"
import { getPosition } from "../utils/grid"
import { ZOOMLEVEL_MAX } from "../store/reducers/settings"
import { lerp } from "../utils/lerp"


const BASE_HORIZONTAL_TILES_IN_VIEWPORT = 8 // max amount of horizontal tiles visible at zoomLevel 0

export const useDimensions = () => {
  const columns = useSelector<SokobanStoreState, number>(state => state.tiles.columns)
  const staticTiles = useSelector<SokobanStoreState, TileType[]>(state => state.tiles.static)
  const objects = useSelector<SokobanStoreState, TileObject[]>(state => state.tiles.objects)
  const zoomLevel = useSelector<SokobanStoreState, number>(state => state.settings.zoomLevel)
  const tileSize = 100 / columns

  const player = useMemo(() => {
    return objects.find(o => o.objectType === ObjectType.player)
  }, [objects])

  // interpolate between BASE_HORIZONTAL_TILES_IN_VIEWPORT and the actual width of the puzzle, based on zoomLevel
  const maxHorizontalTilesInViewport = lerp(BASE_HORIZONTAL_TILES_IN_VIEWPORT, columns, zoomLevel / ZOOMLEVEL_MAX)
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
