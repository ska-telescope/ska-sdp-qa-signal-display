import React from 'react';
import { shallow } from 'enzyme';
// eslint-disable-next-line import/no-unresolved
import Statistics from './statistics';

describe('Statistics Component', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<Statistics />);
    expect(wrapper.exists());
  });
});
