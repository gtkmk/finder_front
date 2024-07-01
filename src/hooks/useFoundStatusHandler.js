import api from '@/services/api'
import { useState } from 'react'
import { toast } from 'react-toastify'

export const useFoundStatusHandler = (postId, foundStatus) => {
  const handleFound = async () => {
    try {
      const response = await fetch(`http://146.148.40.85:8089/post/animal-found?post-id=${postId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      })

      const data = await response.json()

      if (response.ok) {
        toast.success(data.message)
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else {
        toast.error(data.message || 'Something went wrong. Please try again.')
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Something went wrong. Please try again.'
      toast.error(errorMessage)
    }
  }

  return {
    handleFound,
  }
}
