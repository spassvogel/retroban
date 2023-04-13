import { ChangeEventHandler } from 'react'
import './levelSelector.scss'
import levelJSON from '../../../levels.json'

type Props = {
  onLevelChange: ChangeEventHandler<HTMLSelectElement>
}
// todo: settings
// todo: help
const LevelSelector = ({ onLevelChange }: Props) => {
  return (
    <div className="top-bar">
      <select className="level-selector" onChange={onLevelChange}>
        {levelJSON.levels.map((l) => <option key={`${l}`} value={`${l.path}`}>{`${l.name}`}</option>)}
      </select>
    </div>
  )
}

export default LevelSelector
