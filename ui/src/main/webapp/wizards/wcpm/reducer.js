import { combineReducers } from 'redux-immutable'
import { fromJS } from 'immutable'
import sub from 'redux-submarine'

const sourceStage = (state = fromJS(['welcomeStage']), { type, stage }) => {
  switch (type) {
    case 'WCPM_NEXT_STAGE':
      return state.push(stage)
    case 'WCPM_PREV_STAGE':
      return state.pop()
    case 'CLEAR_WIZARD':
    case 'WCPM_RESTART':
      return fromJS(['welcomeStage'])
    default:
      return state
  }
}

const profile = (state = 'saml', { type, profile }) => {
  switch (type) {
    case 'SET_PROFILE':
      return profile
    default:
      return state
  }
}

export const submarine = sub()
export const getWCPMWizardStage = (state) => submarine(state).get('sourceStage').last()
export const getProfile = (state) => submarine(state).get('profile')

export default combineReducers({ sourceStage, profile })

