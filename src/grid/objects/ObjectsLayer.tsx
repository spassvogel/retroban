import { useSelector } from "react-redux"
import { TileObject, ObjectType } from "../../store/reducers/tiles"
import { RootState } from "../../store/store"
import Player from "./Player"

type Props = {
  tileSize: number
}

const ObjectsLayer = ({ tileSize }: Props) => {
  const objects = useSelector<RootState, TileObject[]>(state => state.tiles.objects)


  return (
    <>
      {objects.map((o) => {
        switch(o.objectType) {
          case ObjectType.player: {
            return <Player index={o.tileIndex} tileSize={tileSize} />
          }
        }
      })}
    </>
  )
}

export default ObjectsLayer
