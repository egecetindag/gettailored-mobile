import * as type from '../actions/types';

const INITIAL_STATE = {
  adminBookings: [],
  getAdminSuccess: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case type.GET_ADMIN_BOOKING_SUCCESS:
      return {
        ...state,
        adminBookings: action.payload.bookings
      }
    case type.GET_ADMIN_TIMESLOT_SUCCESS:
      return {
        ...state,
        adminTimeslots: action.payload.timeslots
      }
    case type.GET_PAYMENT_SUCCESS:
      return {
        ...state,
        getAdminSuccess: true
      }
    case type.GET_PAYMENT_REQUEST:
      return {
        ...state,
        getAdminSuccess: false
      }
    case type.GET_PAYMENT_FAILURE:
      return {
        ...state,
        getAdminSuccess: false
      }
    default:
      return state;
  }
};
