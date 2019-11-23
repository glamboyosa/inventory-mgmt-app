import React, { useState, useContext } from 'react';
import classes from './login.module.scss';
import { withRouter } from 'react-router-dom';
import { AuthContext } from './context/auth-context';
const Login = () => {
  const authContext = useContext(AuthContext);
  const [Username, setUsername] = useState('');
  const [Password, setPassword] = useState('');
  const submitHandler = e => {
    e.preventDefault();
    console.log(Username);
    console.log(Password);
    authContext.login();
    console.log(authContext.isAuth);
  };
  return (
    <div className={classes.section}>
      <form className={classes.form} onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="Username"
          onChange={e => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={e => setPassword(e.target.value)}
        />
        <button className={classes.submit} type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
