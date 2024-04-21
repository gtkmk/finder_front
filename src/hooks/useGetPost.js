import api from '@/services/api'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

export const useGetPosts = () => {
  const [postsData, setPostsData] = useState([])

  const fetchPostsData = async () => {
    try {
      const response = await api.get('/posts?page=1', {
        withCredentials: true,
      })

      const { posts } = response.data.data
      setPostsData(posts.data)
    } catch (error) {
      toast.error('Error fetching posts')
    }
  }

  useEffect(() => {
    fetchPostsData()
  }, [])

  return {
    postsData,
  }
}
