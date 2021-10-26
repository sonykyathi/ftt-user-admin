import React, { Fragment, useEffect } from 'react';

import ContentHeader from '../layouts/ContentHeader';
// import { Redirect } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { paymentActions } from '../../redux';

const Home = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    paymentReset();
  }, []);

  const { paymentReset } = bindActionCreators(paymentActions, dispatch);
  const user = useSelector((state) => state.user);

  return (
    <Fragment>
      <div className='content-wrapper'>
        <ContentHeader title='Dashboard'></ContentHeader>
        <section className='content'>
          <div className='container-fluid'>
            <div className='dashboard-stats'>
              <div className='row'>
                <div className='col-lg-3 m-auto'>
                  <div className='small-box text-center'>
                    <div className='inner'>
                      <i className='ion ion-bag'></i>
                      <h3>0 FTT</h3>
                      <p>FTT Token</p>
                      <span>Token Balance</span>
                    </div>
                  </div>
                </div>

                {/* <div className='col-lg-3 m-auto'>
                  
                </div> */}

                <div className='col-lg-3 m-auto'>
                  <div className='small-box text-center'>
                    <div className='inner'>
                      <i className='ion ion-stats-bars'></i>
                      <h3>1 USD</h3>
                      <p>1 FTT</p>
                      <span>Live Price</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className='row'>
              <section className='col-lg-12 connectedSortable'>
                <div className='card table-main-header'>
                  <div className='card-header'>
                    <h3 className='card-title'>Transaction Report</h3>
                    <div className='card-tools'>
                      <div className='input-group input-group-sm table-search-filter'>
                        <input type='text' name='table_search' className='form-control float-right' placeholder='Search'/>
                        <div className='input-group-append'>
                          <button type='submit' className='btn btn-search'><i className='fas fa-search'></i></button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className='card-body table-responsive p-0'>
                    <table className='table table-hover text-nowrap'>
                      <thead>
                        <tr>
                          <th>User</th>
                          <th>Date</th>
                          <th>Status</th>
                          <th>Token Transferred </th>
                        </tr>
                      </thead>
                      <tbody></tbody>
                    </table>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </section>
      </div>
    </Fragment>
  );
};

Home.propTypes = {};

export default Home;
