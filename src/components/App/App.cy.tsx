import React from 'react';
// TODO : This should be moved into the Cypress config same as all other repositories
import { mount } from 'cypress/react18';
import App from './App';

describe('<App />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    mount(<App />);
  });
});
