import {
  Card,
  CardContent,
  Divider,
  TextField,
  Typography,
} from '@mui/material'
import { PostHeader } from './postHeader'
import { Base64Image } from '../Image'
import { PostActions } from './postActions'
import { useHandleComments } from '@/hooks/useHandleComments'

export const Post = ({ post }) => {
  const { comments, handleAddComment } = useHandleComments()
  return (
    <Card
      key={post.post_id}
      sx={{ my: 2, backgroundColor: 'white !important' }}
    >
      <PostHeader
        post_author={post.post_author}
        post_author_avatar={post.post_author_avatar}
        post_location={post.post_location}
        post_lostFound={post.post_lostFound}
        post_reward={post.post_reward}
      />
      <CardContent>
        <Typography variant="body1" color="text.primary" component="p">
          {post.text}
        </Typography>
      </CardContent>
      <Base64Image mediaUrl={post.post_media} type="post" />
      <PostActions
        comments={comments}
        likes={post.likes}
        shares={post.shares}
      />
      <Divider />
      <Divider />
      <CardContent>
        <TextField
          fullWidth
          placeholder="Add a comment..."
          variant="outlined"
          size="small"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleAddComment(post.post_id, e.target.value.trim())
              e.target.value = ''
            }
          }}
        />
      </CardContent>
    </Card>
  )
}
