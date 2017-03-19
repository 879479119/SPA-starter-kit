import * as Action from '../actions'

const common = (state = { a:111111, route:[] }, action) => {
	console.log(action)
	switch (action.type) {
		case Action.CHANGE:
			return Object.assign({}, state, { a: action.color })
		case Action.CHANGE_ROUTE:
			return Object.assign({}, state, { route: action.routeArr })
		default:
			return state
	}
};

export default common
