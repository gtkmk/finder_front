import api from '@/services/api';
import { useState } from 'react';
import { toast } from 'react-toastify';

export const useDeleteCommentHandler = () => {
  const handleDeleteComment = async (commentId) => {
    try {
      const response = await api.delete(`/comment?comment-id=${commentId}`, {
        withCredentials: true,
      });

      if (response.status === 201) {
        toast.success(response.data.message);
        setTimeout(() => {
            window.location.reload();
        }, 1500);
      }
    } catch (error) {
      toast.error(error.response?.data.message || 'Erro ao deletar comentário.');
      return false;
    }
  };

  return {
    handleDeleteComment,
  };
};
