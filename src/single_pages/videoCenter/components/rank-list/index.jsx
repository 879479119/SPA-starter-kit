import React, { Component } from 'react'
import './main.less'

/**
 * This component's states are not considered as a member of store tree,
 * it's an "abandoned land"
 */

export default class List extends Component {
	constructor(props) {
		super(props)
		this.state = {
			fetch : undefined,
			bibi: 0
		}
	}

	componentWillReceiveProps(nextProps){
		if(nextProps.bibi != this.props.bibi){
			console.log(4564664);
		}
	}

	componentDidMount(){
		const {index} = this.props
		fetch(`/video/getRank?field=${index}`,{
		}).then(r => r.json()).then(r => {
			console.log(r);
			this.setState({fetch: r})
		}).catch(err => {console.log(err);})

	}

	_click(){
		this.setState({
			bibi: 1
		})
	}

	render(){
		const data = this.state.fetch
		const {name, index} = this.props
		if(data){
			console.log(data);
			return (
				<div className="panel panel-default">
					<div className="panel-heading small">
						{name}
						<button type="button" className="btn btn-xs btn-default btn-toggle" onClick={this._click.bind(this)}>Toggle{this.state.bibi}</button>
					</div>
					<ul className="list-group">
						{
							data.hot.list.map((item, i) => (
								<li className="list-group-item">
									<div className="media">
										<a className="media-left"><img src={item.pic} alt="" className="rank-img"/></a>
										<div className="media-body small">
											<p className="title">{item.title}</p>
											<p className="author">--{item.author}</p>
										</div>
									</div>
								</li>
							))
						}
					</ul>
				</div>
			)
		}else{
			return <h3>Loading</h3>
		}

	}
}
