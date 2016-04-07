# Redux-Json-Tree

[![NPM Version](http://img.shields.io/npm/v/redux-json-tree.svg?style=flat)](https://www.npmjs.org/package/redux-json-tree)

React/Redux `editable` JSON tree component for deeply nested data, with a single store. It simulates a simple two-way data-binding mechanism. 

### How it works
It works on top of [simplifr](https://github.com/krispo/simplifr). 
In two words, it transforms JSON into a flat structure that describe each node in terms of the (`path`, `description`) pair. 
Where `path` is a json query path of the node, and `description` is a description of the node, eg value, type, list of childs,.. 
For example, suppose we have a json:
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

and then in your code just import `component`, `action` or `reducer` as
```js
import { JsonTree, update, reducer } from 'redux-json-tree'
```
## Example
Online example [here](http://krispo.github.io/redux-json-tree/).

Locally,

1. Clone the repo
2. $npm install
3. $npm start
4. go to `localhost:3000` 

Try to edit some fields in `redux-json-tree` and check how the plain json data will be changed as well.
Single redux store can be used by multiple components. 
In this case, the redux store is used by `JsonTree` and `JsonView` components. 
`JsonTree` components is used for editing the json data, while `JsonView` component is used only for displaying the redux data store.

## Licence
MIT