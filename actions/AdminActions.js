import {
GET_ADMIN_BOOKING_SUCCESS,
GET_ADMIN_BOOKING_REQUEST,
GET_ADMIN_BOOKING_FAILURE,
GET_ADMIN_TIMESLOT_REQUEST,
GET_ADMIN_TIMESLOT_SUCCESS,
GET_ADMIN_TIMESLOT_FAILURE,
SWITCH_ADMIN_TIMESLOT_REQUEST,
SWITCH_ADMIN_TIMESLOT_SUCCESS,
SWITCH_ADMIN_TIMESLOT_FAILURE,
GET_PAYMENT_REQUEST,
GET_PAYMENT_SUCCESS,
GET_PAYMENT_FAILURE,
} from './types';
import {
    getAdminBookingService,
    getAdminTimeslotsService,
    switchAdminTimeslotService,
    getPaymentService
  } from '../network/services/AdminServices';
import { setLoading, setErrorMsg } from './GlobalActions';

  export const switchAdminTimeslot = (variables) => {
    return async (dispatch) => {
      dispatch({
        type: SWITCH_ADMIN_TIMESLOT_REQUEST,
      })
      let response = await dispatch(switchAdminTimeslotService(variables));

      if (response.success) {
        dispatch({
          type: SWITCH_ADMIN_TIMESLOT_SUCCESS,
          payload: response
        });
        dispatch(getAdminTimeslots(variables.date))
      }
      else {
        dispatch({
          type: SWITCH_ADMIN_TIMESLOT_FAILURE,
        })
        // error(response.error);
      }
    }
  }

export const getAdminBooking = () => {
    return async (dispatch) => {
      dispatch(setLoading(true));
      dispatch({
        type: GET_ADMIN_BOOKING_REQUEST,
      })
      let response = await dispatch(getAdminBookingService());
      dispatch(setLoading(false));
      if (response.success) {
        dispatch({
          type: GET_ADMIN_BOOKING_SUCCESS,
          payload: response
        })
      }
      else {
        setErrorMsg("An error occurred, refresh and try again")
        dispatch({
          type: GET_ADMIN_BOOKING_FAILURE,
        })
      }
    }
  }

  export const getAdminTimeslots = (date, name) => {
    return async (dispatch) => {
      dispatch({
        type: GET_ADMIN_TIMESLOT_REQUEST,
        name
      })
      let response = await dispatch(getAdminTimeslotsService(date));

      if (response.success) {
        dispatch({
          type: GET_ADMIN_TIMESLOT_SUCCESS,
          name,
          payload: response
        })
      }
      else {
        setErrorMsg("An error occurred")
        dispatch({
          type: GET_ADMIN_TIMESLOT_FAILURE,
          name
        })
        // error(response.error);
      }
    }
  }

  export const getPayment = (id, purpose, amount) => {
    return async (dispatch) => {
      dispatch(setLoading(true));
      dispatch({
        type: GET_PAYMENT_REQUEST
      })
      let response = await dispatch(getPaymentService(id,purpose,amount));
      dispatch(setLoading(false));
      if (response.success) {
        dispatch({
          type: GET_PAYMENT_SUCCESS
        })
        dispatch(getAdminBooking());
      }
      else {
        setErrorMsg("An error occurred")
        dispatch({
          type: GET_PAYMENT_FAILURE
        })
        // error(response.error);
      }
    }
  }