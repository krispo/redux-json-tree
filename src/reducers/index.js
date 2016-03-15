import { UPDATE } from '../actions'
import {update, updateRaw} from 'simplifr'

function node(state, action){
  switch (action.type) {
    case UPDATE: {
      const value = isNaN(+action.value) ? action.value : +action.value;
      return updateRaw(state, action.path, value)
    }
    default:
      return state
  }
}
export function simplifiedReducer(state = {}, action){
  const { path } = action
  if (typeof path === 'undefined') {
    return state
  }
  return update(
    Object.assign({}, state),
    action.path,
    isNaN(+action.value) ? action.value : +action.value
  )
}

export function rawReducer(state = {}, action){
  const { path } = action
  if (typeof path === 'undefined') {
    return state
  }
  return Object.assign({}, state, node(state, action))
}
