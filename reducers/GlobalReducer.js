import * as type from '../actions/types';

const INITIAL_STATE = {
  errorMsg: "",
  loading: false
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case type.SET_ERROR_MSG:
      return {
        ...state,
        errorMsg: action.errorMsg
      }
    case type.CLEAN_ERROR_MSG:
      return {
        ...INITIAL_STATE,
      }
    case type.SET_LOADING:
      return {
        ...state,
        loading: action.data
      }
    default:
      return state;
  }
}