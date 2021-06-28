import * as type from '../actions/types';

const INITIAL_STATE = {
  modalOpen: false,
  modalPage: true,
  accessToken: "",
  me: { success: 'waiting' }
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case type.CLOSE_AUTH_MODAL:
      return {
        ...state,
        modalOpen: false
      };
    case type.SET_ACCESS_TOKEN:
      return{
        ...state,
        accessToken: action.payload
      }
    case type.OPEN_AUTH_MODAL:
      return {
        ...state,
        modalOpen: true
      };
    default:
      return state;
  }
};
