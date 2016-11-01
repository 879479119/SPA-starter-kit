import * as Action from '../../../actions'

const initalState = {
	jsonpData: undefined,
	filter: {
		weekday: 0,
		area: "",
		orderBy: "lastupdate", //enum: play_count, attention, danmaku_count, favorites
		reverse: false
	}
}

const animation = (state = initalState, action) => {
	switch (action.type) {
		case Action.READY:
			return Object.assign({}, state, { jsonpData: action.data })
		case Action.FETCH_ERR:
			return Object.assign({}, state)
		case Action.ANIME_FILTER:
			return Object.assign({}, state, { filter: action.data })
		default:
			return state
	}
};

export default animation
