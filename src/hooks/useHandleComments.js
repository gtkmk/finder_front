import { useState } from 'react'

export const useHandleComments = () => {
  const [comments, setComments] = useState([])

  const handleAddComment = (postId, commentText) => {
    setComments((prevComments) => [
      ...prevComments,
      {
        postId,
        id: prevComments.length + 1,
        post_author: 'You',
        text: commentText,
      },
    ])
  }

  return {
    comments,
    handleAddComment,
  }
}
