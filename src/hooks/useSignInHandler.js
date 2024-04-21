import api from '@/services/api'
import { useEffect } from 'react'
import { toast } from 'react-toastify'

export const useSignInHandler = () => {
  const timeOutCallback = () => {
    window.location.href = '/feed'
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const email = formData.get('email')
    const password = formData.get('password')

    try {
      const response = await api.post(
        '/signin',
        {
          email,
          password,
        },
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
    handleSubmit,
  }
}
