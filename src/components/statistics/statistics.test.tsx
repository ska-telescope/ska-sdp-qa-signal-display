import React from 'react';
import {render} from '@testing-library/react'
// eslint-disable-next-line import/no-unresolved
import Statistics from './statistics';

describe('Statistics Component', () => {
  it('renders without crashing', () => {
    const {container} = render(<Statistics />);
    const boxes = container.getElementsByClassName('box');
    expect(boxes.length).toBeLessThan(2);
  });
});
