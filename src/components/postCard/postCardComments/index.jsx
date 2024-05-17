import { useContext } from 'react'
import { useGetComments } from '@/hooks/useGetComments';

// custom components
import { PostCardContext } from '@/contexts/postCardContext'

// styles
import * as S from './postCardComments.styles'
import { CommentBox } from '../commentBox'
import { Comment } from '../comment'

export const PostCardComments = (post_id) => {
  const { commentsOpen } = useContext(PostCardContext)
  const commentsData = useGetComments({ postId: post_id.post_id });

  return (
    <S.PostCommentsContainer open={commentsOpen}>
      <CommentBox post_id={post_id.post_id} />
        {commentsData.commentsData.map((comment) => (
          <Comment key={comment.comment_id} 
            commentId={comment.comment_id}
            postId={post_id}
            authorNickname={comment.author_username}
            commentAuthorAvatar={comment.comment_author_avatar}
            createdAt={comment.created_at}
            likes={comment.likes} 
            text={comment.text} 
          />
        ))}
    </S.PostCommentsContainer>
  )
}
