import React, { Component } from 'react'
import {connect} from 'react-redux'
import { fetchSuccess, filterAnimation } from '../../actions'
//noinspection JSUnresolvedVariable
import { Router, Route, Link, hashHistory, IndexRoute, Redirect,IndexLink} from 'react-router';
import './animation.less'
import AnimationCell from '../../components/animation-cell'


class Animation extends Component {

	constructor(props) {
		super(props)
	}

	static _handleFilter(e){
		console.log(e.target.tagName);
		const { filter, filterAnimation} = this.props
		const weekday = e.target.getAttribute("aria-key")
		filterAnimation(Object.assign({}, filter, {weekday: parseInt(weekday)}))
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
		const { jsonpData, filter } = this.props

		//his is a curry function to save some work
		const isActive = (val1) => (val2) => {
			if(val1 == val2) return "active"
		}

		const isWeekday = isActive(filter.weekday)
		const isArea = isActive(filter.area)


		return (
			<div>
				<div className="row">
					<div className="col-lg-9">
						<br/>
						<ul className="nav nav-tabs" onClick={Animation._handleFilter.bind(this)}>
							<li role="presentation" className={isWeekday(0)}>
								<a href="javascript:;" aria-key={0}>日曜日</a>
							</li>
							<li role="presentation" className={isWeekday(1)}><a href="javascript:;" aria-key={1}>月曜日</a></li>
							<li role="presentation" className={isWeekday(2)}><a href="javascript:;" aria-key={2}>火曜日</a></li>
							<li role="presentation" className={isWeekday(3)}><a href="javascript:;" aria-key={3}>水曜日</a></li>
							<li role="presentation" className={isWeekday(4)}><a href="javascript:;" aria-key={4}>木曜日</a></li>
							<li role="presentation" className={isWeekday(5)}><a href="javascript:;" aria-key={5}>金曜日</a></li>
							<li role="presentation" className={isWeekday(6)}><a href="javascript:;" aria-key={6}>土曜日</a></li>
							<li role="presentation" className={isWeekday(7)}><a href="javascript:;" aria-key={7}>热门</a></li>
							<li className={`dir-dec`} aria-key={8}>
							</li>
						</ul>
						<br/>
						{
							jsonpData ? <AnimationCell list={this.result.list}/> : <p className="text-center">Nothing to Show</p>
						}
					</div>
					<div className="col-lg-3">
						<ul className="list-group">
							<li className={`list-group-item text-center ${isArea("")}`}>All</li>
							<li className={`list-group-item text-center ${isArea("日本")}`}>Janpanese</li>
							<li className={`list-group-item text-center ${isArea("中国")}`}>Chinese</li>
							<li className={`list-group-item text-center ${isArea("其他")}`}>Others</li>
						</ul>
					</div>
				</div>
				{this.props.children}
			</div>
		)
	}
}

const maps2p = (state) => ({
	jsonpData: state.animation.jsonpData,
	filter: state.animation.filter
})

export default connect(maps2p,{
	fetchSuccess,
	filterAnimation
})(Animation)
