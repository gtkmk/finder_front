import api from '@/services/api'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

export const useGetPosts = ({ user_id }) => {
  const [postsData, setPostsData] = useState([])
  const [filters, setFilters] = useState({});

  const FetchPostsData = async () => {
    try {
      let queryString = '/posts?page=1';

      if (user_id) {
        queryString += `&user_id=${user_id}`;
      }

      if (filters.lostFound) {
          queryString += `&lostFound=${filters.lostFound}`;
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
  }, [filters])

  return {
    postsData,
    setFilters,
  }
}
