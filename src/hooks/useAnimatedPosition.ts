import { useSelector } from "react-redux"
import { SokobanStoreState } from "../store/store"
import { TilesStoreState } from "../store/reducers/tiles"
import { getPosition } from "../utils/grid"
import { useEffect, useState } from "react"

// Will return the x and y of the item indicated by `index` but delayed by one frame
// when a change occurs, will first cancel all animations on `ref`. The reason for this is we dont want to have
// two animations running at the same time
const useAnimatedPosition = (index: number, ref: React.RefObject<SVGGElement>) => {
  const { columns } = useSelector<SokobanStoreState, TilesStoreState>(state => state.tiles)
  const { x, y } = getPosition(index, columns)
  const [animatedPosition, setPosition] = useState({ x, y })

  useEffect(() => {
    ref.current?.classList.add(`object--cancel-anim`)
    requestAnimationFrame(() => {
      setPosition({ x, y })
    })
  }, [ref, x, y])

  useEffect(() => {
    ref.current?.classList.remove(`object--cancel-anim`)
  }, [animatedPosition, ref])

  return animatedPosition
}

export default useAnimatedPosition
