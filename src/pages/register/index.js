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

export default function SignInSide() {
  const [error, setError] = useState('');
  const apiUrl = '/api/login'; // Endpoint da sua API de login

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get('email');
    const password = formData.get('password');

    try {
      const response = await axios.post(apiUrl, { email, password });
      const { redirect, userData } = response.data;

      if (redirect) {
        window.location.href = redirect; // Redireciona para a página indicada pela API
      } else {
        console.log('Login successful:', userData);
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Erro ao fazer login. Verifique suas credenciais.');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CssBaseline />
        <Grid container spacing={0} alignItems="stretch" sx={{height: "70vh"}}>
          <Grid item xs={2}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#408080',
                color: 'white',
                padding: '40px',
                borderRadius: '8px 0 0 8px',
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                height: '100%',
                textAlign: 'center',
              }}
            >

            <img src="/fierce-dog.jpg" alt="Descrição da primeira imagem" style={{ width: '150px', height: '150px'}} />

              <Typography variant="body1" component="div" sx={{ fontSize: '15px' }}>
                Saiba mais sobre nossas póliticas de privacidade e como utilizamos seus dados
              </Typography>
              <Link href="#" variant="body2" sx={{color: 'white'}}>
                  {"Não possui uma conta? Cadatre-se"}
              </Link>
            </Box>
          </Grid>
          <Grid item xs={10}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'white',
                padding: '40px',
                borderRadius: '0 8px 8px 0',
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                height: '100%',
              }}
            >
              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '100%'}} >
                <Typography variant="body1" component="div" sx={{ fontSize: '0.9rem', marginBottom: '-2%' }}>
                  Nome:
                </Typography>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  name="name"
                  autoComplete="name"
                  autoFocus
                />

                <Typography variant="body1" component="div" sx={{ fontSize: '0.9rem', marginBottom: '-2%' }}>
                  Nome de usuário:
                </Typography>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="userName"
                  name="userName"
                  autoComplete="userName"
                  autoFocus
                />

                <Typography variant="body1" component="div" sx={{ fontSize: '0.9rem', marginBottom: '-2%' }}>
                  E-mail:
                </Typography>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />  

                <Typography variant="body1" component="div" sx={{ fontSize: '0.9rem', marginBottom: '-2%' }}>
                  Senha:
                </Typography>
                <TextField
                  margin="normal"
                  id="email"
                  label="E-mail"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />  

                <Typography variant="body1" component="div" sx={{ fontSize: '0.9rem', marginBottom: '-2%' }}>
                  Confirmar   Senha:
                </Typography>
                <TextField
                  margin="normal"
                  id="email"
                  label="E-mail"
                  name="email"
                  autoComplete="email"
                  autoFocus
                /> 
                
                <Grid container alignItems="center" justifyContent="center">
                  <Grid item>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2, borderRadius: '10px', height: '50px', width: '15rem', fontSize: '1rem', backgroundColor: '#408080' }}
                    >
                        Cadastrar
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}
