import Symbol from 'es6-symbol';
import * as N from './action'

let config = {
	method: 'GET',
	cache: 'default'
}

//the funtion component thst is used to call a request 
//and get a unique symbol object back
export const fetchBackSymbol = (url, opt) => disptch => {
	const symbol = Symbol("fetch")
	opt && (config = opt)
	disptch({
		type: N.FETCH,
		url, symbol
	})
	return symbol
}

//default exported middleware,just need to add this in the middleware list
export default store => next => action => {

	function actionWith(data) {
		return Object.assign({}, action, data)
	}

	if(action.type == N.FETCH){
		next(actionWith({ type: N.FETCH_REQUEST }))
	}

	if(action.url){
		return loadWithAPI(action.url)
			.then(rsp => rsp.json())
			.then(
				rsp => next(actionWith({
					rsp,
					type: N.FETCH_SUCCESS
				})),
				error => next(actionWith({
					type: N.FETCH_REJECT,
					error: error.message
				}))
			).catch((err) => {
				console.error(err)
			})
	}else{
		return next(action)
	}
}

//TODO: need to adapt more datatype and abort it when needed 
function loadWithAPI(url) {
	return fetch(url, config)
}

export const SimpleAPIReducer = (state = { data: undefined, SAMfetchState: 0 }, action) => {
	// property fetchState is defined to describe the fetch state
	// 0 for no network activity, 1 for processing, 2 for success, -1 for failed

	switch (action.type){
		case N.FETCH_REQUEST:
			return Object.assign({}, state, {SAMfetchState: 1, symbol:action.symbol})
		case N.FETCH_SUCCESS:
			return Object.assign({}, state, {SAMfetchState: 2, data: action.rsp, symbol:action.symbol})
		case N.FETCH_REJECT:
			return Object.assign({}, state, {SAMfetchState: -1, data: action.rsp, symbol:action.symbol})
		default:
			return state
	}
}
