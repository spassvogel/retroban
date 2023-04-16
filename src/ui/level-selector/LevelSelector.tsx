import { ChangeEventHandler, useEffect, useMemo, useState } from 'react'
import levelJSON from '../../../levels.json'
import { CheckLevelResult, checkLevels } from '../../store/indexedDB'

import './levelSelector.scss'

type Props = {
  currentLevel: string
  onLevelChange: ChangeEventHandler<HTMLSelectElement>
}
// todo: settings
// todo: help
const LevelSelector = ({ currentLevel, onLevelChange }: Props) => {
  const [cacheMap, setCacheMap] = useState<Map<string, CheckLevelResult>>()

  useEffect(() => {
    (async() => {
    // Checks the level status across persisted indexeddb
      const paths = levelJSON.levels.map((l) => l.path)
      const all = await checkLevels(paths)

      if (!all.get(currentLevel)?.cached) {
        all.set(currentLevel, {
          cached: true,
          status: 'IS_PLAYING'
        })
      }
      setCacheMap(all)
    })()
  }, [currentLevel])

  const levels = useMemo(() => {
    if (!cacheMap) {
      return levelJSON.levels
    }
    return levelJSON.levels.map((l) => {
      const cache = cacheMap.get(l.path)
      if (!cache?.cached) {
        return l
      }
      return {
        ...l,
        name: `${l.name} (${cache.status})`
      }
    })
  }, [cacheMap])

  return (
    <div className="top-bar">
      <select className="level-selector" onChange={onLevelChange}>
        {levels.map((l) => <option key={`${l.path}`} value={`${l.path}`}>{`${l.name}`}</option>)}
      </select>
    </div>
  )
}

export default LevelSelector
