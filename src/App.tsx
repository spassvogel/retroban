import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react'
import usePrevious from './hooks/usePrevious'
import { Persistor } from 'redux-persist'
import Game from './Game'
import LevelSelector from './ui/level-selector/LevelSelector'
import configureStoreAndPersistor from './store/store'
import levelJSON from '../levels.json'
import useLevels from './hooks/useLevels'

type Props = {
  gameData?: string
}

export const LEVEL_PREVIEW = 'preview'


const App = ({ gameData }: Props) => {
  const defaultSelectedLevel = gameData ? LEVEL_PREVIEW : levelJSON.levels[0].path
  const [selectedLevel, setSelectedLevel] = useState<string>(defaultSelectedLevel)

  const levels = useLevels(selectedLevel)

  const handleLevelChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedLevel(e.target.value)
  }

  const gotoNextLevel = useCallback(() => {
    const nextLevel = levels.find((l) => !l.completed && l.path !== selectedLevel)
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
    const name = levels.find((l) => l.path === selectedLevel)?.name
    document.title = `Sokoban - ${name}`
  }, [levels, selectedLevel])

  return (
    <>
      {!gameData && <LevelSelector selectedLevel={selectedLevel} onLevelChange={handleLevelChange} levels={levels} /> }
      {selectedLevel && store && persistor && (
        <Provider store={store}>
          <PersistGate loading={<div>loading</div>} persistor={persistor}>
            <Game
              gameData={gameData}
              path={selectedLevel}
              gotoNextLevel={gotoNextLevel}
            />
          </PersistGate>
        </Provider>
        )}
    </>
  )
}


export default App
