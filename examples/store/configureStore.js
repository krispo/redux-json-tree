import { createStore, combineReducers } from 'redux'
import {simplifiedReducer, rawReducer} from '../reducers'

export default function configureStore(initialState){
  const store = createStore(
    combineReducers({
      data: rawReducer,
      simplifiedData: simplifiedReducer
    }), initialState)

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers').default
      store.replaceReducer(nextReducer)
    })
  }

  return store
}