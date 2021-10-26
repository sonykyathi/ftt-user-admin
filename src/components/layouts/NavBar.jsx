import React, { Fragment } from 'react';
import {Link} from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { userActions } from '../../redux';

const NavBar = () => {

  const dispatch = useDispatch();

  const { logout } = bindActionCreators(userActions, dispatch);

  return (
    <Fragment>
      <nav className='main-header navbar navbar-expand'>
        <ul className='navbar-nav'>
          <li className='nav-item'>
            <a className='nav-link' data-widget='pushmenu' href='#' role='button'>
              <i className='fas fa-bars'></i>
            </a>
          </li>
          <li className='nav-item d-none d-sm-inline-block'>
            <Link to='/' className='nav-link'>
              Home
            </Link>
          </li>
        </ul>

        <ul className='navbar-nav ml-auto'>
          <li className='nav-item dropdown'>
            <a className='nav-link' data-toggle='dropdown' title='Logout' style={{cursor:'pointer'}} onClick={logout}>
            <i class="fas fa-sign-out-alt"></i>
              
            </a>
          </li>
          <li className='nav-item'>
            <a className='nav-link' data-widget='fullscreen' href='#' role='button'>
              <i className='fas fa-expand-arrows-alt'></i>
            </a>
          </li>
        </ul>
      </nav>
    </Fragment>
  );
};

export default NavBar;
