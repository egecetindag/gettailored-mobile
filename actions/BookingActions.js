// import {Modal} from 'antd';
// import { ExclamationCircleOutlined } from '@ant-design/icons';
import {
  createBookingService,
  createPaymentIntentService,
  getBookingsService,
  validateBookingService,
} from '../network/services/BookingServices';
import {
  CREATE_PAYMENT_INTENT_REQUEST,
  CLEAN_TEMP_BOOKING_ID,
  CREATE_PAYMENT_INTENT_FAILURE,
  CREATE_PAYMENT_INTENT_SUCCESS,
  CREATE_BOOKING_FAILURE,
  CREATE_BOOKING_REQUEST,
  CREATE_BOOKING_SUCCESS,
  GET_BOOKINGS_FAILURE,
  GET_BOOKINGS_REQUEST,
  GET_BOOKINGS_SUCCESS,
  VALIDATE_BOOKING_FAILURE,
  VALIDATE_BOOKING_REQUEST,
  VALIDATE_BOOKING_SUCCESS,
  BOOKING_INFORMATION_RECORDED,
  ADD_CART_ITEM,
  REMOVE_CART_ITEM,
  SET_CART_TYPE,
  DELETE_BOOKING_INFO,
  SET_TIME_VALUES,
  VALIDATE_POSTCODE_FAILURE,
  VALIDATE_POSTCODE_REQUEST,
  VALIDATE_POSTCODE_SUCCESS
} from './types';
import { setErrorMsg, setLoading } from './GlobalActions';

export const createBooking = (params, next) => {
  return (dispatch) => {
    dispatch(setLoading(true));
    dispatch({
      type: CREATE_BOOKING_REQUEST,
    })
    dispatch(createBookingService(params))
      .then((response) => {
        dispatch(setLoading(false));
        console.log("loadinggg")
        if (response.success) {
          console.log("loadingggsuccess")
          dispatch({
            type: CREATE_BOOKING_SUCCESS,
            bookingID: response.id
          })

          next()
        } else {
          console.log("loadingggerrorr", params, response)
          dispatch(setErrorMsg(response.error));
          dispatch({
            type: CREATE_BOOKING_FAILURE,
            errorMsg: "An error has occurred"
          })
        }
      })
  }
}

export const cleanBookingCreationTempID = () => {
  return (dispatch) => {
    dispatch({
      type: CLEAN_TEMP_BOOKING_ID
    })
  }
}

export const setErrMsgAndCleanBooking = (msg) => {
  return (dispatch) => {
    dispatch(cleanBookingCreationTempID())
    dispatch(setErrorMsg(msg))
  }
}

export const validateBooking = (params, withFinishButton) => {
  return async (dispatch, getState) => {
    console.log("validateePending")
    dispatch(setLoading(true))
    dispatch({
      type: VALIDATE_BOOKING_REQUEST,
    })
    console.log("validatee", params )
    let response = await dispatch(validateBookingService(params, getState().booking.cartType));

    dispatch(setLoading(false))
    if (response.result === 'success') {
      console.log("validatee", response.price)
      dispatch({
        type: VALIDATE_BOOKING_SUCCESS,
        withFinishButton: withFinishButton,
        delivery: response.price
      })
    }
    else if (response.result === 'fail') {
      console.log("validatee", response.message)
      dispatch({
        type: VALIDATE_BOOKING_FAILURE,
        error: response.message
      })
    }
  }
}
export const validatePostcode = (postcode, service, navigation) => {
  return async (dispatch) => {
    console.log("pp", postcode, service, navigation)
    dispatch(setLoading(true))
    dispatch({
      type: VALIDATE_POSTCODE_REQUEST,
    })

    let response = await dispatch(validateBookingService(postcode, service));

    dispatch(setLoading(false))
    if (response.success) {
      if (response.result === 'success') {
        navigation.navigate({
          name:'Service',
          params:{type: service, step:1}
        })
        // history.push(`/service/${service}`)
        console.log("Set")
       
        dispatch({
          type: VALIDATE_POSTCODE_SUCCESS,
        })
      }
      else if (response.result === 'fail') {
        dispatch(setErrorMsg('We do not have service in your area!'))
        dispatch({
          type: VALIDATE_POSTCODE_FAILURE,
          error: response.message
        })
      }
    } else {
      dispatch(setErrorMsg('We do not have service in your area!'))
      dispatch({
        type: VALIDATE_POSTCODE_FAILURE,
        error: 'An error occurred'
      })
    }
    
  }
}
export const getBookings = () => {
  return async (dispatch) => {
    dispatch({
      type: GET_BOOKINGS_REQUEST,
    })
    let response = await dispatch(getBookingsService());

    if (response.success) {
      dispatch({
        type: GET_BOOKINGS_SUCCESS,
        payload: response
      })
    }
    else {
      dispatch({
        type: GET_BOOKINGS_FAILURE,
      })
      // error(response.error);
    }
  }
}




export const recordBookingInformation = (info) => {
  return (dispatch) => {
    dispatch({
      type: BOOKING_INFORMATION_RECORDED,
      info: info
    })
  }
}

export const addCartItem = (categoryName, serviceName, cost, code, inputArr) => {
  return (dispatch) => {
    dispatch({
      type: ADD_CART_ITEM,
      data: {
        category: categoryName,
        name: serviceName,
        cost,
        code,
        inputs: inputArr
      }
    })
  }
}

export const removeCartItem = (index) => {
  return (dispatch) => {
    dispatch({
      type: REMOVE_CART_ITEM,
      index: index
    })
  }
}

export const setCartType = (type) => {
  return (dispatch) => {
    dispatch({
      type: SET_CART_TYPE,
      cartType: type
    })
  }
}
export const switchService = (nextService, action)=>{
  return async (dispatch, getState) => {
  
    const cartType = getState().booking.cartType;
    if(cartType && cartType !== nextService){
      // Modal.confirm({
      //   title: 'Confirm switching to '+ nextService +' service',
      //   icon: <ExclamationCircleOutlined />,
      //   content: 'Your cart will be emptied if you confirm.',
      //   okText: 'OK',
      //   cancelText: 'Cancel',
      //   onOk: ()=>{ dispatch(deleteBookingInfo(action))},
      //   okCancel: ()=>{}
      // });
    
    }
    else{
      action();
    }
  }
}
export const deleteBookingInfo = (action) => {
  return (dispatch) => {
    dispatch({
      type: DELETE_BOOKING_INFO,
    })
    dispatch({
      type: SET_TIME_VALUES,
      data:{}
    })
    if(action){
      action();
    }
  }
}

export const createPaymentIntent = (id) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    dispatch({
      type: CREATE_PAYMENT_INTENT_REQUEST
    })
    let response = await dispatch(createPaymentIntentService(id));

    dispatch(setLoading(false));
    if (response.success) {
      dispatch({
        type: CREATE_PAYMENT_INTENT_SUCCESS,
        travelClientSecret: response.travel_client_secret,
        serviceClientSecret: response.service_client_secret
      })
    } else {
      dispatch(setErrorMsg("An error has occurred, refresh the page"))
      dispatch({
        type: CREATE_PAYMENT_INTENT_FAILURE
      })
    }
  }
}
