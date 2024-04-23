import api from '@/services/api'
import { useState } from 'react'
import { toast } from 'react-toastify'

export const useLikeHandler = (contentId, likeType, likes) => {

  const handleLike = async () => {
    try {
      const response = await api.post(
        '/like',
        {
          like_type: likeType,
          post_id: contentId,
        },
        {
          withCredentials: true,
        }
      )

      if (response.status == 200) {
        return response.data.likesCount
      }
    } catch (error) {
      toast.error(error.response?.data.message)
      return likes
    }
  }

  return {
    handleLike,
  }
}
