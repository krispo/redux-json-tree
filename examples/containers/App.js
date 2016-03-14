import React, { Component } from 'react'
import { connect } from 'react-redux'
import { JsonTree } from 'redux-json-tree'
import JsonView from './JsonView'

class App extends Component {
  constructor(props){
    super(props)
  }
  render(){
    return (
      <table>
        <thead>
          <tr>
            <th>Redux-Json-Tree</th>
            <th>Source Plain Json</th>
          </tr>
        </thead>
        <tbody>
        <tr>
          <td><JsonTree stateKey="simplifiedData"/></td>
          <td><JsonView /></td>
        </tr>
        </tbody>
      </table>
    )
  }
}

export default connect()(App)