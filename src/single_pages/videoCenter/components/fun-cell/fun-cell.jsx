import React, { Component } from 'react'
import {connect} from 'react-redux'
import {handleChange} from '../../actions'
import { Router, Route, Link, hashHistory, IndexRoute, Redirect,IndexLink} from 'react-router';
import './fun-cell.less'

class Cell extends Component {
	constructor(props) {
		super(props)
	}

	_click(){
		const {handleChange} = this.props
		handleChange(22222)
	}

	render(){
		const {a, children, data} = this.props
		return (
			<div className="fun-cell">
				<img src={data.icon} alt="a" className="img"/>
				<p className="title">{data.title}</p>
				{children}
			</div>
		)
	}
}

const maps2p = (state) => ({
	a: state.common.a
})

export default connect(maps2p,{
	handleChange
})(Cell)
