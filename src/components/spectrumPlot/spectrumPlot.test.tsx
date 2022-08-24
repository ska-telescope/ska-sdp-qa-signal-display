import React from 'react';
import { shallow } from 'enzyme';
import SpectrumPlot from './spectrumPlot';

describe('SpectrumPlot Component', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<SpectrumPlot />);
    expect(wrapper.exists());
  });
});