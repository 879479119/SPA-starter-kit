import React, { Component } from 'react'
import {connect} from 'react-redux'
import {handleChange} from '../actions'


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
        <a href="javascript:;" onClick={this._click.bind(this)}>CLICK</a>
        <p>This is {a} ----</p>
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
