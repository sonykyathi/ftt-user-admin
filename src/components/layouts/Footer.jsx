import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const Footer = (props) => {
  return (
    <Fragment>
      <footer className='main-footer text-center'>
        Copyright &copy; 2021<a href='https://www.ftttoken.com/' target='_blank'>FTT</a>.&nbsp;All rights reserved.
      </footer>
    </Fragment>
  );
};

Footer.propTypes = {};

export default Footer;
