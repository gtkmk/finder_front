import React, { useState, useLayoutEffect } from 'react';
import { Base64Image } from '@/components/Image';
import { CardContent, Typography, Grid, Tooltip } from '@mui/material';
import { PostCardActions } from '../postCardActions';
import { useHandleComments } from '@/hooks/useHandleComments';

export const PostCardContent = ({ post, miniature }) => {
  const { comments, handleAddComment } = useHandleComments();
  const [imageHeights, setImageHeights] = useState([]);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 1000);
  const imageSize = window.innerWidth >= 468 ? '468px' : '100%';

  const imageStyle = {
    objectFit: 'cover',
    width: imageSize,
    height: imageSize,
    maxWidth: '100%',
    maxHeight: '100%',
  };

  useLayoutEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1000);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useLayoutEffect(() => {
    const calculateImageHeights = () => {
      if (window.innerWidth < 650) return;

      const gridItems = document.querySelectorAll(
        '.post-card-grid > div > div:first-child img'
      );
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

  const foundStatusOverlay = post.found_status ? (
    <Tooltip title="Animal já foi encontrado">
      <div
        style={{
          position: 'absolute',
          top: '10px',
          [miniature ? 'left' : 'right']: '10px',
          zIndex: 10,
          cursor: 'pointer',
        }}
      >
        <img
          src="/icons/sortedOut.png"
          alt="Found"
          style={{ width: '50px', height: '50px' }}
        />
      </div>
    </Tooltip>
  ) : null;

  if (miniature) {
    return (
      <>
        <Grid
          container
          spacing={1.5}
          alignItems="flex-start"
          className="post-card-grid"
          style={{
            width: '100%',
            padding: '0 0.2rem 0 0.2rem',
            margin: '0',
            position: 'relative',
          }}
        >
          <Grid item xs={isSmallScreen ? 12 : 8} style={{ padding: '0' }}>
            <div style={{ position: 'relative' }}>
              <Base64Image
                mediaUrl={post.post_media}
                type="post"
                style={imageStyle}
              />
            </div>
            {foundStatusOverlay}
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
                  paddingTop: '0',
                }}
              >
                {post.text}
              </Typography>
            </Grid>
          )}
        </Grid>
        <PostCardActions post={post} miniature={true} />
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
      <CardContent
        style={{
          justifyContent: 'center',
          display: 'flex',
          padding: '0',
          position: 'relative',
        }}
      >
        {foundStatusOverlay}
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
          <Base64Image mediaUrl={post.post_media} type="post" style={imageStyle} />
        </div>
      </CardContent>
      <PostCardActions post={post} miniature={false} />
    </>
  );
};
