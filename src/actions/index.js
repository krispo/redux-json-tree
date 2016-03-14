export const UPDATE = 'UPDATE';

export default function update(path, value, stateKey){
  return {
    type: UPDATE,
    path,
    value,
    stateKey
  }
}