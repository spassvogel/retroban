import { Reducer } from 'redux'
import { INIT_GAME_DATA, RESET_PUZZLE, SET_GAME_STATUS } from '../actions/game'
import { SokobanAction } from '../actions/types'

export enum GameStatus {
  IS_PLAYING = 'IS_PLAYING',
  IS_FILLED = 'IS_FILLED',
  IS_SOLVED = 'IS_SOLVED',
}

export type GameStatusType = keyof typeof GameStatus

export type GameStatusState = {
  status: GameStatusType
  isInitial: boolean
}

const initialGameData: GameStatusState = {
  status: GameStatus.IS_PLAYING,
  isInitial: true,
}

// eslint-disable-next-line default-param-last
const gameStatusReducer: Reducer<GameStatusState> = (state = initialGameData, action: SokobanAction) => {
  switch (action.type) {
    case RESET_PUZZLE:
    case INIT_GAME_DATA: {
      return initialGameData
    }

    case SET_GAME_STATUS: {
      return {
        ...state,
        status: action.payload.status
      }
    }
    default: {
      return state
    }
  }
}

export default gameStatusReducer
