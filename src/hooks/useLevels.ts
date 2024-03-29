import { useState, useEffect, useMemo, useCallback } from "react"
import { CheckLevelResult, checkLevels } from "../store/indexedDB"
import levelJSON from '../levels.json'

export type LevelDefinition = {
  name: string
  path: string
  level: number
  cached?: boolean
  completed?: boolean
}


const useLevels = (currentLevel: string) => {
  const [cacheMap, setCacheMap] = useState<Map<string, CheckLevelResult>>()
  const [justCompleted, setJustCompleted] = useState<string>()  // this will allow us to directly update the completed state
                                                                // in the level selector, even before the redux store is persisted!
  const completeLevel = useCallback((level: string) => {
    setJustCompleted(level)
  }, [])

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
      if (l.path === justCompleted) {
        return {
          ...l,
          cached: true,
          completed: true
        }
      }
      if (!cache?.cached) {
        return l
      }
      return {
        ...l,
        cached: true,
        completed: cache.status === 'IS_SOLVED'
      }
    })
  }, [cacheMap, justCompleted])

  return { levels, completeLevel }
}

export default useLevels

