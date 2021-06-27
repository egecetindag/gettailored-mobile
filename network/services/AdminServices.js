import request from '../request';

export const getAdminBookingService = () => {
    return async(dispatch) => {
        return await dispatch(request('/admin/booking', {
            method: 'GET',
        }))
    }
}

export const getAdminTimeslotsService = (date) => {
    return async(dispatch) => {
        return await dispatch(request(`/admin/time/${date}`, {
            method: 'GET',
        }))
    }
  }

  export const switchAdminTimeslotService = (variables) => {
    return async(dispatch) => {
        return await dispatch(request(`/admin/time`, {
            method: 'PUT',
            data: variables
        }))
    }
  }
  export const getPaymentService = (id, purpose, amount) => {
    return async(dispatch) => {
        return await dispatch(request(`/admin/booking/${id}/payment/capture`, {
            method: 'PUT',
            data: {
                purpose,
                amount
            }
        }))
    }
  }

