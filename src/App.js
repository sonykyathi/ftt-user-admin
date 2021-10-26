import './assets/css/Alert.css';
import './assets/css/Forms.css';
import { Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
// importing default common layouts
import NavBar from './components/layouts/NavBar';
import Loader from './components/layouts/Loader';
import Alert from './components/layouts/Alert';
import Home from './components/dashboard/Home';
import BuyTokens from './components/dashboard/BuyTokens';
import Balance from './components/dashboard/Balance';
import Profile from './components/dashboard/Profile';
import SideBar from './components/layouts/SideBar';
import Footer from './components/layouts/Footer';
// importing conditional route based components
import Login from './components/users/Login';
import Register from './components/users/Register';
import PrivateRoute from './components/PrivateRoute';
import { useSelector } from 'react-redux';
import UsersComponent from './components/dashboard/Users';
import ForgotPassword from './components/forgotPassword';
import  ResetPassword  from './components/resetPassword';


function App() {
  const user = useSelector((state) => state.user);
console.log(process.env.REACT_APP_API)
  return (
    <div className='wrapper'>
      <Alert></Alert>
      <Router>
        {user.isAuthenticated && (
          <Fragment>
            {/* <Loader></Loader> */}
            <NavBar></NavBar>
            <SideBar></SideBar>
          </Fragment>
        )}
        <Switch>
          <PrivateRoute exact path='/' component={Home} />
          <PrivateRoute path='/token' component={BuyTokens} />
          <PrivateRoute path='/profile' component={Profile} />
          <PrivateRoute path='/balance' component={Balance} />
          <PrivateRoute path='/users' component={UsersComponent} />
          <Route path='/forgot-password' component={ForgotPassword} />
          <Route path='/reset-password/:token'  component={ResetPassword} />

          <Route exact path='/login'>
            <Login />
          </Route>
          <Route exact path='/register'>
            <Register />
          </Route>
        </Switch>
        {user.isAuthenticated && <Footer></Footer>}
      </Router>
    </div>
  );
}

export default App;
