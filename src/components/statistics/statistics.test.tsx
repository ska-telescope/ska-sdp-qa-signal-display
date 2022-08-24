import React from 'react';
import { shallow } from 'enzyme';
import Statistics from './statistics';

describe('Statistics Component', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<Statistics />);
    expect(wrapper.exists());
  });
});