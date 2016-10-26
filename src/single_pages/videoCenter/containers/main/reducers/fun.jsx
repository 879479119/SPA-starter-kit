import * as Action from '../../../actions'

const fun = (state = { fetchData: [] }, action) => {
	switch (action.type) {
		case Action.READY:
			return Object.assign({}, state, { fetchData: action.data })
		case Action.FETCH_ERR:
			return Object.assign({}, state)
		default:
			return state
	}
};

export default fun
