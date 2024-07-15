// import authenticationslices from '../slices/authenticationslices';
// import { configureStore } from '@reduxjs/toolkit'
// const store=configureStore({
//     reducer:{
// authenticationslices
//     }
// })
// export default store;
// src/redux/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';
import persistedReducer from '../persistor/rootReducer'; // make sure the path is correct

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
});

export const persistor = persistStore(store);

export default store;
