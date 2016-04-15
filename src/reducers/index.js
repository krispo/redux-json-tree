import { UPDATE, TOGGLE } from '../actions'

export function reducer(state = {}, action){
  const { path } = action
  if (typeof path === 'undefined') {
    return state
  }
  switch (action.type) {
    case UPDATE:
      return Object.assign({}, state, { [action.path]: isNaN(+action.value) ? action.value : +action.value })
    case TOGGLE:
      return Object.assign({}, state, { [action.path]: Object.assign({}, state[action.path], { expanded: !state[action.path].expanded }) })
    default:
      return state
  }
}