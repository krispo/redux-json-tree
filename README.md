# Redux-Json-Tree

[![NPM Version](http://img.shields.io/npm/v/redux-json-tree.svg?style=flat)](https://www.npmjs.org/package/redux-json-tree)

React/Redux `editable` JSON tree component for deeply nested data, with a single store. It simulates a simple two-way data-binding mechanism. 

Unlike [normalization](https://github.com/gaearon/normalizr) according to a schema, we transform JSON into a flat structure that describe each node in terms of the (`path`, `description`). 
Where `path` is a json query path of the node, and `description` is a description of the node, eg value, type, list of childs,.. Read more about [simplifr](https://github.com/krispo/simplifr).
Eg, suppose we have a json:
```js
{
  foo: {
    bar: 3,
    buz: [
      { key1: 'v1'},
      { key2: 'v2'}
    ]
  }
}
```
For the node `buz: [...]` consider a (path, description) pair as

    ('root.foo.buz', { type: 'array', childs: [0, 1] })
 
For the node `key2: 'v2'` we have 

    ('root.foo.buz.1.key2', 'v2')

## Install

    npm install redux-json-tree

## Example
Online example [here](http://krispo.github.io/redux-json-tree/).

Locally,

1. Clone the repo
2. $cd examples
3. $npm install
4. $npm start
5. go to `localhost:3000` 

Try to edit some fields in `redux-json-tree` and check how the plain json data will be changed as well.
Single redux store can be used by multiple components. 
In this case, the redux store is used by `JsonTree` and `JsonView` components. 
`JsonTree` components is used for editing the json data, while `JsonView` component is used only for displaying the redux data store.

## Licence
MIT