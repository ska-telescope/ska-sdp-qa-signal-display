/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-unresolved */
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Typography } from '@mui/material';
import { DATA_API_URL, MSENTRA_CLIENT_ID } from '@utils/constants';
import { HZ_TO_MHZ } from '@utils/calculate';
import SignalCard from '../SignalCard/SignalCard';

interface CreateWindow {
  metric: string;
  subarray: string;
  processing_block: string;
  spectrum_start: number;
  spectrum_end: number;
  channels_averaged: number;
}

interface WindowRequestProps {
  sharedData: object;
  subArray: string;
  subarrayDetails: string[];
}

const WindowRequest = ({ sharedData, subArray, subarrayDetails }: WindowRequestProps) => {
  const { t } = useTranslation('signalDisplay');
  const [showContent, setShowContent] = React.useState(false);
  const [data, setData] = React.useState({ f_min: '', f_max: '', nchan_avg: '' });
  const [selectedOptions, setSelectedOptions] = React.useState<string[]>([]);
  const [bearer, setBearer] = React.useState('');

  React.useEffect(() => {
    const tokens = sessionStorage.getItem(`msal.token.keys.${MSENTRA_CLIENT_ID}`);
    if (tokens) {
      const accessTokenName = JSON.parse(tokens).accessToken[0];
      const accessToken = sessionStorage.getItem(accessTokenName);
      if (accessToken) {
        const { secret } = JSON.parse(accessToken);
        setBearer(`Bearer ${secret}`);
      }
    }
  }, []);

  async function createWindow(windowData: CreateWindow) {
    try {
      const response = await fetch(`${DATA_API_URL}/windows`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: bearer
        },
        body: JSON.stringify(windowData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error creating window: ${errorData.message}`);
      }

      const responseData = await response.json();
      alert(
        `Hi-Res window requested for: ${data.f_min} - ${data.f_max}, with channel averaging: ${data.nchan_avg}`
      );
      return responseData;
    } catch (error) {
      /* eslint no-console: ["error", { allow: ["error"] }] */
      console.error('Request failed:', error);
    }
  }

  useEffect(() => {
    if (sharedData) {
      setData({
        f_min: sharedData.data[0] || '',
        f_max: sharedData.data[1] || ''
      });
    }
  }, [sharedData]);

  const handleChange = event => {
    const { name, value } = event.target;
    setData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = event => {
    event.preventDefault();

    selectedOptions.forEach(option => {
      const windowData: CreateWindow = {
        metric: option,
        subarray: subArray,
        processing_block: subarrayDetails?.execution_block?.pb_realtime[0],
        spectrum_start: Math.round(data.f_min * HZ_TO_MHZ),
        spectrum_end: Math.round(data.f_max * HZ_TO_MHZ),
        channels_averaged: parseInt(data.nchan_avg, 10)
      };
      createWindow(windowData);
    });
  };

  const showToggle = () => {
    setShowContent(!showContent);
  };

  function getDeploymentNames() {
    if (subarrayDetails?.deployments == null) {
      return '';
    }
    const metrics = [];

    Object.entries(subarrayDetails?.deployments).forEach(([_, deployments]) => {
      deployments?.deployment?.args?.values?.processors.forEach(processor => {
        if (processor.name.startsWith('signal-display-metrics-')) {
          metrics.push(processor.command[processor.command.length - 1]);
        }
      });
    });
    return metrics.flatMap(item => item.split(','));
  }

  const options = getDeploymentNames() || [];

  const filteredOptions = options.filter(
    option => !['stats', 'bandaveragedxcorr'].includes(option)
  );

  const handleCheckboxChange = (option: string) => {
    setSelectedOptions(prev =>
      prev.includes(option) ? prev.filter(item => item !== option) : [...prev, option]
    );
  };

  return (
    <>
      <SignalCard
        title={t('label.windowRequest')}
        showContent={showContent}
        setShowContent={showToggle}
      >
        <Box>
          <form onSubmit={handleSubmit}>
            <Box style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Typography data-testid="windowRequest" variant="body1" display="block">
                f_min for window:
                <input type="number" name="f_min" value={data.f_min} onChange={handleChange} />
              </Typography>
              <Typography data-testid="windowRequest" variant="body1" display="block">
                f_max for window:
                <input type="number" name="f_max" value={data.f_max} onChange={handleChange} />
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
              {filteredOptions.map(option => (
                <div key={option}>
                  <label htmlFor="metric">
                    <input
                      id="metric"
                      type="checkbox"
                      value={option}
                      checked={selectedOptions.includes(option)}
                      onChange={() => handleCheckboxChange(option)}
                    />
                    {option}
                  </label>
                </div>
              ))}
              <input type="submit" />
            </Box>
          </form>
        </Box>
      </SignalCard>
    </>
  );
};

export default WindowRequest;
