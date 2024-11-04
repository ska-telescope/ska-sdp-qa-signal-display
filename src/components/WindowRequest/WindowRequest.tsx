/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-unresolved */
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Typography } from '@mui/material';
import SignalCard from '../SignalCard/SignalCard';

const WindowRequest = ({ sharedData }) => {
  const { t } = useTranslation('signalDisplay');
  const [showContent, setShowContent] = React.useState(false);
  const [data, setData] = React.useState({ f_min: '', f_max: '' });

  // Update `data` state when `sharedData` changes
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
    alert(JSON.stringify(data));
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
              <input type="submit" />
            </Box>
          </form>
        </Box>
      </SignalCard>
    </>
  );
};

export default WindowRequest;