import React from 'react';
import { shallow } from 'enzyme';
import SpectrumPlot from './SpectrumPlot';

describe('SpectrumPlot Component', () => {
  it('renders', () => {
    shallow(<SpectrumPlot id="id1" />);
  });
});
