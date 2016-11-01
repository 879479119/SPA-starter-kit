import React, { Component } from 'react'
import {connect} from 'react-redux'
import {handleChange} from '../../actions'
//noinspection JSUnresolvedVariable
import { Router, Route, Link, hashHistory, IndexRoute, Redirect,IndexLink} from 'react-router';
import './main.less'

class Main extends Component {
	constructor(props) {
		super(props)
	}
	render(){
		const {a} = this.props
		return (
			<div className="home">
				<div className="jumbotron">
					<div className="container">
						<h2 className="">Get start with SPA starter kit!</h2>
						<p className="text">There are a series of applications making up this website you see,
						we are using the latest and most popular technology to build this,
						if you are interested in it,stat then fork it to your repository, thx.</p>
					</div>
				</div>
				<div className="well">
					<div className="svg">
						<img src="/statics/svg/2622.svg"/>
						<img src="/statics/svg/2623.svg"/>
						<img src="/statics/svg/2626.svg"/>
						<img src="/statics/svg/2638.svg"/>
						<img src="/statics/svg/2648.svg"/>
						<img src="/statics/svg/2649.svg"/>
						<img src="/statics/svg/2650.svg"/>
						<img src="/statics/svg/2651.svg"/>
						<img src="/statics/svg/2652.svg"/>
						<img src="/statics/svg/2653.svg"/>
						<img src="/statics/svg/2660.svg"/>
						<img src="/statics/svg/2663.svg"/>
					</div>
					<hr/>
					<h2 className="text-center">
						Make with heart <img src="/statics/svg/2665.svg"/>
					</h2>
				</div>
			</div>

		)
	}
}

const maps2p = (state) => ({
	a: state.common.a
})

export default connect(maps2p,{

})(Main)
