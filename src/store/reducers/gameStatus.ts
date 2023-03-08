import { Reducer } from 'redux'
import { SET_GAME_STATUS } from '../actions/gameStatus'
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
    case SET_GAME_STATUS: {
      return state
    }
    // case gameActionTypes.RESET_PUZZLE:
    //   return {
    //     ...state,
    //     status: gameStatus.IS_PLAYING,
    //   }
    // case gameActionTypes.SAVE_REVEALED_CELLS:
    //   return {
    //     ...state,
    //     revealedCells: state.revealedCells + action.payload,
    //   }
    // case gameActionTypes.SAVE_COMPLETED_SETS:
    //   return {
    //     ...state,
    //     completedSets: action.payload,
    //   }
    // case timerActionTypes.RESUME_TIMER:
    //   return {
    //     ...state,
    //     status: gameStatus.IS_PLAYING,
    //   }
    default: {
      return state
    }
  }
}

export default gameStatusReducer
