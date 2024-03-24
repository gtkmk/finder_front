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
import Alert from '@mui/material/Alert';

export default function SignInSide() {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [apiResponse, setApiResponse] = useState('');
  const apiUrl = 'http://localhost:8089/signin';

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get('email');
    const password = formData.get('password');

    try {
      const response = await axios.post(apiUrl, {
        email,
        password,
      });

      setApiResponse(response.data.message);

      if ((response.status == 200)) {
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          window.location.href = '/feed';
        }, 1000);
      }
    } catch (error) {
      setApiResponse(error.response.data.message)
      setError(apiResponse);
    }
  };

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
        <Grid container spacing={0} alignItems="stretch" sx={{height: "70vh"}}>
          <Grid item xs={6}>
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
                backgroundImage: 'url(/impress/EstampaOpacity01PNG.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <img src="/logo/Logo - Horizontal - Com cor.png" alt="logo" style={{ width: '300px', height: 'auto'}} />

              <Typography variant="body1" component="div" sx={{ fontSize: '15px' }}>
                Estamos animados em recebê-lo à comunidade Fujões, uma rede social exclusiva para aqueles que compartilham o amor pelos seus amigos peludos. Aqui, você pode não apenas compartilhar momentos especiais com seus animais de estimação, mas também encontrar apoio em momentos desafiadores, como quando seu amiguinho de quatro patas decide se aventurar por conta própria.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
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
              <img src="/logo/Símbolo - Png - Com cor .png" alt="mini logo" style={{ width: '50px', height: 'auto'}} />

              <Typography component="h1" variant="h5">
                Login
              </Typography>
              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '100%'}} >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="E-mail"
                name="email"
                autoComplete="email"
                autoFocus
              />

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Senha"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />

                <Grid container alignItems="center" justifyContent="space-between">
                  <Grid item>
                    <FormControlLabel
                      control={<Checkbox value="remember" color="primary" />}
                      label="Salvar sessão"
                    />
                  </Grid>

                  <Grid item>
                    <Link href="#" variant="body2">
                      Esqueci minha senha
                    </Link>
                  </Grid>
                </Grid>
                
                <Grid container alignItems="center" justifyContent="center">
                  <Grid item>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2, borderRadius: '10px', height: '50px', width: '15rem', fontSize: '1rem', backgroundColor: '#408080' }}
                    >
                        Entrar
                    </Button>
                  </Grid>
                </Grid>

                <Grid container alignItems="center" justifyContent="center">
                  <Grid item>
                    <Link href="/register" variant="body2">
                      {"Não possui uma conta? Cadatre-se"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
      {success && (
        <Alert severity="success" sx={{ position: 'fixed', bottom: '20px', left: '50%', transform: 'translateX(-50%)' }}>
          {apiResponse}
        </Alert>
      )}
      {error && (
        <Alert severity="error" sx={{ position: 'fixed', bottom: '20px', left: '50%', transform: 'translateX(-50%)' }}>
          {apiResponse}
        </Alert>
      )}
    </ThemeProvider>
  );
}
