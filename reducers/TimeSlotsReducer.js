
import * as type from '../actions/types';

const INITIAL_STATE = {
  pickupClaimLoading: false,
  deliveryClaimLoading: false,
  pickupTimeslots: [],
  deliveryTimeslots: [],
  pickupClaimed: null,
  deliveryClaimed: null,
  claimRequestFailure: '',
  timeValues: {}
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case type.CLEAN_TIME_SLOTS_STATE:
      return INITIAL_STATE;
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
    //// CLAIM
    case type.CLAIM_TIME_SLOTS_REQUEST:
      return {
        ...state,
        [action.name + 'ClaimLoading']: true
      }
    case type.CLAIM_TIME_SLOTS_FAILURE:
      return {
        ...state,
        [action.name + 'ClaimLoading']: false,
        claimRequestFailure: action.errorMsg
      }
    case type.SET_TIME_VALUES:
      return{
        ...state,
        timeValues: action.data
      }
    default:
      return state
  }
    
}