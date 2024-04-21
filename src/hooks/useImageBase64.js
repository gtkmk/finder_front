import api from '@/services/api';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export const useImageBase64 = (mediaUrl) => {
  const [imageBase64, setImageBase64] = useState('');

  const fetchImageBase64 = async () => {
    try {
      const response = await api.get('/document/imageBase64', {
        params: {
          'document-path': mediaUrl,
        },
        withCredentials: true,
      });

      setImageBase64(response.data.data);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  fetchImageBase64();
  return imageBase64;
};
