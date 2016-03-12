export const UPDATE = 'UPDATE';

export function update(path, value, stateKey){
  return {
    type: UPDATE,
    path,
    value,
    stateKey
  }
}