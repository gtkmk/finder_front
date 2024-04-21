import React from 'react'
import { useImageBase64 } from '@/hooks/useImageBase64'
import { CardMedia, CircularProgress } from '@mui/material'
import Avatar from '@mui/material/Avatar'

export const Base64Image = ({ mediaUrl, type }) => {
  const imageBase64 = useImageBase64(mediaUrl)

  if (type === 'post') {
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
}
