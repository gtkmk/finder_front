import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useGetUserDetails } from '@/hooks/useGetUserDetails';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import { CardMedia } from '@mui/material';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PersonIcon from '@mui/icons-material/Person';
import Button from '@mui/material/Button';
import CheckIcon from '@mui/icons-material/Check';
import AddIcon from '@mui/icons-material/Add';

export default function Profile() {
  const router = useRouter();
  const { user_id } = router.query;
  const { userData } = useGetUserDetails(user_id);

  const [bannerGridSize, setBannerGridSize] = useState(7);
  const [isWideScreen, setIsWideScreen] = useState(false);
  const [isFollowing, setIsFollowing] = useState(true);

  const containerStyle = {
    overflow: 'hidden',
    backgroundColor: '#3D3D3D',
    margin: '0',
    maxWidth: 'calc(100% - 40px)',
    minHeight: '375px',
    maxHeight: '375px',
    color: 'white',
    borderRadius: '10px',
    margin: '20px',
    padding: '0',
  };

  useEffect(() => {
    const handleResize = () => {
      setIsWideScreen(window.innerWidth >= 1000);
      setBannerGridSize(window.innerWidth >= 1000 ? 8 : 12);
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      handleResize();
  
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  if (isWideScreen) {
    containerStyle.maxHeight = '375px';
    containerStyle.maxWidth = 'calc(100% - 40px)';
    containerStyle.margin = '20px';
  } else {
    delete containerStyle.maxHeight;
    delete containerStyle.margin;
    containerStyle.maxWidth = '100%';
  }

  return (
    <div>
      <Container style={containerStyle}>
        <Grid container spacing={3} style={{ margin: '0' }}>
          {isWideScreen ? (
            <>
              <Grid item xs={4} style={{ backgroundColor: '#3D3D3D', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0', maxHeight: '395px', marginTop: '2rem' }}>
                <div style={{ position: 'relative' }}>
                  <Avatar alt="User Avatar" src="/avatar.png" style={{ width: '15rem', height: '15rem', marginBottom: '8px' }} />
                  <Button
                    variant="contained"
                    color={isFollowing ? 'secondary' : 'primary'}
                    style={{ position: 'absolute', bottom: '0', right: '0' }}
                    startIcon={isFollowing ? <CheckIcon /> : <AddIcon />}
                  >
                    {isFollowing ? 'Seguindo' : 'Seguir'}
                  </Button>
                </div>
                <Typography variant="h6" style={{ fontWeight: 'bold' }}>Nome do Usuário</Typography>
                {/* <Typography variant="subtitle1">Nick do Usuário</Typography> */}
                <div style={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', marginRight: '16px' }}>
                    <IconButton aria-label="followers" color="primary">
                      <PeopleAltIcon />
                    </IconButton>
                    <Typography variant="body2">1000 Seguidores</Typography>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton aria-label="following" color="primary">
                      <PersonIcon />
                    </IconButton>
                    <Typography variant="body2">500 Seguindo</Typography>
                  </div>
                </div>
              </Grid>
              <Grid item xs={bannerGridSize} style={{ backgroundColor: 'pink', padding: '0' }}>
                <CardMedia 
                  component="img"
                  height="100%"
                  width="100%"
                  image="/banner.png"
                  alt="Loading..."
                  style={{ objectFit: 'cover', minHeight: '395px', maxHeight: '395px' }}
                />
              </Grid>
            </>
          ) : (
            <>
              <Grid item xs={12} style={{ backgroundColor: 'transparent', maxHeight: '32rem', padding: '0' }}>
                <CardMedia 
                  component="img"
                  height="100%"
                  width="100%"
                  image="/banner.png"
                  alt="Loading..."
                  style={{ objectFit: 'cover', maxHeight: '300px' }}
                />
                <div style={{ position: 'relative', top: '-6rem', textAlign: 'center' }}>
                  <Avatar alt="User Avatar" src="/avatar.png" style={{ width: '10rem', height: '10rem', margin: '0 auto' }} />
                  <Button
                    variant="contained"
                    color={isFollowing ? 'secondary' : 'primary'}
                    style={{ position: 'absolute', bottom: '7rem', margin: '0', padding: '6px' }}
                    startIcon={
                        isFollowing ? (
                          <CheckIcon />
                        ) : (
                          <AddIcon />
                        )
                    }
                  >
                    {isFollowing ? 'Seguindo' : 'Seguir'}
                  </Button>
                  <div style={{ marginTop: '8px' }}>
                    <span style={{ fontWeight: 'bold', fontSize: '16px' }}>Nick do Usuário</span>
                    <br />
                    <span>Nome do Usuário</span>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', marginRight: '16px' }}>
                        <IconButton aria-label="followers" color="primary">
                          <PeopleAltIcon />
                        </IconButton>
                        <Typography variant="body2">1000 Seguidores</Typography>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton aria-label="following" color="primary">
                          <PersonIcon />
                        </IconButton>
                        <Typography variant="body2">500 Seguindo</Typography>
                      </div>
                    </div>
                  </div>
                </div>
              </Grid>
            </>
          )}
        </Grid>
      </Container>
    </div>
  );
}