import api from '@/services/api'
import { useEffect } from 'react'
import { json } from 'react-router-dom'
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

    console.log("Aqui estamos")

    try {
      const response = await fetch(`http://146.148.40.85:8089/signin`, {
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
      console.log(data)
      if (response.ok) {
        toast.success(data.message)
        setTimeout(timeOutCallback, 1000)
      } else {
        toast.error(data.message || 'Something went wrong. Please try again.')
      }
    } catch (error) {
      console.log(error)
      const errorMessage = error.response?.data?.message || 'Something went wrong. Please try again.'
      toast.error(errorMessage)
    }

    console.log("bruh")

    // try {
    //   const response = await axios.post('http://146.148.40.85:8089/signin', {
    //     email,
    //     password,
    //   }, {
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     withCredentials: true,
    //   });
    
    //   const data = response.data;
    //   console.log(data);
    //   if (response.status === 200) {
    //     toast.success(data.message);
    //     setTimeout(timeOutCallback, 1000);
    //   } else {
    //     toast.error(data.message || 'Something went wrong. Please try again.');
    //   }
    // } catch (error) {
    //   const errorMessage = error.response?.data?.message || 'Something went wrong. Please try again.';
    //   toast.error(errorMessage);
    // }

    // try {
    //   const response = await axios.post('http://146.148.40.85:8089/signin', {
    //     body: JSON.stringify({
    //       email,
    //       password,
    //     }),
    //     headers: {
    //       'Content-Type': 'multipart/form-data',
    //     },
    //     withCredentials: true,
    //   });

    //   console.log("-- response --")
    //   console.log(response)

    //   if (response.status === 200) {
    //     toast.success(response.data.message);
    //     setTimeout(() => {
    //       location.reload(true);
    //     }, 2000);
    //   }
    //   onClose();
    // } catch (error) {
    //   toast.error(error.response?.data.message);
    // }
  };

  useEffect(() => {
    return () => {
      clearTimeout(timeOutCallback)
    }
  })

  return {
    handleSubmit,
  }
}
