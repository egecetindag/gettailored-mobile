import request from '../request';

export const getServicesService = (token) => {
  return async(dispatch) => {
      return await dispatch(request('/v1/service', {
          method: 'GET',
      }, token))
  }
}
export const getServiceInputsService = (token) => {
  return async(dispatch) => {
      return await dispatch(request('/v1/service/inputs', {
          method: 'GET',
      }, token))
  }
}

export const getTimeSlotsService = (date) => {
  return async(dispatch) => {
      return await dispatch(request(`/v1/time/${date}`, {
          method: 'GET',
      }))
  }
}

export const claimTimeSlotsService = (data) => {
  return async(dispatch) => {
      return await dispatch(request(`/v1/time/claim`, {
          method: 'PUT',
          data: data
      }))
  }
}