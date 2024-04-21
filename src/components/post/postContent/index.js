import { Base64Image } from '@/components/Image'
import { CardContent, Divider, TextField, Typography } from '@mui/material'
import { PostCardActions } from '../postCardActions'
import { useHandleComments } from '@/hooks/useHandleComments'

export const PostContent = ({ post }) => {
  const { comments, handleAddComment } = useHandleComments()
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
        }}
      >
        <Base64Image mediaUrl={post.post_media} type="post" />
      </CardContent>
      <PostCardActions
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
    </>
  )
}
