import React from 'react';
import { mount } from 'cypress/react18';
import Container from './Container';

describe('<Container />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    // eslint-disable-next-line no-undef
    mount(<Container />);
  });
});
