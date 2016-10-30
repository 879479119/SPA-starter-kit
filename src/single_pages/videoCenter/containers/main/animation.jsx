import React, { Component } from 'react'
import {connect} from 'react-redux'
import {fetchSuccess} from '../../actions'
//noinspection JSUnresolvedVariable
import { Router, Route, Link, hashHistory, IndexRoute, Redirect,IndexLink} from 'react-router';
import './animation.less'
import Animation from '../../components/animation-cell'


class Animaiton extends Component {
	constructor(props) {
		super(props)
	}
	_click(){
		const {handleChange} = this.props
		handleChange(22222)
	}
	componentDidMount(){
		/**
		 * this is a jsonp call
		 */
		const { fetchSuccess } = this.props

		let jsonp = document.createElement("script")
		window.timeline = (r) => {
			this.result = r
			//dispatch a reducer
			fetchSuccess(r)
		}
		jsonp.src = "http://bangumi.bilibili.com/jsonp/timeline_v2.ver?callback=timeline"
		document.body.appendChild(jsonp)
	}
	render(){
		const { jsonpData } = this.props

		return (
			<div>
				<div className="row">
					<div className="col-lg-9">
						<br/>
						<ul className="nav nav-tabs">
							<li role="presentation" className="active">
								<a href="#">日曜日</a>
							</li>
							<li role="presentation"><a href="#">月曜日</a></li>
							<li role="presentation"><a href="#">火曜日</a></li>
							<li role="presentation"><a href="#">水曜日</a></li>
							<li role="presentation"><a href="#">木曜日</a></li>
							<li role="presentation"><a href="#">金曜日</a></li>
							<li role="presentation"><a href="#">土曜日</a></li>
							<li role="presentation"><a href="#">热门</a></li>
							<li className="dir-dec">
							</li>
						</ul>
						<br/>
						{
							jsonpData ? <Animation list={this.result.list}/> : <p>Nothing to Show</p>
						}
					</div>
					<div className="col-lg-3">
						<ul className="list-group">
							<li className="list-group-item text-center">All</li>
							<li className="list-group-item text-center">Janpanese</li>
							<li className="list-group-item text-center">Chinese</li>
							<li className="list-group-item text-center">Others</li>
						</ul>
					</div>
				</div>
				{this.props.children}
			</div>
		)
	}
}

const maps2p = (state) => ({
	jsonpData: state.animation.jsonpData
})

export default connect(maps2p,{
	fetchSuccess
})(Animaiton)
