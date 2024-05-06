import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

const CreatePostButton = ({ buttonText }) => {
    const [isWideScreen, setIsWideScreen] = useState(false);

    useEffect(() => {
      const handleResize = () => {
        setIsWideScreen(window.innerWidth >= 1200);
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
      <Button style={buttonStyle} startIcon={<AddIcon />} variant="contained">
        <span style={textStyle}>{buttonText}</span>
      </Button>
    );
  };
export default CreatePostButton;
