import api from '@/services/api'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

export const useGetUserDetails = (userId) => {
  const [userData, setUserData] = useState([])

  const fetchUserData = async () => {
    try {
      const response = await api.get('/user', {
        params: {
            'user-id': userId,
        },
        withCredentials: true,
      })

      const { posts } = response.data.data
      setUserData(posts.data)
    } catch (error) {
      toast.error('Error fetching user')
    }
  }

  useEffect(() => {
    fetchUserData()
  }, [])

  return {
    userData,
  }
}
