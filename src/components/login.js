import React, { useState, useContext } from 'react';
import classes from './login.module.scss';
import { Redirect } from 'react-router-dom';
import { AuthContext } from './context/auth-context';
import Modal from './UI/modal';
import Spinner from './UI/spinner';
const Login = () => {
  const authContext = useContext(AuthContext);
  const [Username, setUsername] = useState('');
  const [Password, setPassword] = useState('');
  const [dismissModal, setDismissModal] = useState(false);
  const errorMessage =
    'Unable to sign in at this moment. Please try again later';
  const closeModal = () => setDismissModal(true);
  const submitHandler = e => {
    e.preventDefault();
    console.log(Username);
    console.log(Password);
    authContext.login(Username, Password);
    console.log(authContext.isAuth);
  };
  let content = (
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

  if (authContext.isAuth) {
    content = <Redirect to="/" />;
  }
  if (authContext.isLoading) {
    content = <Spinner />;
  }

  if (authContext.isError !== null) {
    content = (
      <Modal close={closeModal} dismiss={dismissModal}>
        {errorMessage}
      </Modal>
    );
  }
  return content;
};

export default Login;
