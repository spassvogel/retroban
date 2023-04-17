import { useState, useEffect, useMemo } from "react"
import { CheckLevelResult, checkLevels } from "../store/indexedDB"
import levelJSON from '../../levels.json'

export type LevelDefinition = {
  name: string
  path: string
  cached?: boolean
  completed?: boolean
}

const useLevels = (currentLevel: string): LevelDefinition[] => {
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
        cached: true,
        completed: cache.status === 'IS_SOLVED'
      }
    })
  }, [cacheMap])

  return levels
}

export default useLevels

