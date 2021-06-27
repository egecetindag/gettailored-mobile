import * as type from '../actions/types';

const INITIAL_STATE = {
  services: [],
  serviceInputs: {}
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case type.GET_SERVICES_SUCCESS:
      return {
        ...state,
        services: action.payload.services
      };
    case type.GET_TIMESLOT_SUCCESS:
      return {
        ...state,
        [action.name + "Timeslots"]: action.payload.timeslots
      }
      case type.DELETE_TIMESLOTS:
        return {
          ...state,
          [action.name]: undefined
        }
  
    case type.GET_SERVICE_INPUTS_SUCCESS:
      return {
        ...state,
        serviceInputs: action.inputs
      }
    default:
      return state;
  }
};
