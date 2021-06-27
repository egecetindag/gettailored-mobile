import { SET_ERROR_MSG, CLEAN_ERROR_MSG, SET_LOADING } from './types'

export const setErrorMsg = (msg) => {
  return (dispatch) => {
    dispatch({
      type: SET_ERROR_MSG,
      errorMsg: msg,
    })
  }
}

export const cleanErrorMsg = (msg) => {
  return (dispatch) => {
    dispatch({
      type: CLEAN_ERROR_MSG,
    })
  }
}

export const setLoading = (data) => {
  return (dispatch) => {
    dispatch({
      type: SET_LOADING,
      data
    })
  }
}