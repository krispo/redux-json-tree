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
  type(){
    const val = this.props.data;
    if (val === null) return 'null'
    else if (val === undefined) return 'undefined'
    else if (val.constructor === Array) return 'array'
    else if (val.constructor === Object) return 'object'
    else if (val.constructor === String) return 'string'
    else if (val.constructor === Number) return 'number'
    else if (val.constructor === Boolean) return 'boolean'
    else if (val.constructor === Function) return 'function'
    else return 'object'
  }
  renderObject(){
    const list = [];
    const { data, path, level } = this.props
    for (let key in data){
      list.push(<li>
        <ConnectedJsonTree
          path={path + '_' + key}
          level={level + 1}
          k={key}
        />
      </li>);
    }
    return <ul>{ list }</ul>;
  }
  renderArray(){
    const { data, path, level } = this.props
    const list = data.map( (v, i) => {
      return <li>
        <ConnectedJsonTree
          path={path + '_' + i}
          level={level + 1}
          k={i}
        />
      </li>
    });
    return <ul>{ list }</ul>;
  }
  render(){
    const { data, k, level } = this.props
    const t = this.type();
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
            { this.state.collapsed ? '' : this.renderObject() }
            <span>{'}'}</span>
        </div>
      )
    }
    else if (t === 'array') {
      return (
        <div className={nodeClass}>
          <span onClick={this.click}>{ k }: </span>
          <span>{'['}</span>
          { this.state.collapsed ? '' : this.renderArray() }
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
    data: state
  };

  function deep(cs, p){
    if (p.length>1){
      const key = p.shift();
      return deep(cs[key], p)
    } else {
      return {
        data: cs[p.shift()]
      };
    }
  }
  //exclude root path
  const path_sequence = props.path.split('_').slice(1)
  return deep(state, path_sequence);
}

const ConnectedJsonTree = connect(mapStateToProps, actions)(JsonTree)
export default ConnectedJsonTree