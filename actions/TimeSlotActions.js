import {
  GET_TIMESLOT_FAILURE,
  GET_TIMESLOT_SUCCESS,
  DELETE_TIMESLOTS,
  GET_TIMESLOT_REQUEST,
  CLAIM_TIME_SLOTS_REQUEST,
  CLEAN_TIME_SLOTS_STATE,
  CLAIM_TIME_SLOTS_FAILURE,
  CLAIM_TIME_SLOTS_SUCCESS,
  SET_TIME_VALUES
} from './types';
import {
  getTimeSlotsService,
  claimTimeSlotsService
} from '../network/services/ServiceServices';


export const deleteTimeSlots = (name) => {
  return async (dispatch) => {
    dispatch({
      type: DELETE_TIMESLOTS,
      name
    })
  }
}

export const cleanTimeSlotState = () => {
  return (dispatch) => {
    dispatch({
      type: CLEAN_TIME_SLOTS_STATE
    })
  }
}

export const getTimeSlots = (date, name) => {
  return async (dispatch) => {
    dispatch({
      type: GET_TIMESLOT_REQUEST,
      name
    })
    let response = await dispatch(getTimeSlotsService(date));

    if (response.success) {
      dispatch({
        type: GET_TIMESLOT_SUCCESS,
        name,
        payload: response
      })
    } else {
      dispatch({
        type: GET_TIMESLOT_FAILURE,
        name
      })
      // error(response.error);
    }
  }
}

export const claimTimeSlots = (data, next) => {
  return async (dispatch) => {
    dispatch({
      type: CLAIM_TIME_SLOTS_REQUEST
    })

    let response = await dispatch(claimTimeSlotsService(data))
    if (response.success) {
      dispatch({
        type: CLAIM_TIME_SLOTS_SUCCESS
      })
      next();
    } else {
      console.log("Erorrr", response)
      dispatch({
        type: CLAIM_TIME_SLOTS_FAILURE,
        errorMsg: "An error has occurred"
      })
    }
  }
}

export const setTimeValues = (data) => {
  return async (dispatch) => {
    dispatch({
      type: SET_TIME_VALUES,
      data,
    })

    // let response = await dispatch(claimTimeSlotsService(data))
    // if (response.success) {
    //   dispatch({
    //     type: CLAIM_TIME_SLOTS_SUCCESS,
    //     name,
    //     payload: response,
    //     claimed: data
    //   })
    // } else {
    //   dispatch({
    //     type: CLAIM_TIME_SLOTS_FAILURE,
    //     name,
    //     claimed: data,
    //     errorMsg: "An error has occurred"
    //   })
    // }
  }
}