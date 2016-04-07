import { UPDATE } from '../actions'
import {update, updateRaw} from 'simplifr'

export function reducer(state = {}, action){
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