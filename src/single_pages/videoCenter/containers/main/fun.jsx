import React, { Component } from 'react'
import {connect} from 'react-redux'
import {handleChange} from '../../actions'
//noinspection JSUnresolvedVariable
import { Router, Route, Link, hashHistory, IndexRoute, Redirect,IndexLink} from 'react-router';
import FunCell from '../../components/fun-cell'
import { fetchSuccess } from '../../actions'

class Main extends Component {
	constructor(props) {
		super(props)
	}

	componentDidMount(){
		const { fetchSuccess, fetchData } = this.props
		// call the server-side for a json data
		// when fetch has called we don't to do that again

		fetchData || fetch("/video/getFunImages")
			.then(res => {return res.json()})
			.then(data => {
				fetchSuccess(data)
			})
			.catch(err => {throw err})
	}

	_click(){
		const {handleChange} = this.props
		handleChange(22222)
	}

	render(){
		const { a, fetchData } = this.props
		console.log(fetchData,456);
		return (
			<div>
				{
					fetchData ? fetchData.map((obj, index) => {
						if(index > 27){
							return undefined;
						}else {
							return <FunCell data={obj} />
						}
					}) : "SOME THING BAD HAPPEN"
				}
				<div className="row">
					<nav className="text-center">
						<ul className="pagination">
							<li><a href="javascript:;">&laquo;</a></li>
							<li><a href="javascript:;">1</a></li>
							<li><a href="javascript:;">2</a></li>
							<li><a href="javascript:;">3</a></li>
							<li><a href="javascript:;">&raquo;</a></li>
						</ul>
					</nav>
				</div>
			</div>
		)
	}
}

const maps2p = (state) => ({
	a: state.common.a,
	fetchData: state.fun.fetchData
})

export default connect(maps2p,{
	handleChange,
	fetchSuccess
})(Main)
