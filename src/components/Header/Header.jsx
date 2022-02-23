import React from 'react';
import PropTypes from 'prop-types';
import './Header.scss';
import CompanyPrintLogo from '../../images/skao_logo_white.svg';
import Button from '../base/Button/Button';
import FieldLabel from '../base/FieldLabel/FieldLabel';

function Header({ id }) {
  function logoutClicked() {
    window.location.href = '/';
  }

  return (
    <header id={id} className="container-fluid header">
      <div className="row">
        <div className="col-1">
          <img className="logo" alt="SKAO Logo" src={CompanyPrintLogo} />
        </div>
        <div className="col pageTitle">
          <FieldLabel id="headerTitleId" label="label.qaMetrics" />
        </div>
        <div className="col-1 userTitle">
          <p>admin@user.org</p>
        </div>
        <div className="col-1">
          <Button
            className="primary"
            id="loginButton"
            label="button.logout"
            onClick={() => logoutClicked()}
          />
        </div>
      </div>
    </header>
  );
}

Header.propTypes = {
  id: PropTypes.string.isRequired,
};

export default Header;
