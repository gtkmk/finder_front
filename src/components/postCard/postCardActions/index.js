import { CardActions, IconButton, Typography } from '@mui/material'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import SendIcon from '@mui/icons-material/Send'
import ChatIcon from '@mui/icons-material/Chat'

export const PostCardActions = ({ likes, comments, shares }) => {
  return (
  <CardActions disableSpacing style={{ justifyContent: 'space-between' }}>
    <div style={{ display: 'flex', alignItems: 'center'}}>
      <div style={{ display: 'flex', alignItems: 'center', padding: '0 20px', marginRight: '1em' }}>
        <IconButton aria-label="like">
          <ThumbUpAltIcon />
        </IconButton>
        <Typography variant="body2" color="text.secondary">
          {likes}
        </Typography>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', padding: '0 20px' }}>
        <IconButton aria-label="share">
          <SendIcon />
        </IconButton>
        <Typography variant="body2" color="text.secondary">
          {shares}
        </Typography>
      </div>
    </div>

    <div style={{ display: 'flex', alignItems: 'center', padding: '0 20px' }}>
      <IconButton aria-label="comment">
        <ChatIcon />
      </IconButton>
      <Typography variant="body2" color="text.secondary">
        {comments}
      </Typography>
    </div>
  </CardActions>
  );
}
