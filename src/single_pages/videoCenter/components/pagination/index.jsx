import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchBackSymbol} from '../../utils/fetch'

class Pagination extends Component {

	constructor(props){
		super(props)
	}

	_prevPage(){

	}

	_nextPage(){

	}

	_goPage(index){
		const page = index
		const { fetchBackSymbol, api } = this.props
		return function () {
			fetchBackSymbol(api)
		}
	}

	render(){

		const {length, size, start=0, cur=0} = this.props

		if(!length && !size){
			throw Error("You must set length and size")
		}

		return(
			<div className="row">
				<nav className="text-center">
					<ul className="pagination">
						<li className={cur == 0 && "disabled"}><a href="javascript:;" onClick={this._prevPage.bind(this)}>&laquo;</a></li>
						{(()=>{
							let arr = [];
							for(let i = 0;i < Math.ceil(length / size);i ++){
								arr.push(
									<li className={cur == i && "active"} >
										<a href="javascript:;"
										   key={i}
										   onClick={this._goPage.bind(this)(i)}
										>{i+1}</a>
									</li>
								)
							}
							return arr
						})()}
						<li className={cur == Math.ceil(length / size) - 1 && "disable"}><a href="javascript:;" onClick={this._nextPage.bind(this)}>&raquo;</a></li>
					</ul>
				</nav>
			</div>
		)
	}
}


const maps2p = (state) => ({
	SAMfetchState:state.SimpleAPIReducer.SAMfetchState,
	data:state.SimpleAPIReducer.data,
	symbol:state.SimpleAPIReducer.symbol
})

export default connect(maps2p,{
	fetchBackSymbol
})(Pagination)