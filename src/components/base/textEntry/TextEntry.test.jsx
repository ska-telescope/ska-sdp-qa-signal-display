import React from 'react';
import { shallow } from 'enzyme';
import TextEntry from './TextEntry';

describe('TextEntry Component', () => {
  it('renders without crashing', () => {
    const theData = '';

    shallow(<TextEntry id="id1" value={theData} />);
  });
});
