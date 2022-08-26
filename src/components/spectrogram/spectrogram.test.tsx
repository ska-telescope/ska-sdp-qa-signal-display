/* eslint-disable import/no-unresolved */
import React from 'react';
import { shallow } from 'enzyme';
import Spectrogram from './spectrogram';
import { mockBaselinesData } from '../../mock/mock-baseline-data';

describe('retrieveChartData function', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  const mockSetState = jest.fn();
  // const retrieveChartData = jest.fn();

  jest.mock('react', () => ({
    useState: (chartData) => [chartData, mockSetState]
  }));

  it('returns data', () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockBaselinesData));
    const wrapper = shallow(<Spectrogram />);
    expect(wrapper.state('chartData')).toBeNull();
    const instance = wrapper.instance();
    instance.retrieveChartData();
    expect(wrapper.state('chartData')).toBe(mockBaselinesData);
  });
});

describe('Spectrogram Component', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<Spectrogram />);
    expect(wrapper.exists());
  });
});
