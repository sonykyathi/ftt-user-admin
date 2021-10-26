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
          <form id="login" className="login-form-content" onSubmit={onSubmit}>
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
            <label style={{ display: "flex", flexDirection: "row-reverse", marginTop: "-1rem" }}>
              <Link to="/forgot-password">&nbsp; Forgot Password</Link>
            </label>
            <div className="form-action">
              <label>
                <input type="checkbox" name="remember" /> Remember me
              </label>
              <button type="submit" class="btn btn-lg btn-gradient-purple btn-glow animated">Login</button>
            </div>
            <div className="login-option text-center">
              <label>
                Don't have an account?<Link to="/register">Register</Link>
              </label>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

Login.propTypes = {};

export default Login;
