import React from 'react';
import { render } from '@testing-library/react';
import App from './App.tsx';

describe('App Component', () => {
  it('renders without crashing', () => {
    const { container } = render(<App />);
    const boxes = container.getElementsByClassName('box');
    expect(boxes.length).toBeLessThan(2);
  });
});
