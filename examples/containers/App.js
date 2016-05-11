import React, { Component } from 'react'
import { connect } from 'react-redux'
import { JsonTree } from '../../src'
import JsonView from './JsonView'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      useJsonView: true
    }
    this.checkboxOnChange = this.checkboxOnChange.bind(this)
  }
  checkboxOnChange(){
    this.setState({
      useJsonView: !this.state.useJsonView
    })
  }
  render(){
    return (
      <table>
        <thead>
          <tr>
            <th>Redux-Json-Tree</th>
            <th><input type="checkbox" checked={this.state.useJsonView} onChange={this.checkboxOnChange}/> Source Plain Json</th>
          </tr>
        </thead>
        <tbody>
        <tr>
          <td><JsonTree path="root" initExpandedLevel={2}/></td>
          <td><JsonView path="root" visible={this.state.useJsonView}/></td>
        </tr>
        </tbody>
      </table>
    )
  }
}

export default connect()(App)