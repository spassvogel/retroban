import { ChangeEventHandler, useMemo } from 'react'
import { LevelDefinition } from '../../hooks/useLevels'

import './levelSelector.scss'

type Props = {
  levels: LevelDefinition[]
  selectedLevel?: string
  onLevelChange: ChangeEventHandler<HTMLSelectElement>
}
// todo: settings
// todo: help

const levelNames: { [key: number]: string } = {
  1: "Storage Unit (easy)",
  2: "Warehouse (medium)",
  3: "Logistic complex (hard)"
}

const LevelSelector = ({ levels, selectedLevel, onLevelChange }: Props) => {
  const groupedLevels = useMemo<Map<number, LevelDefinition[]>>(() => {
    return levels.reduce((acc, value) => {
      if (!acc.has(value.level)) {
        acc.set(value.level, [])
      }
      acc.get(value.level).push(value)
      return acc
    }, new Map())
  }, [levels])

  return (
    <div className="top-bar">
      <select className="level-selector" value={selectedLevel} onChange={onLevelChange}>
        {[...groupedLevels.keys()].map((level) => (
          <optgroup label={levelNames[level]} key={level}>
            {groupedLevels.get(level)?.map((l) => <option key={`${l.path}`} value={`${l.path}`} >{`${formatName(l)}`}</option>)}
          </optgroup>
        ))}
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
