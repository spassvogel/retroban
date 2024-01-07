import { Reducer } from 'redux'
import { INIT_GAME_DATA } from '../actions/game'
import { SokobanAction } from '../actions/types'


export type PuzzleInfoState = {
  name?: string
  isInitialized: boolean // Will be set to true when puzzle data XML is fetched and inserted into store
  level: number
  source: string
  sourceURL: string
  author: string
  authorEmail: string
}

const initialGameData: PuzzleInfoState = {
  isInitialized: false,
  level: -1,
  source: '',
  sourceURL: '',
  author: '',
  authorEmail: '',
}

// eslint-disable-next-line default-param-last
const puzzleInfoReducer: Reducer<PuzzleInfoState, SokobanAction> = (state = initialGameData, action) => {
  switch (action.type) {
    case INIT_GAME_DATA: {
      return {
        ...state,
        isInitialized: true,
        name: action.payload.name,
        level: action.payload.level,
        source: action.payload.source,
        sourceURL: action.payload.sourceURL,
        author: action.payload.author,
        authorEmail: action.payload.authorEmail,
      }
    }
  }
  return state
}

export default puzzleInfoReducer
