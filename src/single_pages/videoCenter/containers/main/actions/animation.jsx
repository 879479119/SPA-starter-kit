export const READY = 'READY'

export const FETCH_ERR = 'FETCH_ERR'

export const fetchSuccess = data => {
	return dispatch => {
		dispatch({
			type: READY,
			data
		})
	}
}


/**
 * Animation filter
 * @type {string}
 */

export const ANIME_FILTER = 'ANIME_FILTER'

export const filterAnimation = data => {
	return dispatch => {
		dispatch({
			type: ANIME_FILTER,
			data
		})
	}
}