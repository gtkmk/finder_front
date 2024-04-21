import React, { useEffect, useState } from 'react';
import { useImageBase64 } from '@/hooks/useImageBase64';
import Avatar from '@mui/material/Avatar'
import { CardMedia } from '@mui/material';

const AvatarImageBase64 = ({ mediaUrl }) => {
  const imageBase64 = useImageBase64(mediaUrl);

  return (
    <div>
      {imageBase64 ? (
        <Avatar  
            alt="Loading..."
            src={`data:image/jpeg;base64,${imageBase64}`}
        />
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
};

export default AvatarImageBase64;
