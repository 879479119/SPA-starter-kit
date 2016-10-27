import React, { Component } from 'react'
import {connect} from 'react-redux'
import {handleChange} from '../../actions'
//noinspection JSUnresolvedVariable
import { Router, Route, Link, hashHistory, IndexRoute, Redirect,IndexLink} from 'react-router';
import List from '../../components/rank-list'
import fieldMap from '../../utils/number'

class Main extends Component {
	constructor(props) {
		super(props)
	}
	_click(){
		const {handleChange} = this.props
		handleChange(22222)
	}
	_renderRow(nameArr, indexArr){
		return(
			<div className="row">
				{
					nameArr.map((item,index) => {
						return(
							<div className="col-lg-4">
								<List name={item} index={indexArr[index]}/>
							</div>
						)
					})
				}
			</div>
		)
	}
	render(){
		const {a} = this.props

		return (
			<div>
				<h2 className="text-center">- Bilibili Video Rank -</h2>
				{(()=>{
					let row = Math.ceil(fieldMap.name.length / 3), arr = []
					for(let i = 0;i < row;i ++){
						//The method splice will return the first three element
						arr.push(this._renderRow(fieldMap.name.splice(0,3),fieldMap.index.splice(0,3)))
					}
					return arr
				})()}
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
