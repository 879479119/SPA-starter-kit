export const CHANGE = 'CHANGE'

export const handleChange = (color) => {
  return (dispatch) => {
    dispatch({
      type: CHANGE,
      color
    })
  }
}

export const CHANGE_ROUTE = 'CHANGE_ROUTE'

export const changeRoute = (routeArr) => {
  return (dispatch) => {
    dispatch({
      type: CHANGE_ROUTE,
      routeArr
    })
  }
}
