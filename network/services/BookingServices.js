import request from '../request';

export const createBookingService = (params) => {
  return async(dispatch) => {
      return await dispatch(request('/v1/booking', {
          method: 'PUT',
          data: params
      }))
  }
}

export const getBookingsService = () => {
    return async(dispatch) => {
        return await dispatch(request('/v1/booking', {
            method: 'GET',
        }))
    }
}


export const validateBookingService = (postcode, bookingClass) => {
    return async(dispatch) => {
        return await dispatch(request(`/v1/booking/validate?postcode=${postcode}&booking_class=${bookingClass}`, {
            method: 'GET',
        }))
}
}

export const createPaymentIntentService = (id) => {
    return async(dispatch) => {
        return await dispatch(request(`/v1/booking/${id}/payment/intent`, {                
            method: 'POST'
        }))
    }
  }

