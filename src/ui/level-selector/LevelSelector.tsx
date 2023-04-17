import { ChangeEventHandler, useEffect, useMemo, useState } from 'react'
import levelJSON from '../../../levels.json'
import { CheckLevelResult, checkLevels } from '../../store/indexedDB'
import { LevelDefinition } from '../../hooks/useLevels'

import './levelSelector.scss'

type Props = {
  levels: LevelDefinition[]
  onLevelChange: ChangeEventHandler<HTMLSelectElement>
}
// todo: settings
// todo: help
const LevelSelector = ({ levels, onLevelChange }: Props) => {

  return (
    <div className="top-bar">
      <select className="level-selector" onChange={onLevelChange}>
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
