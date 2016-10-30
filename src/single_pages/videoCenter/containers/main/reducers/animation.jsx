import * as Action from '../../../actions'

const animation = (state = { jsonpData: undefined }, action) => {
	switch (action.type) {
		case Action.READY:
			return Object.assign({}, state, { jsonpData: action.data })
		case Action.FETCH_ERR:
			return Object.assign({}, state)
		default:
			return state
	}
};

export default animation
