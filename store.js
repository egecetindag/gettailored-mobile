import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import  reducer from './reducers';

const loggerMiddleware = createLogger();

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('redux-state');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
}; 

const saveState = (state) => {
  
  try {
    const serializedState = JSON.stringify({
    booking: {...state.booking,tempBookingID: 0},
    auth: {...state.auth},
    service: {...state.service},
    timeslots: {...state.timeslots},
  
  });
    localStorage.setItem('redux-state', serializedState);
  } catch {
    // ignore write errors
  }
};

const persistedState = loadState();

export const store = createStore(
    reducer,
    persistedState,
    applyMiddleware(
        thunkMiddleware,
        // loggerMiddleware
    ),
);

store.subscribe(() => {
  saveState(store.getState());
});