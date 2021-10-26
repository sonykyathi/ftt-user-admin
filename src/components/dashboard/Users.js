import React, { Fragment, useEffect, useState } from 'react';

import ContentHeader from '../layouts/ContentHeader';
import * as API from '../../utils/realAPI'
import moment from 'moment';
import swal from 'sweetalert';
import Pagination from 'react-responsive-pagination';

const UsersComponent = (props) => {

    const [state, setstate] = useState({
        active_Users: [],
        inactive_Users: [],
        inactive_current_page: 0,
        active_current_page: 0,
        active_limit: 10,
        inactive_limit: 10,
        activeuser_total: 0,
        inactiveuser_total: 0,

    })

    useEffect(() => {
        _activeUser();
        _inActiveUser();
    }, []);



    useEffect(() => {
        _inActiveUser();
    }, [state.inactive_current_page])
    useEffect(() => {

    }, [state.active_current_page])

    const _inActiveUser = () => {
        API.inactiveUsers({ page: state.inactive_current_page, limit: state.inactive_limit }).then(data => {
            setstate((prevState) => {
                return ({
                    ...prevState,
                    inactive_Users: data.users,
                    inactiveuser_total: Math.ceil(data.totalDocs / state.inactive_limit)
                })
            })
        }).catch(() => {
            setstate({ ...state, inactive_Users: [] })
        })
    }

    const _activeUser = () => {
        API.activeUsers({ page: state.active_current_page, limit: state.active_limit }).then(data => {
            setstate((prevState) => {
                return ({
                    ...prevState, active_Users: data.users, activeuser_total: Math.ceil(data.totalDocs / state.active_limit   )
                })
            })
        }).catch(() => {
            setstate({ ...state, active_Users: [] })
        })
    }


    const verifyUser = (email, status) => {
        swal({
            title: "Are you sure?",
            text: !status ? "Do you want to verify this user?!" : "Do you want to un-verify this user?!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    API.activeInactiveUser({ email, status: !status }).then(data => {
                        _inActiveUser()
                        _activeUser()
                        swal(!status ? "User Verified" : "User Un-Verified", {
                            icon: "success",
                        });
                    }).catch(() => {
                        swal("Operation Failed", {
                            icon: "error",
                        });
                    })

                }
            });
    }


    const handlePageChange_active = (number) => {
        number = number-1;
        setstate((prevState) => {
            return ({
                ...prevState, active_current_page: number
            })
        })
    }

    const handlePageChange_inactive = (number) => {
        number = number-1;
        setstate((prevState) => {
            return ({
                ...prevState, inactive_current_page: number
            })
        })
    }


    return (
        <Fragment>
            <div className='content-wrapper'>
                <ContentHeader title='Dashboard'></ContentHeader>
                <section className='content'>
                    <div className='container-fluid'>
                        <div className='row'>
                            <div className='col-lg-3'>
                                <div className='small-box text-center'>
                                    <div className='inner'>
                                        <i className='ion ion-bag'></i>
                                        <h3>0 Defitt</h3>
                                        <p>Defitt Token</p>
                                        <p>Token Balance</p>
                                    </div>
                                </div>
                            </div>

                            <div className='col-lg-3 offset-1'>
                                <div className='small-box text-center'>
                                    <div className='inner'>
                                        <i className='ion ion-stats-bars'></i>
                                        <h3>10 USD</h3>
                                        <p>1 Defitt</p>
                                        <p>Live Price</p>
                                    </div>
                                </div>
                            </div>

                            <div className='col-lg-3 offset-1'>
                                <div className='small-box text-center'>
                                    <div className='inner'>
                                        <i className='ion ion-stats-bars'></i>
                                        <h3>7 USD</h3>
                                        <p>1 Defitt</p>
                                        <p>With Referral code</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='row'>
                            <section className='col-lg-6 connectedSortable'>
                                <div className='card'>
                                    <div className='card-header'>
                                        <h3 className='card-title'>Active Users</h3>

                                        <div className='card-tools'>
                                            <div
                                                className='input-group input-group-sm'
                                                style={{ width: '150px' }}
                                            >
                                                <input
                                                    type='text'
                                                    name='table_search'
                                                    className='form-control float-right'
                                                    placeholder='Search'
                                                />

                                                <div className='input-group-append'>
                                                    <button type='submit' className='btn btn-default'>
                                                        <i className='fas fa-search'></i>
                                                    </button>
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
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    state.active_Users.length > 0 ?
                                                        state.active_Users.map((val, key) => {
                                                            return (
                                                                <tr key={key + "active"}>
                                                                    <td>
                                                                        {val.email}
                                                                    </td>
                                                                    <td>
                                                                        {moment(val.updatedAt).format('DD-MM-YYYY, h:mm a')}
                                                                    </td>
                                                                    <td>
                                                                        <button type="button" className="btn" onClick={() => verifyUser(val.email, val.emailVerified)}>Unverify </button>
                                                                    </td>
                                                                </tr>

                                                            )
                                                        }) :
                                                        <tr>
                                                            <td colSpan="4" style={{ textAlign: "center" }}>No Record Found</td>
                                                        </tr>
                                                }
                                            </tbody>
                                        </table>
                                        {
                                            state.active_Users.length > 0 ?
                                                <Pagination
                                                    current={state.active_current_page+1}
                                                    total={state.activeuser_total}
                                                    onPageChange={handlePageChange_active}
                                                /> : null
                                        }


                                    </div>
                                </div>
                            </section>
                            <section className='col-lg-6 connectedSortable'>
                                <div className='card'>
                                    <div className='card-header'>
                                        <h3 className='card-title'>In-Active Users</h3>

                                        <div className='card-tools'>
                                            <div
                                                className='input-group input-group-sm'
                                                style={{ width: '150px' }}
                                            >
                                                <input
                                                    type='text'
                                                    name='table_search'
                                                    className='form-control float-right'
                                                    placeholder='Search'
                                                />

                                                <div className='input-group-append'>
                                                    <button type='submit' className='btn btn-default'>
                                                        <i className='fas fa-search'></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='card-body table-responsive p-1'>
                                        <table className='table table-hover text-nowrap'>
                                            <thead>
                                                <tr>
                                                    <th>User</th>
                                                    <th>Date</th>
                                                    <th>Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    state.inactive_Users.length > 0 ?
                                                        state.inactive_Users.map((val, key) => {
                                                            return (
                                                                <tr key={key + "inactive"}>
                                                                    <td>
                                                                        {val.email}
                                                                    </td>
                                                                    <td>
                                                                        {moment(val.updatedAt).format('DD-MM-YYYY, h:mm a')}
                                                                    </td>
                                                                    <td>
                                                                        <button type="button" className="btn" onClick={() => verifyUser(val.email, val.emailVerified)}>Verify </button>
                                                                    </td>
                                                                </tr>

                                                            )
                                                        }) :
                                                        <tr>
                                                            <td colSpan="4" style={{ textAlign: "center" }}>No Record Found</td>
                                                        </tr>
                                                }
                                            </tbody>
                                        </table>
                                        {
                                            state.inactive_Users.length > 0 ?
                                                <Pagination
                                                    current={state.inactive_current_page + 1}
                                                    total={state.inactiveuser_total}
                                                    onPageChange={handlePageChange_inactive}
                                                /> : null
                                        }
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

UsersComponent.propTypes = {};

export default UsersComponent;
