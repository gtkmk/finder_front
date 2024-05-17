import { useState } from 'react';
import api from '@/services/api';
import { toast } from 'react-toastify';

const usePostFormHandler = () => {
    const handleSubmit = async (event) => {
      const formData = new FormData(event.currentTarget)
      const text = formData.get('text')
      const media = formData.get('media')
      const location = formData.get('location')
      const reward = formData.get('reward')
      const lost_found = formData.get('lost_found')
      const animal_type = formData.get('animal_type')
      const animal_size = formData.get('animal_size')
      const city = formData.get('city')
      const state = formData.get('state')
      const privacy = 'public'
      const category = 'default'

      console.log(event)
  
      if (
        !text ||
        !media ||
        !animal_size ||
        !city ||
        !state ||
        !reward ||
        !lost_found ||
        !animal_type ||
        !animal_size
      ) {
        toast.error('Por favor, preencha todos os campos.')
        return
      }

      alert(media)
  
      try {
        const response = await api.post('/post', {
            text,
            location,
            reward,
            lost_found,
            animal_type,
            animal_size,
            privacy,
            category,
        })
  
        if (response.status == 200) {
          setTimeout(() => {
            window.location.href = '/feed'
          }, 3000)
        }
      } catch (error) {
        toast.error(error.response.data.message)
      }
    }
  
    return {
      handleSubmit,
    }
  }

export default usePostFormHandler;
