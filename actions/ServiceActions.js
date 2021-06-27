import {
  getServicesService,
  getServiceInputsService,
  getTimeSlotsService
} from '../network/services/ServiceServices';
import {
  GET_SERVICES_FAILURE,
  GET_SERVICES_REQUEST,
  GET_SERVICES_SUCCESS,
  GET_SERVICE_INPUTS_REQUEST,
  GET_SERVICE_INPUTS_SUCCESS,
  GET_SERVICE_INPUTS_FAILURE,
} from './types';


export const getServices = (id) => {
  return async (dispatch) => {
    dispatch({
      type: GET_SERVICES_REQUEST,
    })
    let response = await dispatch(getServicesService());
    if (response.success) {
      dispatch({
        type: GET_SERVICES_SUCCESS,
        payload: response
      })
    }
    else {
      dispatch({
        type: GET_SERVICES_FAILURE,
      })
      // error(response.error);
    }
  }
}

export const getServiceInputs = () => {
  return async (dispatch) => {
    dispatch({
      type: GET_SERVICE_INPUTS_REQUEST,
    })
    let response = await dispatch(getServiceInputsService());

    if (response.success) {
      dispatch({
        type: GET_SERVICE_INPUTS_SUCCESS,
        inputs: response
      })
    }
    else {
      dispatch({
        type: GET_SERVICE_INPUTS_FAILURE,
      })
      // error(response.error);
    }
  }
}


