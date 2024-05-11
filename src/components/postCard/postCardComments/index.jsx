import { useContext } from 'react'

// custom components
import { PostCardContext } from '@/contexts/postCardContext'

// MUI
import TextField from '@mui/material/TextField'

// styles
import * as S from './postCardComments.styles'

export const PostCardComments = () => {
  const { commentsOpen } = useContext(PostCardContext)

  return (
    <S.PostCommentsContainer open={commentsOpen}>
      <div>Meu ovo</div>
      {/* <Textarea size="lg" name="Size" placeholder="Large" /> */}
      <TextField
        // id="outlined-multiline-static"
        label="Comentario"
        multiline
        rows={2}
        style={{ color: 'white' }}
      />
    </S.PostCommentsContainer>
  )
}
