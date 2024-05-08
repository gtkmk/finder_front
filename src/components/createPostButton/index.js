import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import GenericModal from '../genericModal';
import PostModalContent from '../genericModal/postModalContent';

const CreatePostButton = ({ buttonText }) => {
    const [isWideScreen, setIsWideScreen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    const handleCreatePost = (formData) => {
        console.log('Dados do formulário:', formData);
    };

    useEffect(() => {
      const handleResize = () => {
        setIsWideScreen(window.innerWidth >= 1350);
      };
  
      window.addEventListener('resize', handleResize);
      handleResize();
  
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);

    const buttonStyle = {
      position: 'absolute',
      padding: '10px',
      color: '#fff',
      borderRadius: '20px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      top: '1rem',
      left: '1rem',
    };

    if (isWideScreen) {
        buttonStyle.position = 'fixed';
        delete buttonStyle.marginBottom;
      } else {
        delete buttonStyle.position;
        delete buttonStyle.left;
        buttonStyle.marginBottom = '1.5rem';
      }
  
    const textStyle = {
      fontSize: '18px',
      fontWeight: 'bold',
    };
  
    return (
        <div>
            <Button style={buttonStyle} startIcon={<AddIcon />} variant="contained" onClick={handleOpenModal}>
            <span style={textStyle}>{buttonText}</span>
            </Button>
            <GenericModal isOpen={isModalOpen} onClose={handleCloseModal}>
                <PostModalContent
                    onSubmit={handleCreatePost}
                    onClose={handleCloseModal}
                />
            </GenericModal>
        </div>
    );
  };
export default CreatePostButton;
