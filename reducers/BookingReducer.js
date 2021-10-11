import * as type from '../actions/types';

const INITIAL_STATE = {
  bookingLoading: false,
  successfullyCreatedID: 0,
  tempBookingID: 0,
  bookings: [],
  bookingValidation: false,
  delivery: undefined,
  cart: [],
  info: { step: 1 },
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    //// Create payment intent
    case type.CREATE_PAYMENT_INTENT_FAILURE:
      return {
        ...state,
        createPaymentIntentFailed: true,
        loadingStripeClientSecret: false,
      }
    case type.CREATE_PAYMENT_INTENT_REQUEST:
      return {
        ...state,
        loadingStripeClientSecret: true,
      }
    case type.CREATE_PAYMENT_INTENT_SUCCESS:
      return {
        ...state,
        stripeTravelClientSecret: action.travelClientSecret,
        stripeServiceClientSecret: action.serviceClientSecret,
        loadingStripeClientSecret: false,
      }
    case type.BOOKING_INFORMATION_RECORDED:
      return {
        ...state,
        info: action.info
      }
    //// Create booking
    case type.CREATE_BOOKING_REQUEST:
      return {
        ...state,
        bookingLoading: true

      }
    case type.CREATE_BOOKING_FAILURE:
      return {
        ...state,
        bookingCreationFailedMsg: action.errorMsg,
        bookingLoading: false,
        successfullyCreatedID: -1,
        tempBookingID: -1
      }
    case type.CREATE_BOOKING_SUCCESS:
      return {
        ...state,
        bookingLoading: false,
        successfullyCreatedID: action.bookingID,
        tempBookingID: 0,
      }
    case type.CLEAN_TEMP_BOOKING_ID:
      return {
        ...state,
        tempBookingID: 0
      }
    ///VALIDATE POSTCODE
    case type.VALIDATE_BOOKING_REQUEST:
      return {
        ...state,
        bookingValidation: 'validating',
        bookingValidationError: undefined,
        delivery: undefined
      }
    case type.VALIDATE_BOOKING_SUCCESS:
      return {
        ...state,
        delivery: action.delivery,
        bookingValidation: 'success'
      }
    case type.VALIDATE_BOOKING_FAILURE:
      return {
        ...state,
        bookingValidation: 'error',
        bookingValidationError: action.error?.message
      }
    case type.VALIDATE_POSTCODE_SUCCESS:
      return {
        ...state,
        postcodeSuccess: true,
        postcodeError: undefined
      }
    case type.VALIDATE_POSTCODE_REQUEST:
      return {
        ...state,
        postcodeSuccess: false,
        postcodeError: undefined,
      }
    case type.VALIDATE_POSTCODE_FAILURE:
      return {
        ...state,
        postcodeSuccess: false,
        postcodeError: action.error
      }
    ////// GET BOOKING
    case type.GET_BOOKINGS_SUCCESS:
      return {
        ...state,
        bookings: action.payload.bookings
      }

    //// CART
    case type.SET_CART_TYPE:
      return {
        ...state,
        cartType: action.cartType
      }
    case type.ADD_CART_ITEM:
      return {
        ...state,
        cart: state.cart.concat(action.data)
      }
    case type.REMOVE_CART_ITEM:
      const removed = [...state.cart.slice(0, action.index), ...state.cart.slice(action.index + 1)];
      return {
        ...state,
        cart: removed
      }
    case type.DELETE_BOOKING_INFO:
      return {
        ...INITIAL_STATE
      }
    default:
      return state;
  }
};
