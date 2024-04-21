import { Card } from '@mui/material'
import { PostCardHeader } from './postCardHeader'
import { PostCardContent } from './postCardContent'

export const PostCard = ({ post }) => {
  return (
    <Card
      key={post.post_id}
      sx={{ my: 2, backgroundColor: 'white !important' }}
    >
      <PostCardHeader
        post_author={post.post_author}
        post_author_avatar={post.post_author_avatar}
        post_location={post.post_location}
        post_lostFound={post.post_lostFound}
        post_reward={post.post_reward}
      />
      <PostCardContent post={post} />
    </Card>
  )
}
