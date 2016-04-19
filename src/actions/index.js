export const ADD_OBJECT = 'ADD_OBJECT'
export const ADD_ARRAY = 'ADD_ARRAY'
export const UPDATE = 'UPDATE'
export const REMOVE = 'REMOVE'
export const TOGGLE = 'TOGGLE'

export function add_object(path, value, key){
  return {
    type: ADD_OBJECT,
    path,
    key,
    value
  }
}

export function add_array(path, value){
  return {
    type: ADD_ARRAY,
    path,
    value
  }
}

export function update(path, value){
  return {
    type: UPDATE,
    path,
    value
  }
}

export function remove(path){
  return {
    type: REMOVE,
    path
  }
}


export function toggle(path, value){
  return {
    type: TOGGLE,
    path,
    value
  }
}