import { useContext } from 'react'

// custom components
import { PostCardContext } from '@/contexts/postCardContext'

// styles
import * as S from './postCardComments.styles'
import { CommentBox } from '../commentBox'

export const PostCardComments = () => {
  const { commentsOpen } = useContext(PostCardContext)

  return (
    <S.PostCommentsContainer open={commentsOpen}>
      <CommentBox />
      <div>Um comentario aleatorio hardcoded</div>
    </S.PostCommentsContainer>
  )
}
