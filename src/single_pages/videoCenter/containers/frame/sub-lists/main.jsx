import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { changeRoute } from '../../../actions'

class Sider extends Component {
	constructor(props){
		super(props)
	}

	render(){

		const { route } = this.props
		const level2 = ( route && route.length) > 2 ? route[2] : ""

		return(
			<div className="list-group">
				<li className="list-group-item">
					<div className="row text-center">
						<Link to={"/main"} className="">
							<img
								src="http://i0.hdslb.com/bfs/face/663cc07db67f40ac79b51f15a1cff5f5cf3b5545.jpg@75Q.webp"
								alt="face"
								className="user-face"/>
						</Link>
						<h4>Name: <small>RockSAMA</small></h4>
						<blockquote className="p-sign">My name is unbilieveable<small>Tech Otaku Save World</small></blockquote>
					</div >
				</li>
				<Link className={`list-group-item text-center ${level2 == "" ? "active" : ""}`} to={"/main/"}>HomePage</Link>
				<Link className={`list-group-item text-center ${level2 == "ranks" ? "active" : ""}`} to={"/main/ranks"}>Ranks</Link>
				<Link className={`list-group-item text-center ${level2 == "fun" ? "active" : ""}`} to={"/main/fun"}>Fun Things</Link>
				<Link className={`list-group-item text-center ${level2 == "animation" ? "active" : ""}`} to={"/main/animation"}>Animations</Link>
			</div>
		)
	}
}

const maps2p = (state) => ({
	route: state.common.route
})

export default connect(maps2p,{
	changeRoute
})(Sider)