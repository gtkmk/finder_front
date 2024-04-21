import React from 'react'
import { useGetPosts } from '@/hooks/useGetPost'
import { useHandleComments } from '@/hooks/useHandleComments'
import { Post } from '@/components/post'

// MUI Components
import Container from '@mui/material/Container'

export default function Feed() {
  const { postsData } = useGetPosts()

  console.log(postsData)

  return (
    <div>
      <Container maxWidth="md">
        {postsData.map((post) => (
          <Post key={post.post_id} post={post} />
        ))}
      </Container>
    </div>
  )
}
