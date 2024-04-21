import React, { useEffect, useState } from 'react';
import { useImageBase64 } from '@/hooks/useImageBase64';
import { CardMedia } from '@mui/material';

const FeedImageBase64 = ({ mediaUrl }) => {
  const imageBase64 = useImageBase64(mediaUrl);

  return (
    <div>
      {imageBase64 ? (
        <CardMedia 
            component="img"
            height="auto"
            image={`data:image/jpeg;base64,${imageBase64}`}
            alt="Loading..."
        />
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
};

export default FeedImageBase64;
