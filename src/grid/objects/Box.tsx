import { useSelector } from "react-redux"
import { SokobanStoreState } from "../../store/store"
import { getPosition } from "../../utils/grid"

import './box.scss'
import { CSSProperties } from "react"

type Props = {
  index: number
  tileSize: number
}
const MARGIN = 0.05

const Box = ({ index, tileSize }: Props) => {
  const columns = useSelector<SokobanStoreState, number>(state => state.tiles.columns)
  const { x, y } = getPosition(index, columns)

  return (
    // <rect
    //   data-index={index}
    //   x={x * tileSize + (tileSize * MARGIN)}
    //   y={y * tileSize + (tileSize * MARGIN)}
    //   width={tileSize  * (1 - MARGIN * 2)}
    //   height={tileSize * (1 - MARGIN * 2)}
    //   >
    <image href="img/crate.png"
      className={`object object--type-box`}
      style={({
        '--x': `${x * tileSize + (tileSize * MARGIN)}px`,
        '--y': `${y * tileSize + (tileSize * MARGIN)}px`,
      }) as CSSProperties}
        width={tileSize  * (1 - MARGIN * 2)}
        height={tileSize * (1 - MARGIN * 2)}
        ></image>
    // </rect>
  )
}

export default Box
