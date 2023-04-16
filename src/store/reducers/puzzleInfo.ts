import { Reducer } from 'redux'
import { INIT_GAME_DATA } from '../actions/game'
import { SokobanAction } from '../actions/types'


export type PuzzleInfoState = {
  name?: string
  isInitialized: boolean // Will be set to true when puzzle data XML is fetched and inserted into store
}

const initialGameData: PuzzleInfoState = {
  isInitialized: false
}

// eslint-disable-next-line default-param-last
const puzzleInfoReducer: Reducer<PuzzleInfoState, SokobanAction> = (state = initialGameData, action) => {
  switch (action.type) {
    case INIT_GAME_DATA: {
      return {
        ...state,
        name: action.payload.name,
        isInitialized: true
      }
    }
  }
  return state
}

export default puzzleInfoReducer
