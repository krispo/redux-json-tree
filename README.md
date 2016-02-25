# Redux-Json-Tree

React/Redux `editable` JSON tree component for deeply nested data, with a single store. 
Unlike [normalizr](https://github.com/gaearon/normalizr) principals, it works directly with a row JSON, and instead of `id`'s React component save a `path` to a specific field of JSON.
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
We can specify a `path` to the `key011` field in a way:
 
    root_key0_key01_1_key011 
    
and then use this `path` to handle the value of this field in React component props and Redux reducers. It's a very short description.   

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