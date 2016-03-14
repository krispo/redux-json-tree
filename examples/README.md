# Redux-Json-Tree-Demo

Main `App` uses 2 components: 

1. standalone `JsonTree` from `redux-json-tree` package
2. and local simple `JsonView`

This example also demonstrates how to use standalone redux component in a simple way.

## Running

1. $npm install
2. $npm start
3. go to `localhost:3000` 

Try to edit some fields in `redux-json-tree` and check how the plain json data will be changed as well.
Single redux store can be used by multiple components. 
In this case, the redux store is used by `JsonTree` and `JsonView` components. 
`JsonTree` components is used for editing the json data, while `JsonView` component is used only for displaying the redux data store.
