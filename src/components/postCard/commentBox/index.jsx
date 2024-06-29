import React, { useState } from 'react'
import TextField from '@mui/material/TextField'
import SendIcon from '@mui/icons-material/Send'
import axios from 'axios';
import * as S from './commentBox.styles'
import { useTheme } from '@mui/material'
import { toast } from 'react-toastify'
import { LocalConvenienceStoreOutlined } from '@mui/icons-material';

export const CommentBox = ({ post_id, onCommentSubmit }) => {
  const theme = useTheme();
  const [comment, setComment] = useState('');

  const handleSubmitComment = async () => {
    try {
      const formData = new FormData();
      formData.append('text', comment);
      formData.append('post_id', post_id);

      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/comment`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });

      if (response.status === 201) {
        toast.success(response.data.message);
        setComment('');
        onCommentSubmit();
      } else {	
        toast.error('Erro ao enviar o comentário:', error);
      }
    } catch (error) {
      toast.error('Erro ao enviar o comentário:', error);
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
