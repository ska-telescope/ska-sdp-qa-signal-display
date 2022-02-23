import React from 'react';
import { shallow } from 'enzyme';
import Table from './Table';

describe('Table Component', () => {
  it('No label provided', () => {
    shallow(<Table id="id" />);
  });
});
