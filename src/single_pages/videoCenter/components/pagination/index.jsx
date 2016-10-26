import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchBackSymbol } from '../../utils/fetch'
import { changePage } from '../../actions'

/**
 * To avoid conflict when we use multiple pagination in a single page,
 * we set the variable "cur" as a property of this instead of a global
 * state.
 *
 * @Usage: you must trigger a request before mount this component.
 */

class Pagination extends Component {

	constructor(props){
		super(props)
	}

	_prevPage(){
		const { changePage, fetchBackSymbol, api, page } = this.props
		fetchBackSymbol(api+"?page="+(page - 1))
		changePage(page - 1)
	}

	_nextPage(){
		const { changePage, fetchBackSymbol, api, page } = this.props
		fetchBackSymbol(api+"?page="+(page + 1))
		changePage(page + 1)
	}

	_goPage(index){
		const page = index
		const { changePage, fetchBackSymbol, api} = this.props
		this.cur = page
		return function () {
			fetchBackSymbol(api+"?page="+page)
			changePage(page)
		}
	}

	componentDidMount(){

	}

	render(){

		const {length, size, page} = this.props

		if(!length && !size){
			throw Error("You must set length and size")
		}

		return(
			<div className="row">
				<nav className="text-center">
					<ul className="pagination">
						<li className={page == 0 && "disabled"}><a href="javascript:;" onClick={this._prevPage.bind(this)}>&laquo;</a></li>
						{(()=>{
							let arr = [];
							for(let i = 0;i < Math.ceil(length / size);i ++){
								arr.push(
									<li className={page == i && "active"} >
										<a href="javascript:;"
										   key={i}
										   onClick={this._goPage.bind(this)(i)}
										>{i+1}</a>
									</li>
								)
							}
							return arr
						})()}
						<li className={page == Math.ceil(length / size) - 1 && "disable"}><a href="javascript:;" onClick={this._nextPage.bind(this)}>&raquo;</a></li>
					</ul>
				</nav>
			</div>
		)
	}
}


const maps2p = (state) => ({
	SAMfetchState:state.SimpleAPIReducer.SAMfetchState,
	data:state.SimpleAPIReducer.data,
	symbol:state.SimpleAPIReducer.symbol,
	page: state.pagination.page
})

export default connect(maps2p,{
	fetchBackSymbol,
	changePage
})(Pagination)