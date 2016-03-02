# Redux-Json-Tree

React/Redux `editable` JSON tree component for deeply nested data, with a single store. It simulates a simple two-way data-binding mechanism. 

Unlike [normalization](https://github.com/gaearon/normalizr) according to a schema, we transform JSON into a flat structure that describe each field in terms of the `path` and value, or `path` and list of childs. Read more about [simplifr](https://github.com/krispo/simplifr).
For example, suppose we have a json:
```js
{
  key0: {
    key00: 'val00',
    key01: [
      { key010: 'val010'},
      { key011: 'val010'}
    ]
  }
}
```
For each `(key, value)` field we can specify the corresponding `(path, value)` pair in a flat structure. Eg, the field
   
    { key011: 'val010' }
 
will be transformed into

    ('root.key0.key01.1.key011', 'val010')

pair. 

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