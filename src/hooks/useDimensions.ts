import { useSelector } from "react-redux"
import { ObjectType, TileObject, TileType } from "../store/reducers/tiles"
import { SokobanStoreState } from "../store/store"
import { useMemo } from "react"
import { getPosition } from "../utils/grid"
import { ZOOMLEVEL_MAX } from "../store/reducers/settings"
import { lerp } from "../utils/lerp"


const BASE_HORIZONTAL_TILES_IN_VIEWPORT = 8 // max amount of horizontal tiles visible at zoomLevel 0
const BASE_VERTICAL_TILES_IN_VIEWPORT = 8 // max amount of vertical tiles visible at zoomLevel 0

export const useDimensions = () => {
  const columns = useSelector<SokobanStoreState, number>(state => state.tiles.columns)
  const staticTiles = useSelector<SokobanStoreState, TileType[]>(state => state.tiles.static)
  const rows = staticTiles.length / columns
  const objects = useSelector<SokobanStoreState, TileObject[]>(state => state.tiles.objects)
  const zoomLevel = useSelector<SokobanStoreState, number>(state => state.settings.zoomLevel)
  const tileSize = Math.min(100 / columns, 100 / rows)

  const player = useMemo(() => {
    return objects.find(o => o.objectType === ObjectType.player)
  }, [objects])

  // interpolate between BASE_HORIZONTAL_TILES_IN_VIEWPORT and the actual width of the puzzle, based on zoomLevel
  const maxHorizontalTilesInViewport = Math.ceil(lerp(BASE_HORIZONTAL_TILES_IN_VIEWPORT, columns, zoomLevel / ZOOMLEVEL_MAX))
  // interpolate between BASE_VERTICAL_TILES_IN_VIEWPORT and the actual height of the puzzle, based on zoomLevel
  const maxVerticalTilesInViewport = Math.ceil(lerp(BASE_VERTICAL_TILES_IN_VIEWPORT, rows, zoomLevel / ZOOMLEVEL_MAX))
  const zoomedIn = (columns > maxHorizontalTilesInViewport || rows > maxVerticalTilesInViewport)
  const playerPosition = getPosition(player?.tileIndex ?? 1, columns)

  let zoomBoxX = 0
  let zoomBoxY = 0
  let scale = 1

  if (zoomedIn) {
    let tileStartX = Math.max(Math.floor(playerPosition.x - (maxHorizontalTilesInViewport / 2)), 0)
    if (tileStartX > columns - Math.ceil((maxHorizontalTilesInViewport))) {
      // constrain viewport horizontal
      tileStartX = columns - Math.ceil((maxHorizontalTilesInViewport))
    }
    zoomBoxX = -tileStartX * tileSize

    let tileStartY = Math.max(Math.floor(playerPosition.y - (maxVerticalTilesInViewport / 2)), 0)
    if (tileStartY > rows - Math.ceil((maxVerticalTilesInViewport))) {
      // contstrain viewport vertical
      tileStartY = rows - Math.ceil((maxVerticalTilesInViewport))
    }
    zoomBoxY = -tileStartY * tileSize

    const scaleHorizontal = columns / maxHorizontalTilesInViewport
    const scaleVertical = rows / maxVerticalTilesInViewport

    scale = Math.max(scaleHorizontal, scaleVertical)
  }

  const canZoomIn = zoomLevel > 0
  // the second condition is in case the `columns` = BASE_HORIZONTAL_TILES_IN_VIEWPORT + 1
  // in which case zooming in to level 1 and level 2 would be the same
  // todo: not sure if this is still needed
  // const canZoomOut = maxHorizontalTilesInViewport < columns && (zoomLevel === 0 || columns - maxHorizontalTilesInViewport > 0)
  const canZoomOut = zoomedIn

  const centerVertical = Math.max(Math.ceil((maxHorizontalTilesInViewport - maxVerticalTilesInViewport) / 2), 0)
  const centerHorizontal = Math.max(Math.ceil((maxVerticalTilesInViewport - maxHorizontalTilesInViewport) / 2), 0)


  // todo: a bug at persist:xml/level1440.xml
  return {
    zoomedIn,
    canZoomIn,
    canZoomOut,
    tileSize,
    zoomBoxTransform: `scale(${scale}) translate(${zoomBoxX}px, ${zoomBoxY}px)`,
    viewBox: `${centerHorizontal * -tileSize} ${centerVertical * -tileSize} 100 100`
  }
}
