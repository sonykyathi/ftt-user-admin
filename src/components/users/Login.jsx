import React, { Fragment, useState, useEffect } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import Alert from "../layouts/Alert";

import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { userActions } from "../../redux";

const Login = (props) => {
  useEffect(() => {
    reset();
  }, []);
  const dispatch = useDispatch();
  const history = useHistory();

  const { login, reset } = bindActionCreators(userActions, dispatch);
  const user = useSelector((state) => state.user);
  const { isAuthenticated } = user;

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: 0
  });

  const { email, password } = formData;
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (formData && formData.email && formData.email.includes('admin')) {
      login({ ...formData, role: 1 });
    } else {
      login(formData)
    }
  };
  if (isAuthenticated) {
    return <Redirect to="/" />;
  }
  return (
    <Fragment>
      <div className="entry-page-wrapper">
        <div className="login-form-container">
          <form id="login" className="login-form-content entry-form" onSubmit={onSubmit}>
            <div className="form-heading">
              <h2> Login Form</h2>
            </div>

            <div className="form-group">
              <label for="email">Email id</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter User email id"
                name="email"
                onChange={onChange}
                value={email}
                required
              />
            </div>
            <div className="form-group">
              <label for="password">Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter Password"
                onChange={onChange}
                value={password}
                name="password"
                required
              />
            </div>
            <div className="login-input-options">
              <label class="custom-checkbox login-remember">
                  Remember me
                  <input type="checkbox" name="remember" />
                  <span class="checkmark"></span>
              </label>
              <div class="login-forget"><Link to="/forgot-password">&nbsp; Forgot Password?</Link></div>
            </div>

            <div className="login-button text-center">
              <button type="submit" class="btn-style-lg btn-orange">Login</button>
            </div>

            <div class="entry-form-swap text-center">
              <span>Don't have an account?<a href="/register">Create new account</a>.</span>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

Login.propTypes = {};

export default Login;
