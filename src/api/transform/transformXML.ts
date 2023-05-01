import xmlJs from 'xml-js'
import { ObjectType, TilesStoreState, TileType } from '../../store/reducers/tiles'
import { SokobanStoreState } from '../../store/store'

type Metadata = {
  name: string
}
export type GameDataSokoban = Pick<SokobanStoreState, 'tiles'> & Metadata

const transformSokobanXML = (xmlData: xmlJs.ElementCompact): GameDataSokoban => {
  const tiles = transformTiles(xmlData)
  const name = `${xmlData.puzzle._attributes?.name ?? "unnamed"}`

  return {
    name,
    tiles
  }
}

export default transformSokobanXML


const transformTiles = (xmlData: xmlJs.ElementCompact): TilesStoreState => {
  const result: TilesStoreState = {
    columns: parseInt(xmlData.puzzle._attributes.width, 10),
    static: [],
    objects: []
  }

  if (xmlData.puzzle.tiles.static.tile) {
    result.static = xmlData.puzzle.tiles.static.tile
      .map((xml: xmlJs.ElementCompact) => {
        switch(xml._attributes?.type){
          case 'wall': return TileType.wall
          case 'dropzone': return TileType.dropzone
          case 'floor': return TileType.floor
          case 'empty':
          default: return TileType.empty
        }
      })
  } else {
    console.error('Cannot extract celldata from xml')
  }
  if (xmlData.puzzle.tiles.objects.object) {
    result.objects = xmlData.puzzle.tiles.objects.object
      .map((xml: xmlJs.ElementCompact) => {
        return {
          tileIndex: parseInt(String(xml._attributes?.tileIndex || "0"), 10),
          objectType: xml._attributes?.type === "player" ? ObjectType.player : ObjectType.box,
          initialTileIndex: parseInt(String(xml._attributes?.tileIndex || "0"), 10),
        }
      })
  }
  return result
}
