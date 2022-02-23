import React from 'react';
import { shallow } from 'enzyme';
import FieldLabel from './FieldLabel';

describe('FieldLabel Component', () => {
  it('renders with a provided label', () => {
    shallow(<FieldLabel id="id1" label="Dummy Label" />);
  });
  it('No label provided', () => {
    shallow(<FieldLabel id="id2" />);
  });
});
