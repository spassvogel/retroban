import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SokobanStoreState } from '../../store/store'
import { ChangeEvent, useEffect, useRef } from 'react'
import { setPlayhead } from '../../store/actions/replay'

import './progress-slider.scss'


const ProgressSlider = () => {
  const actions = useSelector<SokobanStoreState, string>(state => state.userAction.actions)
  const playhead = useSelector<SokobanStoreState, number>(state => state.userAction.playhead)
  const dispatch = useDispatch()
  const ref = useRef<HTMLInputElement>(null)

  const handleSliderChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setPlayhead(+e.target.value, playhead, actions))
  }

  return (
    <div className="progress-slider">
      {`Move ${playhead}`}
      <input
        ref={ref}
        className="progress-slider__control"
        type="range"
        min="0"
        max={actions.length}
        step="1"
        value={playhead}
        onChange={handleSliderChange}>
      </input>
    </div>
  )
}

export default ProgressSlider
