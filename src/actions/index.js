export const ADD = 'ADD'
export const UPDATE = 'UPDATE'
export const TOGGLE = 'TOGGLE'

export function add(path, key, value){
  return {
    type: ADD,
    path,
    key,
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

export function toggle(path, value){
  return {
    type: TOGGLE,
    path,
    value
  }
}