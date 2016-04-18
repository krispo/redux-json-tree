import { ADD_OBJECT, ADD_ARRAY, UPDATE, TOGGLE } from '../actions'
import { add } from 'simplifr'

export function reducer(state = {}, action){
  const { path, value, key } = action

  if (typeof path === 'undefined') {
    return state
  }
  switch (action.type) {
    case ADD_OBJECT:
      return add(Object.assign({}, state), path, { [key]: getValue(value) })

    case ADD_ARRAY:
      return add(Object.assign({}, state), path, getValue(value))

    case UPDATE:
      return Object.assign({}, state, {
        [path]: !isNaN(+value) && isFinite(value) ? +value : value
      })

    case TOGGLE:
      return Object.assign({}, state, {
        [path]: Object.assign({}, state[path], {
          expanded: value === undefined ? !state[path].expanded : value
        })
      })
    default:
      return state
  }
}

function getValue(value){
  let _ = value
  if (!isNaN(+value) && isFinite(value)) {
    _ = +value
  }
  /* try to parse string to json */
  else {
    try {
      _ = JSON.parse(value)
    } catch (e){}
  }
  return _
}