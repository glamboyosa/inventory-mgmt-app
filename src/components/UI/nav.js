import React from 'react';
import classes from './nav.module.scss';
import { Link } from 'react-router-dom';
const Nav = () => {
  return (
    <nav className={classes.nav}>
      <ul className={classes.mainNav}>
        <li>
          <Link className={classes.link} to="/logout">
            Sign out
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
