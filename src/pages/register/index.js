import React, { useState, useEffect  } from 'react';
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
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import InputMask from 'react-input-mask';

export default function SignInSide() {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [agreedTerms, setAgreedTerms] = useState(false);
  const [apiResponse, setApiResponse] = useState('');
  const apiUrl = 'http://localhost:8089/signup';

  const handleBackToLogin = () => {
    window.location.href = '/login';
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const user_name = formData.get('user_name');
    const name = formData.get('name');
    const cpf = formData.get('cpf');
    const email = formData.get('email');
    const cellphone_number = formData.get('cellphone_number');
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');

    if (!user_name || !name || !cpf || !email || !cellphone_number || !password || !confirmPassword) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    if (!cpfRegex.test(cpf)) {
      setError('Por favor, digite um CPF válido (XXX.XXX.XXX-XX).');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Por favor, digite um e-mail válido.');
      return;
    }

    const cellphone_numberRegex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
    if (!cellphone_numberRegex.test(cellphone_number)) {
      setError('Por favor, digite um número de celular válido (XX) XXXX-XXXXX.');
      return;
    }

    if (password !== confirmPassword) {
      setError('As senhas não coincidem. Por favor, digite novamente.');
      return;
    }

    try {
      const response = await axios.post(apiUrl, {
        user_name,
        name,
        cpf,
        email,
        cellphone_number,
        password,
      });

      setApiResponse(response.data.message);

      if (response.status == 200) {
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          window.location.href = '/login';
        }, 3000);
      }
    } catch (error) {
      setApiResponse(error.response.data.message)
      setError(apiResponse);
    }
  };

  useEffect(() => {
    const errorTimeout = setTimeout(() => {
      setError('');
    }, 3000);

    return () => clearTimeout(errorTimeout);
  }, [error]);

  return (
    <ThemeProvider theme={theme}>
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          backgroundColor: '#56AE7E',
          opacity: 0.1,
          zIndex: -1,
        }}
      />
      <Container component="main" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CssBaseline />
        <Grid container spacing={0} alignItems="stretch" sx={{height: "70vh",  borderRadius: '8px', boxShadow: 'rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px'}}>
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

            <img src="/logo/Logo Vertical - Png - Com cor .png" alt="logo vertical" style={{ width: '150px', height: 'auto'}} />

              <Typography variant="body1" component="div" sx={{ fontSize: '15px', marginTop: '50%', width: '10rem' }}>
                Saiba mais sobre nossas políticas de privacidade e como utilizamos seus dados: 
              </Typography>
              <Link href="#" variant="body2" sx={{ color: 'white', textDecoration: 'underline' }}>
                  {"Termos de uso"}
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
              <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                <Box
                  component="button"
                  onClick={handleBackToLogin}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  <ArrowBackIcon sx={{ fontSize: 24, marginRight: '5px', verticalAlign: 'middle' }} />
                  <Typography variant="body1" component="span" sx={{ fontSize: '0.9rem', verticalAlign: 'middle' }}>
                    Voltar para Login
                  </Typography>
                </Box>
              </Box>
              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '100%'}} >
                <Grid item xs={12}>
                    <Typography variant="body1" component="div" sx={{ fontSize: '0.9rem', marginBottom: '-2%' }}>
                      Nome de usuário (visível para outros)*:
                    </Typography>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="user_name"
                      name="user_name"
                      autoComplete="name"
                    />
                  </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="body1" component="div" sx={{ fontSize: '0.9rem', marginBottom: '-2%' }}>
                      Nome*:
                    </Typography>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="name"
                      name="name"
                      autoComplete="name"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body1" component="div" sx={{ fontSize: '0.9rem', marginBottom: '-2%' }}>
                      CPF*:
                    </Typography>
                    <InputMask mask="999.999.999-99" maskChar={null}>
                      {(inputProps) => (
                        <TextField
                          {...inputProps}
                          margin="normal"
                          required
                          fullWidth
                          id="cpf"
                          name="cpf"
                          autoComplete="cpf"
                        />
                      )}
                    </InputMask>
                  </Grid>
                </Grid> 

                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="body1" component="div" sx={{ fontSize: '0.9rem', marginBottom: '-2%' }}>
                      E-mail*:
                    </Typography>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="email"
                      name="email"
                      autoComplete="email"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body1" component="div" sx={{ fontSize: '0.9rem', marginBottom: '-2%' }}>
                      Celular*:
                    </Typography>
                    <InputMask mask="(99) 99999-9999" maskChar={null}>
                      {(inputProps) => (
                        <TextField
                          {...inputProps}
                          margin="normal"
                          required
                          fullWidth
                          id="cellphone_number"
                          name="cellphone_number"
                          autoComplete="tel"
                        />
                      )}
                    </InputMask>
                  </Grid>
                </Grid>

                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="body1" component="div" sx={{ fontSize: '0.9rem', marginBottom: '-2%' }}>
                      Senha*:
                    </Typography>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body1" component="div" sx={{ fontSize: '0.9rem', marginBottom: '-2%' }}>
                      Confirmar Senha*:
                    </Typography>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      autoComplete="confirm-password"
                    />
                  </Grid>
                </Grid>

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={agreedTerms}
                      onChange={(e) => setAgreedTerms(e.target.checked)}
                      color="primary"
                    />
                  }
                  label="Concordo com os termos de uso"
                />

                <Grid container alignItems="center" justifyContent="center">
                  <Grid item>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2, borderRadius: '10px', height: '50px', width: '15rem', fontSize: '1rem', backgroundColor: '#408080' }}
                        disabled={!agreedTerms}
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
