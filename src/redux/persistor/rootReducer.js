// src/redux/rootReducer.js
import { combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { persistReducer } from 'redux-persist';
import authenticationslices from '../slices/authenticationslices';
import postSlices from '../slices/postSlices'
import messengerslice from '../slices/messengerslice';
import notificationSlice from '../slices/notificationSlice';
import subSlice from '../slices/subscription'
import reviewSlice from '../slices/reviewSlice';
import seachslice from '../slices/seachslice';
import accountSlice from '../slices/accountSlice'
const rootReducer = combineReducers({
  authenticationslices,
  postSlices,
  messengerslice,
  subSlice,
  seachslice,
  notificationSlice,
  accountSlice,
  reviewSlice
});

const persistConfig = {
  key: 'root',
  storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
