import { CardActions, IconButton, Typography } from '@mui/material'
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp'
import SendIcon from '@mui/icons-material/Send'
import ChatIcon from '@mui/icons-material/Chat'

export const PostActions = ({ likes, comments, shares }) => {
  return (
    <CardActions disableSpacing>
      <IconButton aria-label="like">
        <KeyboardDoubleArrowUpIcon />
      </IconButton>
      <Typography variant="body2" color="text.secondary">
        {likes} Likes
      </Typography>
      <IconButton aria-label="comment">
        <ChatIcon />
      </IconButton>
      <Typography variant="body2" color="text.secondary">
        {comments} Comentários
      </Typography>
      <IconButton aria-label="comment">
        <SendIcon />
      </IconButton>
      <Typography variant="body2" color="text.secondary">
        {shares} Compartilhamentos
      </Typography>
    </CardActions>
  )
}
