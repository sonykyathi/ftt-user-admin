import React, { Fragment, useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as API from '../../utils/realAPI';

import { useSelector } from 'react-redux';

const SideBar = (props) => {
  const [state, setstate] = useState({ role: 0 })
  const user = useSelector((state) => state.user);
  const { firstName, lastName } = user.user;
  const color1 = '#140E38';
  const color2 = '#194089';

  useEffect(() => {
    API.getRoles().then(data => {
      setstate({ ...state, role: data.role })
    });
  }, [])
  return (
    <Fragment>
      <aside className='main-sidebar elevation-4'>
        <div className='sidebar'>
          <div className='user-panel d-flex'>
            <div className='image'>
              <img
                src='dist/img/user2-160x160.jpg'
                className='img-circle elevation-2'
                alt='User Image'
              />
            </div>
            <div className='info'>
              <Link to='/profile' className='d-block'>
                {`${firstName} ${lastName}`}
                {/* John Doe */}
              </Link>
            </div>
          </div>

          <div className='form-inline sidebar-search'>
            <div className='input-group aside-search' data-widget='sidebar-search'>
              <input
                className='form-control form-control-sidebar'
                type='search'
                placeholder='Search'
                aria-label='Search'
              />
              <div className='input-group-append'>
                <button className='btn btn-sidebar'>
                  <i className='fas fa-search fa-fw'></i>
                </button>
              </div>
            </div>
          </div>

          <nav className='mt-2'>
            <ul
              className='nav nav-pills nav-sidebar flex-column'
              data-widget='treeview'
              role='menu'
              data-accordion='false'
            >
              {' '}
              <li className='nav-header'>Navigation</li>
              <li className='nav-item'>
                <Link to='/' className='nav-link'>
                  <i className='nav-icon fas fa-tachometer-alt'></i>
                  <p>
                    Dashboard
                    {/* <span className='right badge badge-danger'>New</span> */}
                  </p>
                </Link>
              </li>
              {
                state.role === 1 &&
                <li className='nav-item'>
                  <Link to='/users' className='nav-link'>
                    <i className='nav-icon fas fa-coins'></i>
                    <p>
                      Users
                      {/* <span className='right badge badge-danger'>New</span> */}
                    </p>
                  </Link>
                </li>
              }
              <li className='nav-item'>
                <Link to='/token' className='nav-link'>
                  <i className='nav-icon fas fa-coins'></i>
                  <p>
                    Buy Tokens
                    {/* <span className='right badge badge-danger'>New</span> */}
                  </p>
                </Link>
              </li>
              <li className='nav-header'>Personal</li>
              <li className='nav-item'>
                <Link to='/balance' className='nav-link'>
                  <i className='nav-icon fas fa-credit-card'></i>
                  <p>
                    Transaction Report
                    {/* <span className='right badge badge-danger'>New</span> */}
                  </p>
                </Link>
              </li>
              <li className='nav-item'>
                <Link to='/profile' className='nav-link'>
                  <i className='nav-icon fas fa-user-alt'></i>
                  <p>
                    My Profile
                    {/* <span className='right badge badge-danger'>New</span> */}
                  </p>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
    </Fragment>
  );
};

SideBar.propTypes = {};

export default SideBar;
