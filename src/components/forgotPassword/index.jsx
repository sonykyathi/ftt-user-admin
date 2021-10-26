import React, { useState } from 'react';
import PropTypes from 'prop-types';
import * as API from '../../utils/realAPI';
import swal from 'sweetalert';
import validator from 'validator';

const ForgotPassword = () => {
  const [state, setstate] = useState({
    email: "",
    emailError: ""
  })


  const onSubmit = (e) => {
    e.preventDefault();
    const { email } = state;
    if (validator.isEmpty(email)) {
      setstate({ ...state, emailError: "Please enter email" })
    } else if (!validator.isEmail(email)) {
      setstate({ ...state, emailError: "Please enter valid email" })
    } else {
      setstate({ ...state, emailError: "" })
      try {
        API.forgotPassowrd({ email: state.email }).then(data => {
          if (data.status === 200) {
            swal("Email sent...!", data.message, "success");

          } else if (data.status === 401) {
            swal(data.message, "error");

          } else {
            swal(data.message, "warning");
          }
        })
      } catch (error) {
        swal("Oops!", "Something went wrong!", "error");

      }


    }


  }

  const onChange = (e) => {
    setstate({ ...state, [e.target.name]: e.target.value })
  }
  return (
    <div className="entry-page-wrapper">
      <div className="login-form-container container">
        <form id="login" className="login-form-content entry-form" onSubmit={onSubmit}>
          <div className="form-heading">
            <h2> Reset Password</h2>
          </div>

          <div className="form-group">
            <label for="email">Email</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your email"
              name="email"
              onChange={onChange}
              value={state.email}
              required
            />
            <p style={{ marginTop: 5, color: "red" }}>{state.emailError}</p>
          </div>

          <div className="login-button text-center">
              <button type="submit" class="btn-style-lg btn-orange">Reset</button>
            </div>

        </form>
      </div>
    </div>
  );
}

ForgotPassword.propTypes = {};

export default ForgotPassword;