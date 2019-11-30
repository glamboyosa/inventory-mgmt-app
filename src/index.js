import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import AuthContextProvider from './components/context/auth-context';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
import * as serviceWorker from './serviceWorker';
axios.defaults.baseURL = 'https://inventory-mgmt-4b42b.firebaseio.com';
ReactDOM.render(
  <Router>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
