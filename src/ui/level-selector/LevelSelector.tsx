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
  1: "Storage Unit",
  2: "Warehouse",
  3: "Logistic complex"
}

const levelDescription: { [key: number]: string } = {
  1: "easy",
  2: "medium",
  3: "hard"
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
    <select className="level-selector" value={selectedLevel} onChange={onLevelChange}>
      {[...groupedLevels.keys()].map((level) => (
        <optgroup label={`${levelNames[level]} (${levelDescription[level]})`} key={level}>
          {groupedLevels.get(level)?.map((l) => <option key={`${l.path}`} value={`${l.path}`} >{`${formatName(l)}`}</option>)}
        </optgroup>
      ))}
    </select>
  )
}

export default LevelSelector

const formatName = (level: LevelDefinition) => {
  const name = `${levelNames[level.level]} ${level.name}`
  if (level.cached) {
    if (level.completed) {
      return `[✓] ${name}`
    }
    return `[-] ${name}`
  }
  return `[ ] ${name}`
}
