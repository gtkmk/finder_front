import React, { useState, useLayoutEffect } from 'react';
import { Base64Image } from '@/components/Image';
import { CardContent, Typography, Grid, Tooltip } from '@mui/material';
import { PostCardActions } from '../postCardActions';
import { useHandleComments } from '@/hooks/useHandleComments';

export const PostCardContent = ({ post, miniature }) => {
  const { comments, handleAddComment } = useHandleComments();
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 1000);
  const [imageHeight, setImageHeight] = useState(() => {
    if (window.innerWidth > 1600) return "430px";
    if (window.innerWidth > 1400) return "370px";
    if (window.innerWidth > 1150) return "300px";
    if (window.innerWidth > 1000) return "288px";
    if (window.innerWidth > 1000) return "288px";
    if (window.innerWidth > 650) return "200px";
    if (window.innerWidth < 650) return "auto";
    return 150; // default height for smaller screens
  });

  useLayoutEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1000);
      if (window.innerWidth > 1600) {
        setImageHeight("430px");
      } else if (window.innerWidth > 1400) {
        setImageHeight("370px");
      } else if (window.innerWidth > 1150) {
        setImageHeight("300px");
      } else if (window.innerWidth > 1000) {
        setImageHeight("288px");
      } else if (window.innerWidth < 650) {
        setImageHeight("auto");
      } else {
        setImageHeight("200px");
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
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

  const imageContainerStyle = {
    width: '100%',
    height: miniature ? `${imageHeight}` : 'auto', // Dynamic height based on screen width
    position: 'relative',
  };

  const imageStyle = {
    objectFit: 'fill', // Ensure images fill the container
    width: '100%',
    height: '100%',
  };

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
            <div style={imageContainerStyle}>
              <Base64Image
                mediaUrl={post.post_media}
                type="post"
                style={imageStyle}
              />
              {foundStatusOverlay}
            </div>
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
        <div style={{ width: '100%', height: 'auto', position: 'relative' }}>
          <Base64Image mediaUrl={post.post_media} type="post" style={imageStyle} />
        </div>
      </CardContent>
      <PostCardActions post={post} miniature={false} />
    </>
  );
};
