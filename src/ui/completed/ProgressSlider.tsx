import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SokobanStoreState } from '../../store/store'
import { ChangeEvent } from 'react'
import { setPlayhead } from '../../store/actions/replay'

import './progress-slider.scss'


const ProgressSlider = () => {
  const actions = useSelector<SokobanStoreState, string>(state => state.userAction.actions)
  const playhead = useSelector<SokobanStoreState, number>(state => state.userAction.playhead)
  const dispatch = useDispatch()

  const handleSliderChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setPlayhead(parseInt(e.target.value, 10)))
  }

  return (
    <div className="progress-slider">
      <input className="progress-slider__control" type="range" min="0" max={actions.length} step="1" value={playhead} onChange={handleSliderChange}></input>
    </div>
  )
}

export default ProgressSlider
