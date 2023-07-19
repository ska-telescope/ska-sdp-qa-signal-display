/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import React from 'react';
import Modal from '@mui/material/Modal';

interface SKAOModalProps {
  open: boolean;
  onClose: Function;
  children: any;
}

const SKAOModal = ({ open, onClose, children }: SKAOModalProps) => (
  <Modal
    data-testid="modal"
    open={open}
    onClose={() => onClose()}
    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
  >
    {children}
  </Modal>
  );
export default SKAOModal;
