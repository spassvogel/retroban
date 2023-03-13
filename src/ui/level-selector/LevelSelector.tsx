import { ChangeEventHandler } from 'react'
import './levelSelector.scss'

type Props = {
  onLevelChange: ChangeEventHandler<HTMLSelectElement>
}
// todo: settings
// todo: help
const LevelSelector = ({ onLevelChange }: Props) => {
  return (
    <div className="top-bar">
      <select className="level-selector" onChange={onLevelChange}>
        <option value="level1">Level 1</option>
        <option value="level2">Level 2</option>
      </select>
    </div>
  )
}

export default LevelSelector
