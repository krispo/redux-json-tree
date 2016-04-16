const generate = (n, f) => {
  f = f || function(i){return i}
  let arr = [];
  for (let i = 1; i <= n; i++){
    arr.push(f(i))
  }
  return arr;
}

export const data = {
  text: 'hello',
  number: '123',
  object: {
    key1: 'value1',
    array1: generate(5),
    object1: {
      text: 'hi'
    }
  },
  arrayOfObjects: generate(2, (i) => { return { x: i, y: i*i } }),
  arrayOfComplexObjects: generate(2, (i) => {
    return {
      x: i,
      y: generate(2, (i) => { return { x: 'value'+i, y: i*i*i } })
    }
  }),
  largeArray: generate(1000, function(i){
    //return i;
    return {
      x: i,
      y: 2*i
    }
  })
};
