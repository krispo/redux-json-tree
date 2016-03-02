import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import classNames from 'classnames/bind'
import css from './styles/JsonTree.scss'

const cn = classNames.bind(css)

class JsonTree extends Component {
  constructor(props){
    super(props)
    this.click = this.click.bind(this)
    this.onChange = this.onChange.bind(this)
    this.state = {
      collapsed: false
    }
  }
  click(e){
    this.setState({
      collapsed: !this.state.collapsed
    });
  }
  onChange(e){
    const { update, path } = this.props
    update(path, e.target.value)
  }

  renderNode(){
    const { data, level } = this.props
    const list = data.childs.map( (path) => {
      return <li>
        <ConnectedJsonTree
          path={path}
          level={level + 1}
        />
      </li>
    });
    return <ul>{ list }</ul>;
  }
  render(){
    const { data, k, level } = this.props
    const t = data.type;
    const nodeClass = cn({
      'redux-json-tree': !this.props.level,
      'node': t === 'object' || t === 'array',
      'leaf': t !== 'object' && t !== 'array'
    });

    if (t === 'object') {
      return (
        <div className={nodeClass}>
          <span onClick={this.click.bind(this)}>{ level ? k : 'root' }: </span>
          <span>{'{'}</span>
            { this.state.collapsed ? '' : this.renderNode() }
            <span>{'}'}</span>
        </div>
      )
    }
    else if (t === 'array') {
      return (
        <div className={nodeClass}>
          <span onClick={this.click}>{ k }: </span>
          <span>{'['}</span>
          { this.state.collapsed ? '' : this.renderNode() }
          <span>{']'}</span>
        </div>
      )
    }
    else {
      return (
        <span className={nodeClass}>
          <span onClick={this.click.bind(this)}>{ k }: </span>
          <input
            value={data}
            onChange={this.onChange}>
          </input>
        </span>
      )
    }
  }
}
JsonTree.propTypes = {
  path: React.PropTypes.string,
  level: React.PropTypes.number
}
JsonTree.defaultProps = {
  path: 'root',
  level: 0
}

function mapStateToProps(state, props) {
  if (typeof props.path === 'undefined' || props.path === 'root') return {
    data: state.simplifiedData['root']
  };
  return {
    data: state.simplifiedData[props.path],
    k: props.path.split('.').pop()
  }
}

const ConnectedJsonTree = connect(mapStateToProps, actions)(JsonTree)
export default ConnectedJsonTree