import api from '@/services/api';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export const useImageBase64 = (mediaUrl) => {
  const [imageBase64, setImageBase64] = useState('');

  useEffect(() => {
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

    if (mediaUrl) {
      fetchImageBase64();
    }

    return () => setImageBase64('');
  }, [mediaUrl]);

  return imageBase64;
};
