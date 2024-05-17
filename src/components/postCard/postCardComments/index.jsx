import { useContext, useState } from 'react'
import { useGetComments } from '@/hooks/useGetComments';

// custom components
import { PostCardContext } from '@/contexts/postCardContext'

// styles
import * as S from './postCardComments.styles'
import { CommentBox } from '../commentBox'
import { Comment } from '../comment'

export const PostCardComments = (post_id) => {
  const { commentsOpen } = useContext(PostCardContext)
  const [reloadComments, setReloadComments] = useState(false);

  // const commentsData = useGetComments({ postId: post_id.post_id });
  const commentsData = useGetComments({ postId: post_id.post_id, reload: reloadComments });

  const handleReloadComments = () => {
    setReloadComments((prev) => !prev);
  };

  return (
    <S.PostCommentsContainer open={commentsOpen}>
      <CommentBox post_id={post_id.post_id} onCommentSubmit={handleReloadComments} />
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
