/* eslint-disable @typescript-eslint/no-empty-function */
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

jest.mock('react-i18next', () => ({
  // this mock makes sure any components using the translate hook can use it without a warning being shown
  useTranslation: () => {
    return {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      t: (str: any) => str,
      i18n: {
        changeLanguage: () => new Promise(() => {})
      }
    };
  }
}));

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
  // Will be replaced with Cypress
  // expect(screen.getByTestId("statistics-detailed-Id")).toBeTruthy();
  // expect(screen.getByTestId("statistics-receiver-events")).toBeTruthy();
});

test('Correct Data is displayed', async () => {
  render(<Statistics />);
  const basicsTestValue = await screen.findAllByText(/label.lastAPIRefresh/);
  expect(basicsTestValue).toBeTruthy();
  const receiverTestValue = await screen.findAllByText(/label.totalDataReceived/);
  expect(receiverTestValue).toBeTruthy();
});
