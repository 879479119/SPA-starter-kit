import React, { Component } from 'react'
import {connect} from 'react-redux'
import {handleChange} from '../../actions'
//noinspection JSUnresolvedVariable
import { Router, Route, Link, hashHistory, IndexRoute, Redirect,IndexLink} from 'react-router';


class Main extends Component {
	constructor(props) {
		super(props)
	}
	_click(){
		const {handleChange} = this.props
		handleChange(22222)


		fetch("http://api.bilibili.com/x/web-show/res/loc?callback=jQuery17205245701043178401_1477536806751&jsonp=jsonp&pf=0&id=23&_=1477536807769",{
			mode:"no-cors"
		})
			.then(r => r.json())
			.then(r => {console.log(r,88)})
	}
	render(){
		const {a} = this.props
		return (
			<div>
				<a href="javascript:;" onClick={this._click.bind(this)} className="2eqwe">This is Index</a>
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
})(Main)
