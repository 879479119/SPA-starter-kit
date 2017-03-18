import * as Action from '../actions'

const pagination = (state = { page:0 }, action) => {
	switch (action.type) {
		case Action.CHANGE_PAGE:
			return Object.assign({}, state, { page: action.page })
		default:
			return state
	}
};

export default pagination
