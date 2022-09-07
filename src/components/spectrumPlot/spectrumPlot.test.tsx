import React from 'react';
import { render } from '@testing-library/react';
// eslint-disable-next-line import/no-unresolved
import SpectrumPlot from './spectrumPlot';

describe('SpectrumPlot Component', () => {
  it('renders without crashing', () => {
    const { container } = render(<SpectrumPlot />);
    const boxes = container.getElementsByClassName('box');
    expect(boxes.length).toBeLessThan(2);
  });
});
