import React, { useContext, useEffect } from 'react';
import Routes from './components/routes/routes';
import { AuthContext } from './components/context/auth-context';

const App = () => {
  const authContext = useContext(AuthContext);
  useEffect(() => {
    console.log('Mounted the DOM');
    authContext.checkAuthState();
    authContext.seedFirebase();
  }, [authContext]);
  return <Routes />;
};

export default App;
