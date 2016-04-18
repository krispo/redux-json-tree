import { ADD, UPDATE, TOGGLE } from '../actions'
import { add } from 'simplifr'

export function reducer(state = {}, action){
  const { path } = action
  if (typeof path === 'undefined') {
    return state
  }
  switch (action.type) {
    case ADD:
      let value = action.value
      if (!isNaN(+action.value) && isFinite(action.value)) {
        value = +action.value
      }
      /* try to parse string to json */
      else {
        try {
          value = JSON.parse(action.value)
        } catch (e){}
      }
      return add(Object.assign({}, state), action.path, { [action.key]: value })

    case UPDATE:
      return Object.assign({}, state, {
        [action.path]: !isNaN(+action.value) && isFinite(action.value) ? +action.value : action.value
      })

    case TOGGLE:
      return Object.assign({}, state, {
        [action.path]: Object.assign({}, state[action.path], {
          expanded: action.value === undefined ? !state[action.path].expanded : action.value
        })
      })
    default:
      return state
  }
}