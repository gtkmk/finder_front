import api from '@/services/api'
import { useState } from 'react'
import { toast } from 'react-toastify'

export const useUserInfoUpdater = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const updateUserInfo = async (userInfo) => {
    setLoading(true)
    setError(null)
    try {
      const response = await api.patch(
        `/user/info`,
        userInfo,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      )

      if (response.status === 200) {
        toast.success('Informações de usuário atualizadas com sucesso!')
        return response.data
      } else {
        throw new Error('Ocorreu um erro ao atualizar as informações de usuário.')
      }
    } catch (error) {
      setError(error)
      toast.error(error.response?.data.message || 'An error occurred while updating user info')
    } finally {
      setLoading(false)
    }
  }

  return {
    updateUserInfo,
    loading,
    error,
  }
}
