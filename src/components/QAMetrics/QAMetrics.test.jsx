import React from 'react';
import { shallow } from 'enzyme';
import QAMetrics from './QAMetrics';

describe('QAMetrics Component', () => {
  it('renders', () => {
    shallow(<QAMetrics id="id1" />);
  });
});
