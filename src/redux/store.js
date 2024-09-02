import { configureStore } from '@reduxjs/toolkit';
import clockReducer from './reducers';

const store = configureStore({
  reducer: clockReducer,
});

export default store;
