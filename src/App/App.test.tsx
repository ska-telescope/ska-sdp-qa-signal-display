/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { render } from '@testing-library/react';
import { StoreProvider } from '../services/stateStorage';
import App from './App';

jest.mock('react-i18next', () => ({
  // this mock makes sure any components using the translate hook can use it without a warning being shown
  useTranslation: () => {
    return {
      t: (str: any) => str,
      i18n: {
        changeLanguage: () => new Promise(() => {})
      }
    };
  }
}));

describe('App Component', () => {
  it('renders without crashing', () => {
    const { container } = render(    
      <StoreProvider>
        <App />
      </StoreProvider>
    );
    const boxes = container.getElementsByClassName('box');
    expect(boxes.length).toBeLessThan(2);
  });
});
