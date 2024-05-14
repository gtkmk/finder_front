import { useContext } from 'react'

// custom components
import { PostCardContext } from '@/contexts/postCardContext'

// styles
import * as S from './postCardComments.styles'
import { CommentBox } from '../commentBox'

export const PostCardComments = (post_id) => {
  const { commentsOpen } = useContext(PostCardContext)

  return (
    <S.PostCommentsContainer open={commentsOpen}>
      <CommentBox post_id={post_id} />
      <div>Um comentario aleatorio hardcoded</div>
    </S.PostCommentsContainer>
  )
}
