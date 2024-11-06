/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-unresolved */
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Typography } from '@mui/material';
import SignalCard from '../SignalCard/SignalCard';
import { DATA_API_URL, METRIC_TYPES } from '@utils/constants';
import { HZ_TO_MHZ } from '@utils/calculate';


interface CreateWindow {
  metric: string; 
  subarray: string;
  processing_block: string;
  spectrum_start: number;
  spectrum_end: number;
  channels_averaged: number;
}

const WindowRequest = ({ sharedData, subArray, subarrayDetails }) => {
  const { t } = useTranslation('signalDisplay');
  const [showContent, setShowContent] = React.useState(false);
  const [data, setData] = React.useState({ f_min: '', f_max: '', nchan_avg: '' });

  async function createWindow(windowData: CreateWindow) {
    try {
      const response = await fetch(`${DATA_API_URL}/windows`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(windowData)
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error creating window: ${errorData.message}`);
      }
  
      const responseData = await response.json();
      alert(`Hi-Res window requested for: ${data.f_min} - ${data.f_max}, ${data.nchan_avg}`);
      return responseData;
    } catch (error) {
      console.error("Request failed:", error);
    }
  }

  useEffect(() => {
    if (sharedData) {
      setData({
        f_min: sharedData[0] || '',
        f_max: sharedData[1] || '',
      });
    }
  }, [sharedData]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const windowData: CreateWindow = {
      metric: 'spectrum',
      subarray: subArray,
      processing_block: subarrayDetails?.execution_block?.pb_realtime[0],
      spectrum_start: Math.round(data.f_min * HZ_TO_MHZ),
      spectrum_end: Math.round(data.f_max * HZ_TO_MHZ),
      channels_averaged: parseInt(data.nchan_avg)
    }
    createWindow(windowData)
  };

  const showToggle = () => {
    setShowContent(!showContent);
  };

  return (
    <>
      <SignalCard title={t('label.windowRequest')} showContent={showContent} setShowContent={showToggle}>
        <Box>
          <form onSubmit={handleSubmit}>
            <Box style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Typography data-testid="windowRequest" variant="body1" display="block">
                f_min for window:
                <input
                  type="number"
                  name="f_min"
                  value={data.f_min}
                  onChange={handleChange}
                />
              </Typography>
              <Typography data-testid="windowRequest" variant="body1" display="block">
                f_max for window:
                <input
                  type="number"
                  name="f_max"
                  value={data.f_max}
                  onChange={handleChange}
                />
              </Typography>
              <Typography data-testid="windowRequest" variant="body1" display="block">
                Number of averaged channels:
                <input
                  type="number"
                  name="nchan_avg"
                  value={data.nchan_avg}
                  onChange={handleChange}
                />
              </Typography>
              <input type="submit" />
            </Box>
          </form>
        </Box>
      </SignalCard>
    </>
  );
};

export default WindowRequest;