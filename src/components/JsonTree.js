import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import classNames from 'classnames/bind'
import css from '../styles/JsonTree.scss'

const cn = classNames.bind(css)

class Add extends Component {
  constructor(props){
    super(props)
    this.activate = this.activate.bind(this)
    this.addClick = this.addClick.bind(this)
    this.cancelClick = this.cancelClick.bind(this)
    this.state = {
      active: false
    }
  }
  activate(){
    this.setState({ active: true })
    this.refs.key.value = ''
    this.refs.value.value = ''
  }
  addClick(e){
    this.setState({ active: false })
    const { submit } = this.props
    const { key, value } = this.refs
    submit(value.value, key.value)
  }
  cancelClick(e){
    this.setState({ active: false })
  }
  render(){
    const { active } = this.state
    const { type } = this.props
    return <div className={cn({add: true})}>
      <span className={cn({hidden: active})} onClick={this.activate}>{'+'}</span>
      <form className={cn({hidden: !active})}>

        <input ref='key' className={cn({hidden: type==='array'})} placeholder="key"></input>
          <span className={cn({hidden: type==='array'})}>: </span>
        <input ref='value' placeholder="JSON"></input>

        <button type="button" onClick={this.addClick}>add</button>
        <button type="button" onClick={this.cancelClick}>cancel</button>
      </form>
    </div>
  }
}
class Remove extends Component {
  constructor(props){
    super(props)
  }
  render(){
    return <span className={cn({remove: true})} onClick={this.props.submit}>{'-'}</span>
  }
}
class JsonTree extends Component {
  constructor(props){
    super(props)
    this.click = this.click.bind(this)
    this.onChange = this.onChange.bind(this)
    this.addObject = this.addObject.bind(this)
    this.addArray = this.addArray.bind(this)
    this.remove = this.remove.bind(this)
  }
  click(e){
    const { toggle, path } = this.props
    toggle(path)
  }
  onChange(e){
    const { update, path } = this.props
    update(path, e.target.value)
  }
  addObject(value, key){
    const { add_object, path } = this.props
    add_object(path, value, key)
    this.forceUpdate()
  }
  addArray(value){
    const { add_array, path } = this.props
    add_array(path, value)
    this.forceUpdate()
  }
  remove(){
    const { remove_object, remove_array, path, isInArray } = this.props
    if (isInArray) {
      let keyPath = path.split('.')
      let key = keyPath.pop()
      remove_array(keyPath.join('.'), key)
    } else {
      remove_object(path)
    }

  }
  componentWillMount(){
    const { level, initExpandedLevel, data, toggle, path } = this.props
    if (level < initExpandedLevel && data.type && data.expanded === undefined){
      toggle(path, true)
    }
  }
  renderNode(){
    const { data, path, level } = this.props
    const list = data.childs.map( (key) => {
      return <li>
        <ConnectedJsonTree
          {...this.props}
          path={path + '.' + key}
          level={level + 1}
          isInArray={data.type === 'array'}
        />
      </li>
    });
    return <ul>{ list }</ul>;
  }

  render(){
    const { data, k, level } = this.props
    if (data === undefined) return false

    const t = data.type;
    const nodeClass = cn({
      'redux-json-tree': !this.props.level
    })
    const arrowClass = cn({
      'redux-json-tree-arrow': true,
      open: data.expanded
    })

    if (t === 'object') {
      return (
        <div className={nodeClass}>
          <div className={arrowClass} onClick={this.click}></div>
          <span className={cn({object: true})} onClick={this.click}>{ k }: </span>
          <span className={cn({bracket: true})}>{'{'}</span>
            { data.expanded ? this.renderNode() : <span className={cn({count: true})}>{data.childs.length}</span>  }
          <span className={cn({bracket: true})}>{'}'}</span>
          <Add type="object" submit={this.addObject}/>
          <Remove submit={this.remove}/>
        </div>
      )
    }
    else if (t === 'array') {
      return (
        <div className={nodeClass}>
          <div className={arrowClass} onClick={this.click}></div>
          <span className={cn({array: true})} onClick={this.click}>{ k }: </span>
          <span className={cn({bracket: true})}>{'['}</span>
            { data.expanded ? this.renderNode() : <span className={cn({count: true})}>{data.childs.length}</span>  }
          <span className={cn({bracket: true})}>{']'}</span>
          <Add type="array" submit={this.addArray}/>
          <Remove submit={this.remove}/>
        </div>
      )
    }
    else {
      return (
        <span className={cn({leaf: true})}>
          <div className={cn({'redux-json-tree-arrow': true, 'not-visible': true })}></div>
          <span>{ k }: </span>
          <input
            value={data}
            onChange={this.onChange}>
          </input>
          <Remove submit={this.remove}/>
        </span>
      )
    }
  }
}
JsonTree.propTypes = {
  path: React.PropTypes.string,
  level: React.PropTypes.number,
  initExpandedLevel: React.PropTypes.number
}
JsonTree.defaultProps = {
  path: 'root',
  level: 0,
  initExpandedLevel: 0
}

function mapStateToProps(state, props) {
  const { path = 'root' } = props
  return {
    data: state[path],
    k: path.split('.').pop(),
  }
}

const ConnectedJsonTree = connect(mapStateToProps, actions)(JsonTree)
export default ConnectedJsonTree