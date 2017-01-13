
export const CHANGE_PAGE = 'CHANGE_PAGE'

export const changePage = (page) => {
	return (dispatch) => {
		dispatch({
			type: CHANGE_PAGE,
			page
		})
	}
}
