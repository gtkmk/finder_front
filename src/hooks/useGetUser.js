import api from '@/services/api';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const useGetUser = (userId) => {
  const [userData, setUserData] = useState(null);

  const fetchUserData = async () => {
    try {
      const query = userId != null ? `/user?user-id=${userId}` : '/user';

      const response = await api.get(query, {
        withCredentials: true,
      });

      if (response.data.data[0]) {
        setUserData(response.data.data[0]);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [userId]);

  return {
    userData,
  };
};

export default useGetUser;
