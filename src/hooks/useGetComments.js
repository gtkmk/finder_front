import api from '@/services/api'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

export const useGetComments = ({ postId }) => {
  const [commentsData, setCommentsData] = useState([])

  const FetchPostsData = async () => {
    try {
      const response = await api.get(`/comments?page=1&post_id=${postId}`, {
        withCredentials: true,
      })

      setCommentsData(response.data.data.comments?.data)
    } catch (error) {
      toast.error('Error fetching comments')
    } 
  }

  useEffect(() => {
    FetchPostsData()
  }, [])

  return {
    commentsData,
  }
}
