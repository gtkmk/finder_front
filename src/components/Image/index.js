import React from 'react';
import { useImageBase64 } from '@/hooks/useImageBase64';
import { Avatar, CardMedia, CircularProgress } from '@mui/material';

export const Base64Image = ({ mediaUrl, type, style }) => {
  const imageBase64 = useImageBase64(mediaUrl);

  if (type === 'post') {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        {imageBase64 ? (
          <CardMedia
            component="img"
            image={`data:image/jpeg;base64,${imageBase64}`}
            alt="Loading..."
            style={style}
          />
        ) : (
          <CircularProgress color="secondary" />
        )}
      </div>
    )
  }

  if (type === 'avatar') {
    return (
      <div>
        {imageBase64 ? (
          <Avatar
            alt="Loading..."
            src={`data:image/jpeg;base64,${imageBase64}`}
          />
        ) : (
          <CircularProgress
            color="secondary"
            style={{ width: '15px', height: '15px' }}
          />
        )}
      </div>
    )
  }
  
  if (type === 'profileAvatar') {
    return (
      <div>
        {imageBase64 ? (
          <Avatar
            alt="Loading..."
            src={`data:image/jpeg;base64,${imageBase64}`}
            style={{
              width: '15rem',
              height: '15rem',
              marginBottom: '8px' 
            }} 
          />
        ) : (
          <CircularProgress
            color="secondary"
            style={{ width: '15rem', height: '15rem', marginBottom: '8px' }}
          />
        )}
      </div>
    )
  }

  if (type === 'profileBanner') {
    return (
      <div style={{ height: '100%', width: '100wh' }}>
        {imageBase64 ? (
          <CardMedia 
            component="img"
            height="100%"
            width="100%"
            image={`data:image/jpeg;base64,${imageBase64}`}
            alt="Loading..."
            style={{ objectFit: 'cover' }}
          />
        ) : (
          <CircularProgress
            color="secondary"
            style={{ width: '15px', height: '15px' }}
          />
        )}
      </div>
    )
  }
}
