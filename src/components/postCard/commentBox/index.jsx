import React, { useState } from 'react'
import TextField from '@mui/material/TextField'
import SendIcon from '@mui/icons-material/Send'
import axios from 'axios';
import * as S from './commentBox.styles'
import { useTheme } from '@mui/material'
import { toast } from 'react-toastify'

export const CommentBox = (post_id) => {
  const theme = useTheme();
  const [comment, setComment] = useState('');

  const handleSubmitComment = async () => {
    try {
      const formData = new FormData();
      formData.append('text', comment);
      formData.append('post_id', post_id.post_id);

      const response = await axios.post('http://localhost:8089/comment', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });

      if (response.status === 201) {
        toast.success(response.data.message);
      }

      setComment('');
    } catch (error) {
      console.error('Erro ao enviar o comentário:', error);
    }
  };

  return (
    <S.CommentBoxWrapper>
      <TextField
        label="Comentário"
        multiline
        rows={1}
        style={{ color: 'white', width: '95%' }}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <S.SendIconWrapper
        $bgColor={theme.palette.primary.main}
        $bgHoverColor={theme.palette.secondary.main}
        onClick={handleSubmitComment}
      >
        <SendIcon style={{ color: 'white' }} />
      </S.SendIconWrapper>
    </S.CommentBoxWrapper>
  )
}
