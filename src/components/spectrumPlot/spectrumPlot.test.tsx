/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
// eslint-disable-next-line import/no-unresolved
import {rest} from 'msw'
import {setupServer} from 'msw/node'
import mockSpectrumData from '../../mockData/mock-spectrum-data';
import { WS_API_URL } from '../../utils/constants';
import SpectrumPlot from './spectrumPlot';

const wsApiUrlHttp = WS_API_URL.replace('ws', 'http');

const server = setupServer(
  rest.get(`${wsApiUrlHttp}/json_spectrum`, (req, res, ctx) => {
    return res(ctx.json(mockSpectrumData));
  })
)

beforeAll(() => {
  server.listen();
});

afterEach(() => server.resetHandlers())

afterAll(() => {
  server.close();
  cleanup();
});

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

test('renders without crashing', () => {
  render(<SpectrumPlot />);
  expect(screen.getByTestId("sPlotId")).toBeTruthy();
});

test('check if graph renders', async () => {
  render(<SpectrumPlot />);
  const graph = await screen.getByRole('img');
  expect(graph).toBeTruthy();
});
