import { useSelector } from "react-redux"
import { Object, ObjectType } from "../../store/reducers/tiles"
import { RootState } from "../../store/store"
import Player from "./Player"

type Props = {
  tileSize: number
}

const ObjectsLayer = ({ tileSize }: Props) => {
  const columns = useSelector<RootState, number>(state => state.tiles.columns)
  const objects = useSelector<RootState, Object[]>(state => state.tiles.objects)


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
