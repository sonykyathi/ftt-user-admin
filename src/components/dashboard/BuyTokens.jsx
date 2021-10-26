import React, { Fragment, useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import StripeCheckout from 'react-stripe-checkout';
import ContentHeader from '../layouts/ContentHeader';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { paymentActions, alertAction } from '../../redux';
import { getYears } from '../../utils/date';
import api from '../../utils/api';
import PropTypes from 'prop-types';

const BuyTokens = (props) => {
  const [usdField, setUSDField] = useState('');
  const [defittField, setDefittField] = useState('');
  const [defittPrice, setDefittPrice] = useState(10);
  const [referalCode, setReferalCode] = useState('');
  const [verifyReferalCode, setVerifyReferalCode] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [paymentCurrency, setPaymentCurrency] = useState('');
  const [lockingTime, setLockingTime] = useState('');
  const [toAddress, setToAddress] = useState('');

  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const payment = useSelector((state) => state.payment);
  const { makePayment } = bindActionCreators(paymentActions, dispatch);
  const { setAlert } = bindActionCreators(alertAction, dispatch);

  const { success } = payment;

  if (success) {
    return <Redirect to='/' />;
  }

  const resetStates = () => {
    setUSDField('');
    setDefittField('');
    setReferalCode('');
    setVerifyReferalCode(false);
    setPaymentMethod('');
    setPaymentCurrency('');
    setLockingTime('');
    setToAddress('');
  };

  const referalCodeVerification = () => {
    api
      .post(`/api/v1/auth/verifyReferalCode`, {
        referalCode: referalCode,
        id: user.user._id,
      })
      .then((res) => {
        setVerifyReferalCode(true);
      })
      .catch((err) => {
        setVerifyReferalCode(false);
        setAlert(err.response.data.error, 'danger');
      });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    // console.log
  };

  const showAlert =()=>{

  }
  return (
    <Fragment>
      <div className='content-wrapper buy-token-wrapper'>
        <ContentHeader title='Buy Tokens'></ContentHeader>
        <section className='content'>
          
          <div className='container-fluid'>
            <div className='text-center buytoken-content'>
              <h4>Choose currency or crypto and calculate FTT price</h4>
              <p>You can buy FTT at the given price using BNB,USDT, ETH  to be a part of our project</p>
            </div>
            <div className='row justify-content-center'>
              <div className='col-lg-8'>
                <form
                  id='login'
                  onSubmit={onSubmit}
                  className='login-form-content'
                  autoComplete='off'
                >
                    <Fragment>
                      <div className='row'>
                        <div className='col-lg-6'>
                          <div className='form-group'>
                            <label style={{ marginBottom: '0px !important' }}>
                              Select Payment Method
                            </label>
                            <select
                              onChange={(e) => {
                                setPaymentMethod(e.target.value);
                              }}
                              name='paymentMethod'
                              className='form-control browser-default'
                            >
                              <option value='' selected disabled hidden>
                                Select
                              </option>
                              <option value='fiat'>
                                Fiat Currency Payment
                              </option>
                            </select>
                          </div>
                        </div>
                        <div className='col-lg-6'>
                          <div className='form-group'>
                            <label
                              htmlFor='paymentCurrency'
                              style={{ marginBottom: '0px !important' }}
                            >
                              Select Payment Currency
                            </label>
                            <select
                              onChange={(e) => {
                                setPaymentCurrency(e.target.value);
                              }}
                              name='paymentCurrency'
                              className='form-control browser-default'
                            >
                              <option value='' selected disabled hidden>
                                Select One
                              </option>
                              <option value='usd'>US Dollar</option>
                              <option value='eur'>Euro (EUR)</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className='row'>
                        <div className='col-lg-2'>
                          <div className='form-group'>
                            <label>Buy FTT</label>
                          </div>
                        </div>
                      </div>
                      <div className='row'>
                        <div className='col-lg-6'>
                          <div className='form-group'>
                            <label htmlFor='buydefitt'>USD</label>
                            <input
                              id='number'
                              type='number'
                              value={usdField}
                              onChange={(e) => {
                                let amount = parseFloat(e.target.value);

                                if (
                                  isNaN(amount) ||
                                  amount < 0 ||
                                  e.target.value[0] === '0'
                                ) {
                                  amount = '';
                                }

                                setUSDField(amount);
                                setDefittField(amount / defittPrice);
                                if (amount == 0) setDefittField('');
                              }}
                              className='form-control'
                            />
                          </div>
                        </div>

                        <div className='col-lg-6'>
                          <div className='form-group'>
                            <label htmlFor='defittField'>FTT</label>{' '}
                            <input
                              id='number'
                              type='number'
                              value={defittField}
                              onChange={(e) => {
                                setDefittField(e.target.value);
                                setUSDField(e.target.value * defittPrice);
                                if (e.target.value == 0) setUSDField('');
                              }}
                              className='form-control'
                            />
                          </div>
                        </div>

                        
                      </div>
                      <div className='row'>
                        <div className='col-lg-12 '>
                          <div className='form-group'>
                            <label className="wallet-label" htmlFor='amountcontribution'>Wallet Address</label>
                            <span className="form-wallet">Dont have a wallet?<a className ="form-createone" href="https://youtu.be/jnMxyXOTW8g" target="_blank" title="click hear">  Create one</a></span>
                            
                            <input
                              type='text'
                              name='toAddress'
                              value={toAddress}
                              className='form-control'
                              onChange={(e) => setToAddress(e.target.value)}
                             
                            />
                            <br/>
                           
                            
                          </div>
                        </div>
                      </div>
                      <div className='row'>
                        <div className='col-lg-12'>
                          {/* <p>You get Discount Periods Money {date}</p> */}
                        </div>
                      </div>
                      <div className='row'>
                        <div
                          className='col-lg-12 form-action'
                          style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                        >
                          {paymentMethod == '' ||
                          paymentCurrency == '' ||
                          defittPrice.length == 0 ||
                          defittField.length == 0 ||
                          usdField.length == 0 ||
                          lockingTime == '' ?
                          (
                            <button
                              className='btn-lg login-form-btn btn-blue'
                              onClick={() => {
                                setAlert(
                                  'Fill the Form First to make Payment',
                                  'danger'
                                );
                              }}
                            >
                              Fill To Make Payment
                            </button>
                          ) : (
                            <StripeCheckout
                              token={(token) => {
                                makePayment(
                                  token,
                                  {
                                    paymentMethod,
                                    paymentCurrency,
                                    tokenPrice: defittPrice,
                                    totalToken: defittField,
                                    referalCode,
                                    totalAmount: usdField,
                                    lockingTime,
                                    toAddress,
                                  },
                                  resetStates
                                );
                              }}
                              stripeKey={process.env.REACT_APP_STRIPE_PUB_KEY}
                            >
                              <button
                                type='submit'
                                className='btn btn-lg btn-gradient-purple btn-glow'
                              >
                                Make a Payment
                              </button>
                            </StripeCheckout>
                          )}
                        </div>
                      </div>
                    </Fragment>
                  {' '}
                </form>
              </div>
              {verifyReferalCode && (
                <div className='col-lg-4'>
                  <div className='card token-calculator-card'>
                    <div className='card-header'>
                      <h5>Token Calculation</h5>
                    </div>
                    <div className='card-body'>
                      <div>
                        <p>Market Rate</p>
                        {/* <label>1 Defitt = {defittPrice} USD</label> */}
                        {<label>1 Defitt = 10 USD</label>}
                      </div>
                      <div>
                        <p>After Referral Code</p>
                        {/* <label>{defittPrice} USD = 1 Defitt</label> */}
                        <label>1 Defitt = 7 USD</label>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </Fragment>
  );
};

BuyTokens.propTypes = {};

export default BuyTokens;
