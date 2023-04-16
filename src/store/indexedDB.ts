import createIdbStorage from '@piotr-cz/redux-persist-idb-storage'
import { openDB, deleteDB, DBSchema } from 'idb'
import { SokobanStoreState } from './store'
import { KEY_PREFIX } from 'redux-persist'
import { GameStatusType } from './reducers/gameStatus'

const DATABASE_NAME = 'sokoban'
const STORE_NAME = 'store'


interface PersistDB extends DBSchema {
  [STORE_NAME]: {
    key: string,
    value: SokobanStoreState
  }
}

export type CheckLevelResult = {
  cached: false
} | {
  cached: true,
  status: GameStatusType
}

const checkLevels = async (paths: string[]) => {
  const map = new Map<string, CheckLevelResult>()
  const db = await openDB<PersistDB>(`${DATABASE_NAME}`, 1)
  const findAndAddToMap = async (path: string) => {
    try {
      const result = await db.get(STORE_NAME, `${KEY_PREFIX}${path}`)
      if (result) {
        map.set(path, {
          cached: true,
          status: result?.gameStatus.status ?? 'IS_PLAYING'
        })
      }
    }
    catch (e) { /* empty */ }
  }
  await Promise.all(paths.map((p) => findAndAddToMap(p)))
  return map
}

const getPersistConfig = (path: string) => ({
  key: path,
  storage: createIdbStorage({name: `${DATABASE_NAME}`, storeName: STORE_NAME}),
  serialize: false,
  deserialize: false,
})

export {
  checkLevels,
  getPersistConfig
}
