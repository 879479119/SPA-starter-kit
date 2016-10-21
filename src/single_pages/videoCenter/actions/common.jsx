export const CHANGE = 'CHANGE'

export const handleChange = (color) => {
  return (dispatch) => {
    dispatch({
      type: CHANGE,
      color
    })
  }
}
