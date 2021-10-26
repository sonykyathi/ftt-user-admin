import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as API from '../../utils/realAPI';
import swal from 'sweetalert';
import { verifyJWT } from '../../utils/utils';

const ResetPassword = (props) => {
  const [state, setstate] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    errorPassword: "",
    errorConfirmPassword: ""
  });

  useEffect(() => {
    const token = props.match.params.token || '';

    let result = verifyJWT(token);
    if (!result) {
      swal({
        title: "Error!",
        text: "Session Expired",
        type: "error"
      }).then(function () {
        props.history.push("/")
      });
    } else {
      setstate({ ...state, email: result.data.email })
    }
  }, [])



  const onSubmit = (e) => {
    e.preventDefault();

    if (state.password.length < 6) {
      setstate({ ...state, errorPassword: "Password length should be 6" })
    } else if (state.password !== state.confirmPassword) {
      setstate({ ...state, errorConfirmPassword: "Confirm Password mismatch" })
    } else {
      setstate({...state, errorPassword:"", errorConfirmPassword:""})
      API.resetPassword({ password: state.password, email:state.email }).then(data => {
        if (data.status === 200) {
          swal("Password Updated Successfully", "success").then(function () {
            props.history.push("/")
          });
        } else {
          swal(data.message, "warning");

        }
      })
    }




  }

  const onChange = (e) => {
    setstate({ ...state, [e.target.name]: e.target.value })
  }
  return (
    <>
      <div className="form-card login-form-container container">
        <form id="login" className="login-form-content" onSubmit={onSubmit}>
          <div className="form-heading">
            <h2> Reset Password</h2>
          </div>

          <div className="form-group">
            <label for="email">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter Password"
              name="password"
              onChange={onChange}
              value={state.password}
              required
            />
            <p style={{ marginTop: 5, color: "red" }}>{state.errorPassword}</p>

          </div>

          <div className="form-group">
            <label for="email">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter Confirm Password"
              name="confirmPassword"
              onChange={onChange}
              value={state.confirmPassword}
              required
            />
            <p style={{ marginTop: 5, color: "red" }}>{state.errorConfirmPassword}</p>

          </div>

          <div className="form-action" style={{ margin: "0 auto" }}>
            <button type="submit" className="btn login-form-btn">
              Submit
            </button>
          </div>

        </form>
      </div>
    </>
  );
}

ResetPassword.propTypes = {};

export default ResetPassword;