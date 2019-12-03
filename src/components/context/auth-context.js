import React, { useState } from 'react';
import axios from 'axios';
export const AuthContext = React.createContext({
  isAuth: false,
  isError: null,
  isLoading: true,
  token: null,
  localId: null,
  login: () => {},
  logout: () => {},
  checkAuthState: () => {},
  seedFirebase: () => {}
});

const AuthContextProvider = props => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [token, setToken] = useState(null);
  const [localId, setLocalId] = useState(null);
  console.log(props);
  const logOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('localId');
    localStorage.removeItem('expirationDate');
    setToken(null);
    setLocalId(null);
    setIsAuthenticated(false);
  };
  const checkTimeLeft = expiresIn =>
    setTimeout(() => logOut(), expiresIn * 1000);

  const loginHandler = (email, password) => {
    const data = {
      email,
      password,
      returnSecureToken: true
    };
    setLoading(true);
    axios
      .post(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyApdoPvXyD47JguP_5ydYI_Xhd6QxbnwBc',
        data
      )
      .then(resp => {
        console.log(resp.data);
        setLoading(false);
        setToken(resp.data.idToken);
        setLocalId(resp.data.localId);
        const expirationDate = new Date(
          new Date().getTime() + resp.data.expiresIn * 1000
        );
        localStorage.setItem('token', resp.data.idToken);
        localStorage.setItem('localId', resp.data.localId);
        localStorage.setItem('expirationDate', expirationDate);
        setIsAuthenticated(true);
        checkTimeLeft(resp.data.expiresIn);
      })
      .catch(err => {
        console.error(err.message);
        setError(err.message);
      });
  };
  const checkAuthState = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      logOut();
    } else {
      const localId = localStorage.getItem('localId');
      const expirationDate = new Date(localStorage.getItem('expirationDate'));
      if (expirationDate > new Date()) {
        setToken(token);
        setLocalId(localId);
        setIsAuthenticated(true);
        checkTimeLeft((expirationDate.getTime() - new Date().getTime()) / 1000);
      } else {
        logOut();
      }
    }
  };
  //THIS FUNCTION SEEDS THE FIREBASE DATABASE
  const seedDb = () => {
    const data = {
      items: 'Folders'
    };
    // axios.post('/items.json', data).then(resp => console.log(resp.data));
  };
  return (
    <AuthContext.Provider
      value={{
        login: loginHandler,
        isAuth: isAuthenticated,
        seedFirebase: seedDb,
        checkAuthState,
        logout: logOut,
        isError: error,
        isLoading,
        token,
        localId
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthContextProvider;
