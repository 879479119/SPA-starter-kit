import React, { Component } from 'react'
import {Link} from 'react-router'

export default class Sider extends Component {
	render(){
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
					</div>
				</li>
				<Link className="list-group-item active text-center" to={"/main/"}>HomePage</Link>
				<Link className="list-group-item text-center" to={"/main/ranks"}>Ranks</Link>
				<Link className="list-group-item text-center" to={"/main/fun"}>Fun Thins</Link>
				<Link className="list-group-item text-center" to={"/main/animation"}>Animations</Link>
			</div>
		)
	}
}