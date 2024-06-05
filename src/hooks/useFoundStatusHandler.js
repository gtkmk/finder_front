import api from '@/services/api'
import { useState } from 'react'
import { toast } from 'react-toastify'

export const useFoundStatusHandler = (postId, foundStatus) => {

  const handleFound = async () => {
    try {
        let queryString = '/post/animal-found';

        queryString += `?post-id=${postId}&found=${foundStatus}`;

        const response = await api.post(queryString, {
            withCredentials: true,
        });

      if (response.status >= 200) {
        toast.success(response.data.message);
        setTimeout(() => {
            window.location.reload();
        }, 2000);
      }
    } catch (error) {
      toast.error(error.response?.data.message)
      return
    }
  }

  return {
    handleFound,
  }
}
