import React, { useState } from 'react';
import ProfileHeader from '@/components/profileHeader'; 
import { Container, Button, Box, Typography, useTheme } from '@mui/material';

const ProfilePage = () => {
  const theme = useTheme();
  const [selectedOption, setSelectedOption] = useState('');

  return (
    <div>
      <ProfileHeader />

      <Container maxWidth="md" style={{ marginTop: '20px' }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Button
            onClick={() => setSelectedOption('Animais perdidos')}
            style={{
              backgroundColor: selectedOption === 'Animais perdidos' ? theme.palette.primary.main : 'transparent',
              fontSize: '1.2rem',
              fontWeight: 'bold',
              padding: '8px 16px',
              marginRight: '8px',
              color: 'white',
              borderRadius: '80px'
            }}
          >
            <Typography variant="inherit">Animais perdidos</Typography>
          </Button>
          <Button
            onClick={() => setSelectedOption('Animais avistados')}
            style={{
              backgroundColor: selectedOption === 'Animais avistados' ? theme.palette.primary.main : 'transparent',
              fontSize: '1.2rem',
              fontWeight: 'bold',
              padding: '8px 16px',
              color: 'white',
              borderRadius: '80px'
            }}
          >
            <Typography variant="inherit">Animais avistados</Typography>
          </Button>
          <Button
            onClick={() => setSelectedOption('Postagens')}
            style={{
              backgroundColor: selectedOption === 'Postagens' ? theme.palette.primary.main : 'transparent',
              fontSize: '1.2rem',
              fontWeight: 'bold',
              padding: '8px 16px',
              marginLeft: '8px',
              color: 'white',
              borderRadius: '80px'
            }}
          >
            <Typography variant="inherit">Postagens</Typography>
          </Button>
        </Box>
      </Container>
    </div>
  );
};

export default ProfilePage;
