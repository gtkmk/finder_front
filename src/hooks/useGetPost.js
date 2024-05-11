import api from '@/services/api'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

export const useGetPosts = (queryParams = {}) => {
  const [postsData, setPostsData] = useState([])

  const FetchPostsData = async () => {
    try {
      let queryString = '/posts?page=1'

      if (queryParams.lostFound) {
        queryString += `&lostFound=${queryParams.lostFound}`
      }
      if (queryParams.user_id) {
        queryString += `&user_id=${queryParams.user_id}`
      }

      const response = await api.get(queryString, {
        withCredentials: true,
      })

      const { posts } = response.data.data
      setPostsData(posts.data)
    } catch (error) {
      toast.error('Error fetching posts')
    } 
  }

  useEffect(() => {
    FetchPostsData()
  }, [])

  return {
    postsData,
  }
}
