import React from 'react';
import './Login.scss';
import Button from '../base/button/button';
import TextEntry from '../base/textEntry/textEntry';

function Login() {
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
    <div className="loginContainer">
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

export default Login;
