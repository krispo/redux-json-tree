# Redux-Json-Tree

React/Redux `editable` JSON tree component for deeply nested data, with a single store. It simulates a simple two-way data-binding mechanism. 

Unlike [normalization](https://github.com/gaearon/normalizr) according to a schema, we transform JSON into a flat structure that describe each field in terms of the (`path`, `description`). 
Where `path` is a json query path to the field, and `description` is a description of the field, eg value, type, list of childs,.. Read more about [simplifr](https://github.com/krispo/simplifr).
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
For the field `buz: [...]` consider a (path, description) pair as

    ('root.foo.buz', { type: 'array', childs: [0, 1] })
 
For the field `key2: 'v2'` consider 

    ('root.foo.buz.1.key2', 'v2')

## Usage

For now, 

1. Clone the repo
2. npm install
3. npm start
    
and go to `localhost:3000`.

Try to edit some fields in `redux-json-tree` and check how the plain json data will be changed as well.
Single redux store can be used by multiple components. 
In this case, the redux store is used by `JsonTree` and `JsonView` components. 
`JsonTree` components is used for editing the json data, while `JsonView` component is used only for displaying the redux data store.

## Licence
MIT