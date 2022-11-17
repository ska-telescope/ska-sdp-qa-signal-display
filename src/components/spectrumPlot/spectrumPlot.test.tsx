import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
// eslint-disable-next-line import/no-unresolved
import SpectrumPlot from './spectrumPlot';
import {rest} from 'msw'
import {setupServer} from 'msw/node'
import {
  DATA_API_URL,
  WS_API_URL
} from '../../utils/constants';
import mockSpectrumData from 'src/mockData/mock-spectrum-data';

const ws_api_url_http = WS_API_URL.replace('ws', 'http');

const server = setupServer(
  rest.get(`${ws_api_url_http}/json_spectrum`, (req, res, ctx) => {
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

test('renders without crashing', () => {
  render(<SpectrumPlot />);
  expect(screen.getByTestId("sPlotId")).toBeTruthy();
});

test('check if graph renders', async () => {
  render(<SpectrumPlot />);
  const graph = await screen.getByRole('svg');
  expect(graph).toBeTruthy();;
});
