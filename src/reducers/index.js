import { ADD, UPDATE, TOGGLE } from '../actions'
import { update, desimplify } from 'simplifr'

export function reducer(state = {}, action){
  const { path } = action
  if (typeof path === 'undefined') {
    return state
  }
  switch (action.type) {
    case ADD:
      let value
      let data = desimplify(state, action.path)
      if (!isNaN(+action.value) && isFinite(action.value)) {
        value = +action.value
      }
      /* try to parse string to json */
      else {
        try {
          value = JSON.parse(action.value)
        } catch (e){
          throw new Error('Not valid JSON...')
        }
      }
      data[action.key] = value
      return update(Object.assign({}, state), action.path, data)

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