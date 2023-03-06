import { useSelector } from "react-redux"
import { RootState } from "../../store/store"
import { getPosition } from "../gridUtilities"

type Props = {
  index: number
  tileSize: number
}
const Tile = ({ index, tileSize }: Props) => {
  const columns = useSelector<RootState, number>(state => state.tiles.columns)
  const { x, y } = getPosition(index, columns)

  return (
    <circle
      data-index={index}
      x={x * tileSize}
      y={y * tileSize}
      width={tileSize}
      height={tileSize}
      className={`player`}
    >
    </circle>
  )
}

export default Tile
