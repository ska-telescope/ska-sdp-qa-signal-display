import React from 'react';
/* eslint-disable import/no-unresolved */
import { render, cleanup, screen } from '@testing-library/react';
import mockProcessingBlockStatisticsData from 'src/mockData/mock-processing-block-statistics-data';
import mockStatisticsReceiverEventsData from 'src/mockData/mock-statistics-receiver-events-data';
import {rest} from 'msw';
import {setupServer} from 'msw/node';
import Statistics from './statistics';
import { DATA_API_URL } from '../../utils/constants';

const server = setupServer(
  rest.get(`${DATA_API_URL}/stats/processing_block/blocks/latest/statistics`, (req, res, ctx) => {
    return res(ctx.json(mockProcessingBlockStatisticsData));
  }),

  rest.get(`${DATA_API_URL}/stats/spead2/scans/latest/latest_event`, (req, res, ctx) => {
    return res(ctx.json(mockStatisticsReceiverEventsData));
  })
);

beforeAll(() => {
  server.listen();
});

afterEach(() => server.resetHandlers())

afterAll(() => {
  server.close();
  cleanup();
});

test('renders without crashing', () => {
  render(<Statistics />);
  expect(screen.getByTestId("statistics-basics-Id")).toBeTruthy();
});

test('Correct Data is displayed', async () => {
  render(<Statistics />);
  const basicsTestValue = await screen.findAllByText(/Last Refresh from API:/);
  expect(basicsTestValue).toBeTruthy();
  const statisticsTestValue = await screen.findAllByText(/Packet Count:\s115/);
  expect(statisticsTestValue).toBeTruthy();
  const receiverTestValue = await screen.findAllByText(/Total Data Received:\s10000\sMB/);
  expect(receiverTestValue).toBeTruthy();
});
