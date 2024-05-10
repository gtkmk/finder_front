import React, { useRef, useEffect, useState } from 'react';
import { Base64Image } from '@/components/Image';
import { CardContent, Typography, Grid } from '@mui/material';
import { PostCardActions } from '../postCardActions';
import { useHandleComments } from '@/hooks/useHandleComments';

export const PostCardContent = ({ post, miniature }) => {
  const { comments, handleAddComment } = useHandleComments();
  const [imageHeights, setImageHeights] = useState([]);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 1000);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1000);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  

  useEffect(() => {
    const calculateImageHeights = () => {
      if (window.innerWidth < 650) return;

      const gridItems = document.querySelectorAll('.post-card-grid > div > div:first-child img');
      let currentRow = [];
      let currentRowHeight = 0;
      gridItems.forEach((item, index) => {
        currentRow.push(item);
        currentRowHeight = Math.max(currentRowHeight, item.offsetHeight);
        if ((index + 1) % 2 === 0 || index === gridItems.length - 1) {
          currentRow.forEach((img) => {
            img.style.height = `${currentRowHeight}px`;
          });
          setImageHeights((prevHeights) => [...prevHeights, currentRowHeight]);
          currentRow = [];
          currentRowHeight = 0;
        }
      });
    };

    calculateImageHeights();
    window.addEventListener('resize', calculateImageHeights);

    return () => window.removeEventListener('resize', calculateImageHeights);
  }, []);
  
  if (miniature) {
    return (
      <>
        <Grid
          container
          spacing={1.5}
          alignItems="flex-start"
          className="post-card-grid"
          style={{ width: '100%', padding: '0 0.2rem 0 0.2rem', margin: '0' }}
        >
          <Grid item xs={isSmallScreen ? 12 : 8} style={{ padding: '0' }}>
            <Base64Image
              mediaUrl={post.post_media}
              type="post"
              style={{ width: '100%', objectFit: 'cover' }}
            />
          </Grid>
          {!isSmallScreen && (
            <Grid item xs={4}>
              <Typography
                variant="body1"
                color="text.primary"
                component="p"
                id={`postText_${post.post_id}`}
                style={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: 4,
                  WebkitBoxOrient: 'vertical',
                  marginBottom: '10px',
                  paddingTop: '0' 
                }}
              >
                {post.text}
              </Typography>
            </Grid>
          )}
        </Grid>
        <PostCardActions
          postId={post.post_id}
          comments={post.comments}
          likes={post.likes}
          shares={post.shares}
        />
      </>
    );
  }

  return (
    <>
      <CardContent>
        <Typography variant="body1" color="text.primary" component="p">
          {post.text}
        </Typography>
      </CardContent>
      <CardContent style={{ justifyContent: 'center', display: 'flex', padding: '0' }}>
        <Base64Image mediaUrl={post.post_media} type="post" />
      </CardContent>
      <PostCardActions
        postId={post.post_id}
        comments={post.comments}
        likes={post.likes}
        shares={post.shares}
      />
    </>
  );
};