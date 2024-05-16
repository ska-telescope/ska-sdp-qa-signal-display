/* eslint-disable no-unused-vars */
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import SKAOModal from '../Modal/Modal';

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
};

interface InfoModalProps {
  title: string;
  content: string;
  site: string;
}

export default function InfoModal({ title, content, site }: InfoModalProps) {
  const { t } = useTranslation('signalDisplay');
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <IconButton onClick={handleOpen} data-testid="test-info-modal">
        <InfoOutlinedIcon />
      </IconButton>
      <SKAOModal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            data-testid="test-info-modal-header"
          >
            {title}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {content}
          </Typography>
          For more information, see the{' '}
          <a href={site} target="_blank" rel="noreferrer">
            ReadTheDocs
          </a>{' '}
          page.
        </Box>
      </SKAOModal>
    </div>
  );
}
