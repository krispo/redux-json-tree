export const UPDATE = 'UPDATE';

export function update(path, value){
  return {
    type: UPDATE,
    path,
    value
  }
}