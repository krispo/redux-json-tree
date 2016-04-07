import React, { Component } from 'react'
import { connect } from 'react-redux'
import { JsonTree } from '../../src'
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
          <td><JsonTree path="root"/></td>
          <td><JsonView path="root"/></td>
        </tr>
        </tbody>
      </table>
    )
  }
}

export default connect()(App)