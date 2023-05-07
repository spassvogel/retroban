import { ChangeEventHandler } from 'react'
import { LevelDefinition } from '../../hooks/useLevels'

import './levelSelector.scss'

type Props = {
  levels: LevelDefinition[]
  selectedLevel?: string
  onLevelChange: ChangeEventHandler<HTMLSelectElement>
}
// todo: settings
// todo: help
const LevelSelector = ({ levels, selectedLevel, onLevelChange }: Props) => {

  return (
    <div className="top-bar">
      <select className="level-selector" value={selectedLevel} onChange={onLevelChange}>
        {levels.map((l) => <option key={`${l.path}`} value={`${l.path}`} >{`${formatName(l)}`}</option>)}
      </select>
    </div>
  )
}

export default LevelSelector

const formatName = (level: LevelDefinition) => {
  if (level.cached) {
    if (level.completed) {
      return `[✓] ${level.name}`
    }
    return `[-] ${level.name}`
  }
  return `[ ] ${level.name}`
}
