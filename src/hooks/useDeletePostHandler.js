import api from '@/services/api';
import { useState } from 'react';
import { toast } from 'react-toastify';

export const useDeletePostHandler = () => {
  const handleDeletePost = async (postId) => {
    try {
      const response = await api.delete(`/post?post-id=${postId}`, {
        withCredentials: true,
      });

      if (response.status === 201) {
        toast.success(response.data.message);
        setTimeout(() => {
            window.location.reload();
        }, 2000);
      }
    } catch (error) {
      toast.error(error.response?.data.message || 'Erro ao deletar publicação.');
      return false;
    }
  };

  return {
    handleDeletePost,
  };
};
