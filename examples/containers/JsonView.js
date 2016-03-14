import React, { Component } from 'react'
import { connect } from 'react-redux'

class JsonView extends Component {
  constructor(props){
    super(props)
  }
  render(){
    return (
      <div>
        <pre>{JSON.stringify(this.props.state.data, null, 2)}</pre>
      </div>
    )
  }
}

function mapStateToProps(state, props) {
  return { state: state }
}

const ConnectedJsonView = connect(mapStateToProps)(JsonView)
export default ConnectedJsonView