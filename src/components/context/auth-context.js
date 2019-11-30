import React, { useState } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import axios from 'axios';
export const AuthContext = React.createContext({
  isAuth: false,
  login: () => {},
  seedFirebase: () => {}
});

const AuthContextProvider = props => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  console.log(props);
  const loginHandler = () => {
    setIsAuthenticated(true);
    props.history.push('/');
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
        seedFirebase: seedDb
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
export default withRouter(AuthContextProvider);
