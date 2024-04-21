import { Card } from '@mui/material'
import { PostHeader } from './postHeader'
import { useHandleComments } from '@/hooks/useHandleComments'
import { PostContent } from './postContent'

export const Post = ({ post }) => {
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
      <PostContent post={post} />
    </Card>
  )
}
