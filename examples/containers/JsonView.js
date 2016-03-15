import React, { Component } from 'react'
import { connect } from 'react-redux'
import { desimplify } from 'simplifr'

class JsonView extends Component {
  constructor(props){
    super(props)
  }
  render(){
    return (
      <div>
        <pre>{JSON.stringify(desimplify(this.props.data, this.props.path), null, 2)}</pre>
      </div>
    )
  }
}

function mapStateToProps(state, props) {
  return { data: state }
}

const ConnectedJsonView = connect(mapStateToProps)(JsonView)
export default ConnectedJsonView