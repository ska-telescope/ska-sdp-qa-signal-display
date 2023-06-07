/* eslint-disable no-undef */
import React from 'react';
import { mount } from 'cypress/react18';
import App from './App';

describe('<App />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    mount(<App />);
  });
});
