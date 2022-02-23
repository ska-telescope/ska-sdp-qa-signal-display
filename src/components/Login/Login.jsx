import React from 'react';
import PropTypes from 'prop-types';
import './Login.scss';
import Button from '../base/Button/Button';
import TextEntry from '../base/TextEntry/TextEntry';

function Login({ id }) {
  const [loginData, setLoginDataBatch] = React.useState({
    username: 'admin@user.org',
    password: 'Password123!',
  });

  function updateName(value) {
    setLoginDataBatch({ ...loginData, username: value });
  }

  function updatePassword(value) {
    setLoginDataBatch({ ...loginData, password: value });
  }

  function loginClicked() {
    // validate details
    window.location.href = '/qaMetrics';
  }

  return (
    <div id={id} className="loginContainer">
      <div>
        <TextEntry
          id="username"
          label="label.username"
          name="username"
          onChange={(event) => updateName(event.target.value)}
          value={loginData.username}
        />
      </div>
      <div>
        <TextEntry
          id="password"
          encrypt
          label="label.password"
          name="password"
          onChange={(event) => updatePassword(event.target.value)}
          value={loginData.password}
        />
      </div>
      <Button
        className="primary"
        disabled={!loginData.username || !loginData.password}
        id="loginButton"
        label="button.login"
        onClick={() => loginClicked()}
      />
    </div>
  );
}

Login.propTypes = {
  id: PropTypes.string.isRequired,
};

export default Login;
