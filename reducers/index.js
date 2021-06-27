import auth from './AuthReducer';
import service from './ServiceReducer';
// import store from './StoreReducer';
import booking from './BookingReducer';
import global from './GlobalReducer';
import admin from './AdminReducer';
import timeslots from './TimeSlotsReducer';
import { combineReducers } from 'redux';
export default combineReducers({
    auth,
    service,
    booking,
    global,
    admin,
    timeslots
    // store,
    // address
})