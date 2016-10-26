import React, { Component } from 'react'
import {connect} from 'react-redux'
import {handleChange} from '../../actions'
//noinspection JSUnresolvedVariable
import { Router, Route, Link, hashHistory, IndexRoute, Redirect,IndexLink} from 'react-router';
import FunCell from '../../components/fun-cell'
import { fetchSuccess } from '../../actions'
import Pagination from '../../components/pagination'
import {fetchBackSymbol} from '../../utils/fetch'

class Main extends Component {
	constructor(props) {
		super(props)
	}

	componentDidMount(){
		const { fetchSuccess, fetchData, fetchBackSymbol } = this.props
		// call the server-side for a json data
		// when fetch has called we don't to do that again

		this.log = fetchBackSymbol("/video/getFunImages?page=0")

	}

	_click(){
		const {handleChange} = this.props
		handleChange(22222)
	}

	render(){
		const { a, fetchData, data, SAMfetchState } = this.props
		if(SAMfetchState == 1){
			return <div>Loading</div>
		}else if(SAMfetchState == 2){
			return (
				<div>
					{
						data.list.map((obj, index) => {
							if(index > 27){
								return undefined;
							}else {
								return <FunCell data={obj} key={`cell${index}`}/>
							}
						})
					}
					<Pagination length={data.length} size={28}/>
				</div>
			)
		}else{
			return <h2>Failed</h2>
		}

	}
}

const maps2p = (state) => ({
	a: state.common.a,
	fetchData: state.fun.fetchData,
	SAMfetchState:state.SimpleAPIReducer.SAMfetchState,
	data:state.SimpleAPIReducer.data,
	symbol:state.SimpleAPIReducer.symbol
})

export default connect(maps2p,{
	handleChange,
	fetchSuccess,
	fetchBackSymbol
})(Main)
