import React, { Component } from 'react'
import {connect} from 'react-redux'
import {handleChange} from '../../actions'
//noinspection JSUnresolvedVariable
import { Router, Route, Link, hashHistory, IndexRoute, Redirect,IndexLink} from 'react-router';

class Main extends Component {
	constructor(props) {
		super(props)
	}

	componentDidMount(){
		// call the server-side for a json data
		fetch("/video/getFunImages")
			.then(res => {return res.json()})
			.then(data => console.log(data))
	}

	_click(){
		const {handleChange} = this.props
		handleChange(22222)
	}

	render(){
		const {a} = this.props
		return (
			<div>
				<a href="javascript:;" onClick={this._click.bind(this)} className="2eqwe">This is Fun</a>
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
})(Main)
