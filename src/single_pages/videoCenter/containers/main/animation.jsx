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
		const { filter, filterAnimation} = this.props

		const weekday = e.target.getAttribute("aria-key")
		const area = e.target.getAttribute("aria-area")
		const order = e.target.getAttribute("aria-order")

		if(weekday) filterAnimation(Object.assign({}, filter, {weekday: parseInt(weekday)}))
		if(area != undefined) filterAnimation(Object.assign({}, filter, {area: area}))
		if(order) filterAnimation(Object.assign({}, filter, {orderBy: order}))
	}

	static _handleFilterReverse(e){
		const { filter, filterAnimation} = this.props
		const dom = document.getElementById("reverse")
		let val = dom.getAttribute("value")
		console.log(val);
		if(val == "on") dom.setAttribute("value","'off'")
		else dom.setAttribute("value","'on'")
		filterAnimation(Object.assign({}, filter, {reverse: val == "on"}))
	}

	componentDidMount(){
		/**
		 * this is a jsonp call
		 */
		const { fetchSuccess } = this.props

		let jsonp = document.createElement("script")
		window.timeline = (r) => {
			//dispatch a reducer
			fetchSuccess(r)
		}
		jsonp.src = "http://bangumi.bilibili.com/jsonp/timeline_v2.ver?callback=timeline"
		document.body.appendChild(jsonp)
	}

	_dataFilter(arr, { weekday, area, orderBy, reverse }){
		let result = []
		arr.map(item => {
			if(weekday == item.weekday && !item.area.indexOf(area)) result.push(item)
		})

		result.sort((item1, item2) => {
			//enum: lastupdate, play_count, attention, danmaku_count, favorites
			let sign = reverse ? 1 : -1
			if(item1[orderBy] > item2[orderBy]){
				return sign
			}else if(item1[orderBy] < item2[orderBy]){
				return -sign
			}
			return 0
		})

		return result
	}

	render(){
		const { jsonpData, filter, filter: { weekday, area, orderBy, reverse } } = this.props

		//his is a curry function to save some work
		const isActive = (val1) => (val2) => {
			if(val1 == val2) return "active"
		}

		const isWeekday = isActive(weekday)
		const isArea = isActive(area)
		const isOrder = isActive(orderBy)

		let renderData =  []
		if(jsonpData) renderData = this._dataFilter(jsonpData.list, filter)

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
							jsonpData ? <AnimationCell list={renderData}/> : <p className="text-center">Nothing to Show</p>
						}
					</div>
					<div className="col-lg-3">
						<ul className="list-group" onClick={Animation._handleFilter.bind(this)}>
							<li className={`list-group-item text-center ${isArea("")}`} aria-area={""}>All</li>
							<li className={`list-group-item text-center ${isArea("日本")}`} aria-area={"日本"}>Janpanese</li>
							<li className={`list-group-item text-center ${isArea("中国")}`} aria-area={"中国"}>Chinese</li>
							<li className={`list-group-item text-center ${isArea("其他")}`} aria-area={"其他"}>Others</li>
						</ul>
						<br/>
						<div className="panel panel-default">
							<div className="panel-heading">Filter</div>
							<div className="panel-body">
								<ul className="list-group" onClick={Animation._handleFilter.bind(this)}>
									<li className={`list-group-item text-center ${isOrder("lastupdate")}`} aria-order={"lastupdate"}>date</li>
									<li className={`list-group-item text-center ${isOrder("play_count")}`} aria-order={"play_count"}>play</li>
									<li className={`list-group-item text-center ${isOrder("attention")}`} aria-order={"attention"}>attention</li>
									<li className={`list-group-item text-center ${isOrder("danmaku_count")}`} aria-order={"danmaku_count"}>danmaku</li>
									<li className={`list-group-item text-center ${isOrder("favorites")}`} aria-order={"favorites"}>favorite</li>
								</ul>
								<div className="input-group text-center fill" onClick={Animation._handleFilterReverse.bind(this)}>
									<input type="checkbox" name="reverse" id="reverse" value={"off"}/>
									<label htmlFor="reverse">Reverse the List</label>
								</div>
							</div>
						</div>

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
