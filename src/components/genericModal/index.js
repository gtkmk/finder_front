import React from 'react';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '10px',
    boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.2)',
    backgroundColor: '#E4E4E3',
    maxHeight: '90vh',
    maxWidth: '90vw',
    overflow: 'auto',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    zIndex: '1000',
  },
};

const GenericModal = ({ isOpen, onClose, children }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} style={customStyles}>
      {children}
    </Modal>
  );
};

export default GenericModal;
