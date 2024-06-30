import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { toast } from 'react-toastify';
import axios from 'axios';
import useGetUser from '@/hooks/useGetUser';
import { Base64Image } from '@/components/Image';
import { useUserInfoUpdater } from '@/hooks/useUserInfoUpdater';
import { capitalizeFirstLetters } from '@/helpers/string/capitalizeFirstLetters';

const ConfigModalContent = ({ onClose, userId }) => {
  const { userData, loading, error } = useGetUser(userId);
  const { updateUserInfo } = useUserInfoUpdater();

  const [profilePicture, setProfilePicture] = useState(null);
  const [banner, setBanner] = useState(null);
  const [name, setName] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [cellphoneNumber, setCellphoneNumber] = useState('');

  useEffect(() => {
    if (userData) {
      setName(capitalizeFirstLetters(userData.name));
      setUserName(userData.user_name);
      setEmail(userData.email);
      setCellphoneNumber(userData.cellphone_number);
      setProfilePicture(userData.profile_picture_path);
      setBanner(userData.profile_banner_picture_path);
    }
  }, [userData]);

  const handleSaveChanges = async () => {
    const userInfo = {
      name,
      cellphone_number: cellphoneNumber,
    };

    try {
      await updateUserInfo(userInfo);
      toast.success('Alterações salvas com sucesso!');
      onClose();
    } catch (error) {
      toast.error('Erro ao salvar as alterações!');
    }
  };

  const handleCancel = () => {
    onClose();
  };

  const handleImageUpload = (file, type) => {
    const formData = new FormData();
    formData.append('media', file);
    formData.append('type', type);

    axios.patch('http://localhost:8089/document/changeProfileImage', formData, {
      withCredentials: true,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(response => {
      toast.success('Imagem alterada com sucesso!');
      setTimeout(() => {
        window.location.href = '/profile';
      }, 1200);
    })
    .catch(error => {
      toast.error('Erro ao alterar a imagem!');
    });
  };

  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      handleImageUpload(file, 'profile_picture');
    }
  };

  const handleBannerChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      handleImageUpload(file, 'profile_banner_picture');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading user data</div>;

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Configurações de Perfil
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={4} style={{ paddingRight: '20px' }}>
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            {profilePicture && (
              <>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                  <Base64Image
                    mediaUrl={profilePicture}
                    type="profileAvatar"
                    style={{ borderRadius: '10px' }}
                  />
                </div>
                <input
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="profile-picture-upload"
                  type="file"
                  onChange={handleProfilePictureChange}
                />
                <label htmlFor="profile-picture-upload">
                  <Button variant="contained" color="primary" component="span" style={{ marginTop: '10px' }}>
                    Alterar Foto de Perfil
                  </Button>
                </label>
              </>
            )}
          </div>
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            {banner && (
              <>
                <div style={{ borderRadius: '10px', overflow: 'hidden', border: '1px solid #ccc' }}>
                  <Base64Image
                    mediaUrl={banner}
                    type="profileBanner"
                    style={{ width: '100%', height: 'auto' }}
                  />
                </div>
                <input
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="banner-upload"
                  type="file"
                  onChange={handleBannerChange}
                />
                <label htmlFor="banner-upload">
                  <Button variant="contained" color="primary" component="span" style={{ marginTop: '10px' }}>
                    Alterar Banner
                  </Button>
                </label>
              </>
            )}
          </div>
        </Grid>
        <div style={{ width: '2px', backgroundColor: '#ccc', marginRight: '20px' }}></div>
        <Grid item xs={7}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Nome de usuário"
                value={userName}
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="E-mail"
                value={email}
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Número de celular"
                value={cellphoneNumber}
                onChange={(e) => setCellphoneNumber(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} style={{ textAlign: 'right' }}>
              <Button variant="contained" color="secondary" onClick={handleCancel} style={{ marginRight: '10px' }}>
                Cancelar
              </Button>
              <Button variant="contained" color="primary" onClick={handleSaveChanges}>
                Salvar Alterações
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default ConfigModalContent;
