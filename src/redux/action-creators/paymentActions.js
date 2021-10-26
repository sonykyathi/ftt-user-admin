import { setAlert } from './alertAction';
import api from '../../utils/api';
import axios from 'axios';
import { PAYMENT_SUCCESS, PAYMENT_FAILED, PAYMENT_RESET } from '../types';
import swal from 'sweetalert';

export const makePayment = (token, formData, callback) => async (dispatch) => {
  console.log(formData);
  const body = {
    token,
    formData,
  };
  try {
    const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/payment`, body);
    if(res.status===200){
      var Meldungstext = "";
      Meldungstext = Meldungstext + `Transaction Hash-${res?.data?.hash?.hash?.transactionHash}` 

      
      // dispatch(setAlert('Transaction successful', 'success'));
      swal("Transaction successful!", Meldungstext, "success");
      if(callback){
        callback()
      }
    }else{
      swal("Sorry!", "Transaction Failed", "error");

    }
    dispatch({
      type: PAYMENT_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    // dispatch(setAlert(err.response.data.error, 'danger'));
    swal("Sorry!", "Transaction Failed", "error");

    dispatch({
      type: PAYMENT_FAILED,
    });
  }
};
export const paymentReset = () => ({ type: PAYMENT_RESET });
