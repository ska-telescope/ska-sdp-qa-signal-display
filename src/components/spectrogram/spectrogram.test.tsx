import React from 'react';
/* eslint-disable import/no-unresolved */
import { render } from '@testing-library/react';
import Spectrogram from './spectrogram';
// import { mockBaselinesData } from '../../mock/mock-baseline-data';

describe('retrieveChartData function', () => {
  // beforeEach(() => {
  //   fetchMock.resetMocks();
  // });

  const mockSetState = jest.fn();
  // const retrieveChartData = jest.fn();

  jest.mock('react', () => ({
    useState: (chartData) => [chartData, mockSetState]
  }));

  // it('returns data', () => {
  //   fetchMock.mockResponseOnce(JSON.stringify(mockBaselinesData));
  //   const wrapper = shallow(<Spectrogram />);
  //   expect(wrapper.state('chartData')).toBeNull();
  //   const instance = wrapper.instance();
  //   instance.retrieveChartData();
  //   expect(wrapper.state('chartData')).toBe(mockBaselinesData);
  // });
});

describe('Spectrogram Component', () => {
  it('renders without crashing', () => {
    const { container } = render(<Spectrogram />);
    const boxes = container.getElementsByClassName('box');
    expect(boxes.length).toBeLessThan(2);
  });
});
