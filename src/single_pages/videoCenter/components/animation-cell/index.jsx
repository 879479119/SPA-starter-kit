import React, { Component } from 'react'
import {connect} from 'react-redux'
import {handleChange} from '../../actions'
import { Router, Route, Link, hashHistory, IndexRoute, Redirect,IndexLink} from 'react-router';
import './main.less'

class Cell extends Component {
	constructor(props) {
		super(props)
	}

	_click(){
		const {handleChange} = this.props
		handleChange(22222)
	}

	render(){
		const {a, children, list} = this.props
		return (
			<div className=" box">
				{
					list.map((item, index) => (
						<div className="col-lg-6">
							<div className="media cell panel panel-default">
								<div className="media-left">
									<img src={item.square_cover} alt="aa" className="pic"/>
								</div>
							</div>
						</div>
						)
					)
				}
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
