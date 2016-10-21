import * as Action from '../actions'

const common = (state = { a:111111 }, action) => {
	console.log(action)
	switch (action.type) {
		case Action.CHANGE:
			return Object.assign({}, state, { a: action.color })
		default:
			return state
	}
};

export default common
