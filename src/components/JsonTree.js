import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import classNames from 'classnames/bind'
import css from '../styles/JsonTree.scss'

const cn = classNames.bind(css)

class JsonTree extends Component {
  constructor(props){
    super(props)
    this.click = this.click.bind(this)
    this.onChange = this.onChange.bind(this)
  }
  click(e){
    const { toggle, path } = this.props
    toggle(path)
  }
  onChange(e){
    const { update, path } = this.props
    update(path, e.target.value)
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
        />
      </li>
    });
    return <ul>{ list }</ul>;
  }

  render(){
    const { data, k, level } = this.props
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
        </div>
      )
    }
    else {
      return (
        <span className={cn({leaf: true})}>
          <span onClick={this.click}>{ k }: </span>
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