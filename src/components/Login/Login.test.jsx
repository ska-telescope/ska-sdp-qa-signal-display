import React from 'react';
import { shallow } from 'enzyme';
import Login from './Login';

describe('Login Component', () => {
  it('renders', () => {
    shallow(<Login id="id1" />);
  });
});
