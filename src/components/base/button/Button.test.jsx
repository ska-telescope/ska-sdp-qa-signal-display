import React from 'react';
import { shallow } from 'enzyme';
import Button from './Button';

describe('Button Component', () => {
  it('renders with a provided label', () => {
    shallow(<Button id="id1" label="Dummy Label" />);
  });
  it('No label provided', () => {
    shallow(<Button id="id2" />);
  });
});
