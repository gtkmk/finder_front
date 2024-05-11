// MUI
import TextField from '@mui/material/TextField'
import SendIcon from '@mui/icons-material/Send'

// Styles
import * as S from './commentBox.styles'
import { useTheme } from '@mui/material'

export const CommentBox = () => {
  const theme = useTheme()
  return (
    <S.CommentBoxWrapper>
      <TextField
        label="Comentario"
        multiline
        rows={1}
        style={{ color: 'white', width: '95%' }}
      />
      <S.SendIconWrapper
        $bgColor={theme.palette.primary.main}
        $bgHoverColor={theme.palette.secondary.main}
      >
        <SendIcon />
      </S.SendIconWrapper>
    </S.CommentBoxWrapper>
  )
}
