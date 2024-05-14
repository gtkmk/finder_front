import api from '@/services/api';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const useGetUser = (userId) => {
  const [userData, setUserData] = useState(null);

  const fetchUserData = async () => {
    try {
      const response = await api.get(`/user?user-id=${userId}`, {
        withCredentials: true,
      });

      if (response.data.data.data[0]) {
        setUserData(response.data.data.data[0]);
      }
    } catch (error) {
      toast.error('Error fetching user data');
    }
  };

  useEffect(() => {
    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  return {
    userData,
    isOwnProfile: userData?.is_own_profile || false, // Acessando is_own_profile e definindo um valor padrão caso não exista
  };
};

export default useGetUser;
