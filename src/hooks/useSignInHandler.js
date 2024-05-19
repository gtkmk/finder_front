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
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
        credentials: 'include',
      })

      const data = await response.json()

      if (response.ok) {
        toast.success(data.message)
        setTimeout(timeOutCallback, 1000)
      } else {
        toast.error(data.message || 'Something went wrong. Please try again.')
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Something went wrong. Please try again.'
      toast.error(errorMessage)
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
