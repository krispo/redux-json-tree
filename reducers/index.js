import { UPDATE } from '../actions'

function node(state, action){
  switch (action.type) {
    case UPDATE: {
      function deep(cs, p){
        if (p.length>1){
          const key = p.shift();
          deep(cs[key], p)
        } else {
          const v = isNaN(+action.value) ? action.value : +action.value;
          return cs[p.shift()] = v
        }
      }
      const path_sequence = action.path.split('_').slice(1);
      deep(state, path_sequence);
      return state
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

  return Object.assign({}, state, node(state, action))
}