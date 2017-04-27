import { combineReducers } from 'redux-immutable'
import { fromJS, Map } from 'immutable'
import sub from 'redux-submarine'

const sourceStage = (state = 'welcomeStage', { type, stage }) => {
  switch (type) {
    case 'WCPM_CHANGE_STAGE':
      return stage
    case 'CLEAR_WIZARD':
      return 'welcomeStage'
    default:
      return state
  }
}

export const submarine = sub()
export const getSourceStage = (state) => submarine(state).get('sourceStage')

export default combineReducers({ sourceStage })

