import { useSelector } from "react-redux"
import { TileObject, ObjectType } from "../../store/reducers/tiles"
import { SokobanStoreState } from "../../store/store"
import Box from "./Box"
import Player from "./Player"

type Props = {
  tileSize: number
}

const ObjectsLayer = ({ tileSize }: Props) => {
  const objects = useSelector<SokobanStoreState, TileObject[]>(state => state.tiles.objects)

  return (
    <>
      {objects.map((o, i) => {
        switch(o.objectType) {
          case ObjectType.player: {
            return <Player index={o.tileIndex} tileSize={tileSize} key="player"/>
          }
          case ObjectType.box: {
            return <Box index={o.tileIndex} tileSize={tileSize} key={`box${i}`}/>
          }
        }
      })}
    </>
  )
}

export default ObjectsLayer
