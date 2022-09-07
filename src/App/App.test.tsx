import React from 'react';
import { shallow } from 'enzyme';
import App from './App.tsx';

describe('App Component', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.exists());
  });
});
