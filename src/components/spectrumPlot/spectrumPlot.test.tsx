import React from 'react';
import { shallow } from 'enzyme';
// eslint-disable-next-line import/no-unresolved
import SpectrumPlot from './spectrumPlot';

describe('SpectrumPlot Component', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<SpectrumPlot />);
    expect(wrapper.exists());
  });
});
