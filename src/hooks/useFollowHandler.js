import api from '@/services/api'
import { useState } from 'react'
import { toast } from 'react-toastify'

export const useFollowHandler = (profileUserId) => {

  const handleFollow = async () => {
    try {
      const response = await api.post(
        '/follow',
        {
          follower_id: profileUserId,
        },
        {
          withCredentials: true,
        }
      )

      if (response.status == 200) {
        return response.data.following
      }
    } catch (error) {
      toast.error(error.response?.data.message)
      return false
    }
  }

  return {
    handleFollow,
  }
}
