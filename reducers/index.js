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
export default function(state = {}, action){
  const { path } = action
  if (typeof path === 'undefined') {
    return state
  }

  return Object.assign({}, state, {
    data: node(state.data, action),
    simplifiedData: update(
      Object.assign({}, state.simplifiedData),
      action.path,
      isNaN(+action.value) ? action.value : +action.value
    )
  })
}