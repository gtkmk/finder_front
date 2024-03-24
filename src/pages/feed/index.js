import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import PetsIcon from '@mui/icons-material/Pets';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import theme from '@/styles/theme';

export default function FeedSide() {
  const [error, setError] = useState('');
  const apiUrl = 'http://localhost:8089/signin';

  return (
    <ThemeProvider theme={theme}>
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: '#56AE7E',
          opacity: 0.1,
          borderRadius: '8px 0 0 8px',
          zIndex: -1,
        }}
      />
      <Container component="main" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CssBaseline />

      </Container>
    </ThemeProvider>
  );
}
