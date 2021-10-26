import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import ContentHeader from '../layouts/ContentHeader';
import PropTypes from 'prop-types';

const Balance = (props) => {
  const user = useSelector((state) => state.user);
  

  return (
    <Fragment>
      <div className='content-wrapper'>
        <ContentHeader title='Balance'></ContentHeader>
        <section className='content'>
          <div className='container-fluid'></div>
        </section>
      </div>
    </Fragment>
  );
};

Balance.propTypes = {};

export default Balance;
