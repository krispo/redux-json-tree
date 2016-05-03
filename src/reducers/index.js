import { ADD_OBJECT, ADD_ARRAY, UPDATE, REMOVE_OBJECT, REMOVE_ARRAY, TOGGLE } from '../actions'
import { add, update, remove, desimplify } from 'simplifr'

export function reducer(state = {}, action){
  const { path, value, key } = action

  if (typeof path === 'undefined') {
    return state
  }
  switch (action.type) {
    case ADD_OBJECT:
      if (key === '') return state
      return add(Object.assign({}, state), path, { [key]: getValue(value) })

    case ADD_ARRAY:
      return add(Object.assign({}, state), path, getValue(value))

    case UPDATE:
      return Object.assign({}, state, {
        [path]: !isNaN(+value) && isFinite(value) ? +value : value
      })

    case REMOVE_OBJECT:
      return remove(Object.assign({}, state), path)

    case REMOVE_ARRAY:
      const expanded = state[path].expanded
      let array = desimplify(state, path)
      array.splice(key, 1)
      let newState = update(Object.assign({}, state), path, array)
      newState[path].expanded = expanded
      return newState

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