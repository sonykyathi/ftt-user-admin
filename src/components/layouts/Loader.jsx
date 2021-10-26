import React ,{Fragment}from 'react'
import PropTypes from 'prop-types'

const Loader = props => {
    return (
        <Fragment>
  <div className="preloader flex-column justify-content-center align-items-center">
    <img className="animation__shake" src="dist/img/AdminLTELogo.png" alt="AdminLTELogo" height="60" width="60"/>
  </div>
        </Fragment>
    )
}

Loader.propTypes = {

}

export default Loader
