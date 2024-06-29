import React, { useEffect, useState } from 'react'
import { Card } from '@mui/material'
import { PostCardHeader } from './postCardHeader'
import { PostCardContent } from './postCardContent'
import { PostCardComments } from './postCardComments'
import { PostCardContextProvider } from '@/contexts/postCardContext'

export const PostCard = ({ post, miniature }) => {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 650)

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 650)
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const cardStyle = miniature
    ? {
        margin: '10px',
        display: 'inline-block',
        verticalAlign: 'top',
        width: isSmallScreen ? '90%' : '45%',
      }
    : {}

  return (
    <PostCardContextProvider>
      <Card
        key={post.post_id}
        style={cardStyle}
        sx={{ my: 2, backgroundColor: 'white' }}
      >
        <PostCardHeader
          post={post}
          miniature={miniature}
        />
        <PostCardContent post={post} miniature={miniature} />
        <PostCardComments
          post_id={post.post_id}
        />
      </Card>
    </PostCardContextProvider>
  )
}
