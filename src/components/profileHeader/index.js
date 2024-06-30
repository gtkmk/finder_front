import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import { Alert, CardMedia } from '@mui/material';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PersonIcon from '@mui/icons-material/Person';
import Button from '@mui/material/Button';
import CheckIcon from '@mui/icons-material/Check';
import AddIcon from '@mui/icons-material/Add';
import { Base64Image } from '@/components/Image';
import { useFollowHandler } from '@/hooks/useFollowHandler'
import { capitalizeFirstLetters } from '@/helpers/string/capitalizeFirstLetters';

export default function Profile({
    userId,
    name,
    userName,
    email,
    cellphoneNumber,
    followersCount,
    followingCount,
    foundPostsCount,
    lostPostsCount,
    profilePicture,
    profileBanner,
    isOwnProfile,
    isFollowed,
    isFollowing,
  }) {
  const router = useRouter();
  const { user_id } = router.query;

  const [bannerGridSize, setBannerGridSize] = useState(8);
  const [isWideScreen, setIsWideScreen] = useState(false);
  const [followersCounter, setFollowersCounter] = useState(followingCount);
  const { handleFollow } = useFollowHandler(userId);
  const [followStatus, setFollowStatus] = useState(isFollowed);

  const handleFollowClick = async () => {
    const newFollowStatus = await handleFollow();
    setFollowStatus(newFollowStatus);
    setFollowersCounter(prevCount => newFollowStatus ? prevCount + 1 : prevCount - 1);
  };

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
    display: 'flex',
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
      <Typography variant="h6" style={{
        margin: '0',
        padding: '0',
        position: 'fixed',
        top: '1rem',
        zIndex: 1000,
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold', 
        color: 'white',
      }}>
        {capitalizeFirstLetters(name)}
      </Typography>
      <Container style={containerStyle}>
        <Grid container spacing={3} style={{ margin: '0', display: 'flex' }}>
          {isWideScreen ? (
            <>
              <Grid item xs={4} style={{ backgroundColor: '#3D3D3D', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0', maxHeight: '395px', marginTop: '2rem' }}>
                <div style={{ position: 'relative' }}>
                  <Base64Image
                    mediaUrl={profilePicture}
                    type="profileAvatar"
                  />
                  {!isOwnProfile && (
                    <Button
                      variant="contained"
                      color={followStatus ? 'secondary' : 'primary'}
                      style={{ position: 'absolute', bottom: '0', right: '0' }}
                      startIcon={followStatus ? <CheckIcon /> : <AddIcon />}
                      onClick={handleFollowClick}
                    >
                      {followStatus ? 'Seguindo' : 'Seguir'}
                    </Button>
                  )}
                </div>
                <Typography variant="h6" style={{ fontWeight: 'bold' }}>{userName}</Typography>
                <div style={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', marginRight: '16px' }}>
                    <IconButton aria-label="followers" color="primary">
                      <PeopleAltIcon />
                    </IconButton>
                    <Typography variant="body2">{followersCounter} Seguidores</Typography>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton aria-label="following" color="primary">
                      <PersonIcon />
                    </IconButton>
                    <Typography variant="body2">{followersCount} Seguindo</Typography>
                  </div>
                </div>
              </Grid>
              <Grid item xs={bannerGridSize} style={{ padding: '0' }}>
                <Base64Image
                    mediaUrl={profileBanner}
                    type="profileBanner"
                    style={{ height: '100%' }}
                  />
              </Grid>
            </>
          ) : (
            <>
              <Grid item xs={12} style={{ backgroundColor: 'transparent', maxHeight: '32rem', padding: '0' }}>
                  <Base64Image
                    mediaUrl={profileBanner}
                    type="miniatureProfileBanner"
                  />
                <div style={{ position: 'relative', top: '-6rem', textAlign: 'center' }}>
                  <Base64Image
                    mediaUrl={profilePicture}
                    type="miniatureProfileAvatar"
                  />
                    {!isOwnProfile && (
                      <Button
                        variant="contained"
                        color={followStatus ? 'secondary' : 'primary'}
                        style={{ position: 'absolute', bottom: '0', right: '0' }}
                        startIcon={followStatus ? <CheckIcon /> : <AddIcon />}
                        onClick={handleFollowClick}
                      >
                        {followStatus ? 'Seguindo' : 'Seguir'}
                      </Button>
                    )}
                  <div style={{ marginTop: '8px' }}>
                    <span style={{ fontWeight: 'bold', fontSize: '16px' }}>{userName}</span>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', marginRight: '16px' }}>
                        <IconButton aria-label="followers" color="primary">
                          <PeopleAltIcon />
                        </IconButton>
                        <Typography variant="body2">{followersCounter} Seguidores</Typography>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton aria-label="following" color="primary">
                          <PersonIcon />
                        </IconButton>
                        <Typography variant="body2">{followersCount} Seguindo</Typography>
                      </div>
                    </div>
                  </div>
                </div>
              </Grid>
            </>
          )}
        </Grid>
      </Container>
      <style jsx>{`
        .fixedUserName {
          position: fixed;
          top: 0;
          width: 100%;
          background-color: #3D3D3D;
          color: white;
          text-align: center;
          padding: 10px 0;
          z-index: 1000;
        }
      `}</style>
    </div>
  );
}
