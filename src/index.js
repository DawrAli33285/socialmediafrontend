import {Provider} from 'react-redux'
import React from 'react';
import store from './redux/store/store'
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import reportWebVitals from './reportWebVitals';
import * as process from 'process';

(window).global = window;
(window).process = process;
(window).Buffer = [];
const stripePromise = loadStripe('pk_test_51OW1mTLwIAXUknlJRnrrkJymxabZdLLS2zXycsrkqYcNnHWSNGOnd2wN1FfWuJXXsoU0Ghfa3qDEdntcjQh0R9nr00TBYPmPDJ'); // Replace with your own publishable key

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
      <Elements stripe={stripePromise}>

    <App />
      </Elements>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
