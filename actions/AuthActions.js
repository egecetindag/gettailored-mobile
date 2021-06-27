
// import { signUpService, loginService, getMeService } from '../network/services/AuthServices';
import {
//   SIGN_UP_SUCCESS,
//   LOGIN_SUCCESS,
  CLOSE_AUTH_MODAL,
  OPEN_AUTH_MODAL,
  CHANGE_AUTH_PAGE,
  SET_ACCESS_TOKEN
//   GET_ME_SUCCESS,
//   GET_ME_FAILURE,
//   LOGOUT_SUCCESS
} from './types';
// import error from './ErrorModal';
// import success from './SuccessModal';

// export const signUp = (params) => {
//   return async (dispatch) => {
//     let response = await dispatch(signUpService(params));
//     if (response.success) {
//       dispatch({
//         type: SIGN_UP_SUCCESS,
//       })

//       dispatch(login(params));
  
//     }
//     else {
//       error(response.error);
//     }
//   }
// }
export function setAccessToken(payload) {
  return async (dispatch) => {
    dispatch({
      type: SET_ACCESS_TOKEN,
      payload
    })
  }
}

export function openAuthModal() {
  return async (dispatch) => {
    dispatch({
      type: OPEN_AUTH_MODAL,
    })
  }
}
export function closeAuthModal() {
  return async (dispatch) => {
    dispatch({
      type: CLOSE_AUTH_MODAL,
    })
  }
}
// export function getMe() {
//   return async (dispatch) => {
//     let response = await dispatch(getMeService());
//     if (response.success) {
//       dispatch({
//         type: GET_ME_SUCCESS,
//         payload: response
//       })
//     }
//     else {
//       dispatch({
//         type: GET_ME_FAILURE,
//         payload: response
//       })
//     }
//   }
// }

export function changeAuthPage() {
  return async (dispatch) => {
    dispatch({
      type: CHANGE_AUTH_PAGE,
    })
  }
}

// export function logout() {
//   return async (dispatch) => {
//     localStorage.removeItem('accessToken');
//     dispatch({
//       type: LOGOUT_SUCCESS,
//     })
//   }
// }
export function login(params) {
//   return async (dispatch) => {
//     let response = await dispatch(loginService(params));
//     if (response.success) {
//       dispatch(closeAuthModal());
//       localStorage.setItem('accessToken', response.accessToken)
//       dispatch(getMe());
//       dispatch({
//         type: LOGIN_SUCCESS,
//       })
//     }
//     else {
//       error(response.error);
//     }
//   }
}