import api from '@/services/api'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const useGetPostParams = () => {
  const [postParamsData, setPostParamsData] = useState([])

  const fetchPostParamsData = async () => {
    try {
      const response = await api.get('/post-params', {
        withCredentials: true,
      })

      setPostParamsData(response.data.postParams)
    } catch (error) {
      toast.error('Error fetching post params')
    }
  }

  useEffect(() => {
    fetchPostParamsData()
  }, [])

  return {
    postParamsData,
  }
}

export default useGetPostParams;
