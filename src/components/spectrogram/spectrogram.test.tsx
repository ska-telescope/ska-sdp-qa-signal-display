import React from 'react';
/* eslint-disable import/no-unresolved */
import { render, cleanup, screen, fireEvent } from '@testing-library/react';
import {rest} from 'msw'
import {setupServer} from 'msw/node'
import Spectrogram from './spectrogram';
import mockBaselinesData from '../../mockData/mock-baseline-data';
import {
  DATA_API_URL,
  WS_API_URL
} from '../../utils/constants';

const wsApiUrlHttp = WS_API_URL.replace('ws', 'http');

const server = setupServer(
  rest.get(`${DATA_API_URL}/stats/processing_block/blocks/latest/baselines`, (req, res, ctx) => {
    return res(ctx.json(mockBaselinesData));
  }),

  rest.get(`${wsApiUrlHttp}/json_spectrograms`, (req, res, ctx) => {
    return res(ctx.json({success: 200}));
  })
);

beforeAll(() => {
  server.listen();
  process.env.REACT_APP_SWITCH_D3_IMAGE_CREATION_ON_OFF = 'off';
});

afterEach(() => server.resetHandlers())

afterAll(() => {
  server.close();
  process.env.REACT_APP_SWITCH_D3_IMAGE_CREATION_ON_OFF = 'off';
  cleanup();
});

test('renders without crashing', () => {
  render(<Spectrogram />);
  expect(screen.getByTestId("spectogram-image-list-Id")).toBeTruthy();
});

test('correctly gets list of images', async () => {
  render(<Spectrogram />);
  const imageListItems = await screen.findAllByText(/m\d\d\d_m\d\d\d_[XY][XY]/i);
  expect(imageListItems.length).toBe(5);
});

test('Image clicks opens modal', async () => {
  render(<Spectrogram />);
  const imageToClick = await screen.findByAltText(/m033_m033_XX/i);

  fireEvent.click(imageToClick);
  expect(screen.getByTestId('ClickedImage')).toBeTruthy();
});

  

