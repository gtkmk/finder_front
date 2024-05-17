import api from '@/services/api'
import { useEffect } from 'react'
import { toast } from 'react-toastify'

export const useLogoutHandler = () => {
  const timeOutCallback = () => {
    window.location.href = '/feed'
  }

  const handleLogout = async () => {
    try {
      const response = await api.post(
        '/signout',
        {
          withCredentials: true,
        }
      )

      if (response.status == 200) {
        toast.success(response.data.message)
        setTimeout(timeOutCallback, 1000)
      }
    } catch (error) {
      toast.error(error.response?.data.message)
    }
  }

  useEffect(() => {
    return () => {
      clearTimeout(timeOutCallback)
    }
  })

  return {
    handleLogout,
  }
}
