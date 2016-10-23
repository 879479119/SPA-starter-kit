import React, { Component } from 'react'
import {connect} from 'react-redux'
import {handleChange} from '../actions'
import { Router, Route, Link, hashHistory, IndexRoute, Redirect,IndexLink} from 'react-router';


class Show extends Component {
  constructor(props) {
    super(props)
  }
  _click(){
    const {handleChange} = this.props

    handleChange(22222)
  }
  render(){
    const {a} = this.props
    return (
      <div>
        <a href="javascript:;" onClick={this._click.bind(this)} className="asdasd">CLICK</a>
        <Link to="/main">asdasd</Link>
        <p>This is {a} ----</p>

        {this.props.children}
      </div>
    )
  }
}

const maps2p = (state) => ({
  a: state.common.a
})

export default connect(maps2p,{
  handleChange
})(Show)
