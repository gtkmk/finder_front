import React from 'react'
import { useGetPosts } from '@/hooks/useGetPost'
import { useHandleComments } from '@/hooks/useHandleComments'
import { PostCard } from '@/components/postCard'
import CreatePostButton from '@/components/createPostButton';

// MUI Components
import Container from '@mui/material/Container'

export default function Feed() {
  const { postsData } = useGetPosts()

  return (
    <div>
      <Container maxWidth="md">
        <CreatePostButton buttonText="Criar nova postagem" />
        {postsData.map((post) => (
          <PostCard key={post.post_id} post={post} />
        ))}
      </Container>
    </div>
  )
}
