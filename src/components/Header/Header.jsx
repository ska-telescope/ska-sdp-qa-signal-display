import React from 'react';
import './Header.scss';
import CompanyPrintLogo from '../../images/skao_logo_white.svg';
import Button from '../base/button/button';
import FieldLabel from '../base/fieldLabel/fieldLabel';

function Header() {
  function logoutClicked() {
    window.location.href = '/';
  }

  return (
    <header className="container-fluid header">
      <div className="row">
        <div className="col-1">
          <img className="logo" alt="SKAO Logo" src={CompanyPrintLogo} />
        </div>
        <div className="col pageTitle">
          <FieldLabel label="label.qaMetrics" />
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

export default Header;
