import { CardActions, IconButton, Typography } from '@mui/material'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt'
import SendIcon from '@mui/icons-material/Send'
import ChatIcon from '@mui/icons-material/Chat'
import { useLikeHandler } from '@/hooks/useLikeHandler'
import { useContext, useState } from 'react'
import { PostCardContext } from '@/contexts/postCardContext'

export const PostCardActions = ({ postId, comments, likes, shares, miniature }) => {
  const { setCommentsOpen } = useContext(PostCardContext)
  const [likesCount, setLikesCount] = useState(likes)
  const { handleLike } = useLikeHandler(postId, 'post', likesCount)

  const handleLikeClick = async () => {
    const newLikesCount = await handleLike()
    setLikesCount(newLikesCount)
  }

  const actionStyles = {
    display: 'flex',
    alignItems: 'center',
  }

  if (miniature) {
    return (
      <CardActions disableSpacing style={{ justifyContent: 'flex-end' }}>
        <div style={{ ...actionStyles }}>
          <IconButton aria-label="like">
            <ThumbUpAltIcon />
          </IconButton>
          <Typography variant="body2" color="text.secondary">
            {likesCount}
          </Typography>
        </div>

        <div style={{ ...actionStyles }}>
          <IconButton aria-label="share">
            <SendIcon />
          </IconButton>
          <Typography variant="body2" color="text.secondary">
            {shares}
          </Typography>
        </div>

        <div style={actionStyles}>
          <IconButton aria-label="comment">
            <ChatIcon />
          </IconButton>
          <Typography variant="body2" color="text.secondary">
            {comments}
          </Typography>
        </div>
      </CardActions>
    )
  }

  return (
    <CardActions disableSpacing style={{ justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ ...actionStyles, marginRight: '1em' }}>
          <IconButton aria-label="like" onClick={handleLikeClick}>
            <ThumbUpAltIcon />
          </IconButton>
          <Typography variant="body2" color="text.secondary">
            {likesCount}
          </Typography>
        </div>

        <div style={actionStyles}>
          <IconButton aria-label="share">
            <SendIcon />
          </IconButton>
          <Typography variant="body2" color="text.secondary">
            {shares}
          </Typography>
        </div>
      </div>

      <div style={actionStyles}>
        <IconButton aria-label="comment">
          <ChatIcon onClick={() => setCommentsOpen((prev) => !prev)} />
        </IconButton>
        <Typography variant="body2" color="text.secondary">
          {comments}
        </Typography>
      </div>
    </CardActions>
  )
}
