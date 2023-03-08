import { useSelector } from "react-redux"
import { RootState } from "../../store/store"
import { getPosition } from "../utils/grid"

import './box.scss'

type Props = {
  index: number
  tileSize: number
}
const MARGIN = 0.1

const Box = ({ index, tileSize }: Props) => {
  const columns = useSelector<RootState, number>(state => state.tiles.columns)
  const { x, y } = getPosition(index, columns)

  return (
    <rect
      data-index={index}
      x={x * tileSize + (tileSize * MARGIN)}
      y={y * tileSize + (tileSize * MARGIN)}
      width={tileSize  * (1 - MARGIN * 2)}
      height={tileSize * (1 - MARGIN * 2)}
      className={`object object--type-box`}
      >
    </rect>
  )
}

export default Box
