import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react'
import usePrevious from './hooks/usePrevious'
import { Persistor } from 'redux-persist'
import Game from './Game'
import LevelSelector, { levelDescription } from './ui/level-selector/LevelSelector'
import configureStoreAndPersistor from './store/store'
import levelJSON from './levels.json'
import useLevels, { type LevelDefinition } from './hooks/useLevels'
import TopBarButtons from './ui/top-bar/TopBarButtons'

type Props = {
  gameData?: string // gamedata provided as a prop (used in the converters)
}

export const LEVEL_PREVIEW = 'preview'


const App = ({ gameData }: Props) => {
  const defaultSelectedLevel = gameData ? LEVEL_PREVIEW : localStorage.getItem('currentLevel') ?? levelJSON.levels[0].path
  const [selectedLevel, setSelectedLevel] = useState<string>(defaultSelectedLevel)

  const { levels, completeLevel } = useLevels(selectedLevel)

  const handleLevelChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedLevel(e.target.value)
  }

  const gotoNextLevel = useCallback(() => {
    const orderedLevels = orderLevels(levels, selectedLevel)
    const nextLevel = orderedLevels.find((l) => !l.completed)
    if (nextLevel) {
      setSelectedLevel(nextLevel.path)
    }
  }, [levels, selectedLevel])

  let previousPersistor: Persistor | undefined = undefined
  const { store, persistor } = useMemo(() => {
    if (!selectedLevel) {
      return {
        store: undefined,
        persistor: undefined
      }
    }

    if (previousPersistor) {
      // we already have a persistor, flush it!
      previousPersistor.flush()
    }
    return configureStoreAndPersistor(selectedLevel)
  }, [previousPersistor, selectedLevel])

  previousPersistor = usePrevious(persistor)

  useEffect(() => {
    const level = levels.find((l) => l.path === selectedLevel)
    if (!level) {
      document.title = 'Sokoban'
      return
    }
    const { name } = level
    const displayLevel = levelDescription[level.level]
    document.title = `Sokoban - ${name} (${displayLevel})`
  }, [levels, selectedLevel])

  useEffect(() => {
    localStorage.setItem('currentLevel', selectedLevel)
  }, [selectedLevel])

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const theme = urlParams.get('theme')
    if (theme) {
      document.documentElement.classList.add(`theme-${theme}`)
    }
  }, [])

  if (selectedLevel && store && persistor) {
    return (
      <Provider store={store}>
        <PersistGate loading={<div>loading</div>} persistor={persistor}>
          <div className="top-bar">
            {!gameData && <LevelSelector selectedLevel={selectedLevel} onLevelChange={handleLevelChange} levels={levels} /> }
            <TopBarButtons gotoNextLevel={gotoNextLevel} selectedLevel={selectedLevel} />
          </div>
          <Game
            gameData={gameData}
            path={selectedLevel}
            gotoNextLevel={gotoNextLevel}
            completeLevel={() => completeLevel(selectedLevel)}
          />
        </PersistGate>
      </Provider>
    )
  }
  return (
    <div className="top-bar">
      {!gameData && <LevelSelector selectedLevel={selectedLevel} onLevelChange={handleLevelChange} levels={levels} /> }
    </div>
  )
}

// orders the levels such that the first level is the level *after* the current level
// so when we try to find the next available uncompleted level we always search forwards!
const orderLevels = (levels: LevelDefinition[], selectedLevel: string) => {
  const selectedLevelsIndex = levels.findIndex((l) => l.path === selectedLevel)
  return [
    ...levels.slice(selectedLevelsIndex + 1),
    ...levels.slice(0, selectedLevelsIndex),
  ]
}

export default App
