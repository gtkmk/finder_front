import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import SendIcon from '@mui/icons-material/Send';
import ChatIcon from '@mui/icons-material/Chat';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Image from 'next/image'
import Menu from '../../components/menu/index';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';

export default function Feed() {
  const [postsData, setPostsData] = useState([]);

  useEffect(() => {
    fetchPostsData();
  }, []);

  const fetchPostsData = async () => {
    try {
      const response = await fetch('http://localhost:8089/posts?page=1');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      const { posts } = data.data;
      setPostsData(posts.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const [comments, setComments] = useState([]);
  const handleAddComment = (postId, commentText) => {
    setComments(prevComments => [
      ...prevComments,
      { postId, id: prevComments.length + 1, post_author: 'You', text: commentText },
    ]);
  };

  return (
    <div>
      {/* <Menu /> */}
      <Container maxWidth="sm">
        {postsData.map(post => (
          <Card key={post.post_id} sx={{ my: 2, backgroundColor: 'white !important' }}>
            <CardHeader
              post_author_avatar={<Avatar alt={post.post_author} src={post.post_author_avatar} />}
              title={post.post_author}
              subheader={post.post_location}
              action={
                <>
                  {post.post_reward && (
                    <Image
                      src="/icons/bribe.png"
                      alt="Possui recompensa"
                      width={50}
                      height={50}
                    />
                  )}
                  {post.post_lostFound === 'lost' && (
                    <Image
                      src="/icons/map_lost2.png"
                      alt="Animal perdido"
                      width={50}
                      height={50}
                    />
                  )}
                </>
              }
            />
            <CardContent>
              <Typography variant="body1" color="text.primary" component="p">
                {post.text}
              </Typography>
            </CardContent>
            <CardMedia
              component="img"
              height="auto"
              image={post.post_media}
              alt="Post Image"
            />
            <CardActions disableSpacing>
              <IconButton aria-label="like">
                <KeyboardDoubleArrowUpIcon />
              </IconButton>
              <Typography variant="body2" color="text.secondary">
                {post.likes} Likes
              </Typography>
              <IconButton aria-label="comment">
                <ChatIcon />
              </IconButton>
              <Typography variant="body2" color="text.secondary">
                {post.comments} Comentários
              </Typography>
              <IconButton aria-label="comment">
                <SendIcon />
              </IconButton>
              <Typography variant="body2" color="text.secondary">
                {post.shares} Compartilhamentos
              </Typography>
            </CardActions>
            <Divider />
            <Divider />
            <CardContent>
              <TextField
                fullWidth
                placeholder="Add a comment..."
                variant="outlined"
                size="small"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && e.target.value.trim()) {
                    handleAddComment(post.post_id, e.target.value.trim());
                    e.target.value = '';
                  }
                }}
              />
            </CardContent>
          </Card>
        ))}
      </Container>
    </div>
  );
}
