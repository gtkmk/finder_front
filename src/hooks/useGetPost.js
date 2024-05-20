import api from '@/services/api';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export const useGetPosts = ({ user_id }) => {
  const [postsData, setPostsData] = useState([]);
  const [filters, setFilters] = useState({
    lostFound: null,
    reward: null,
    animalType: null,
    animalSize: null,
  });

  const fetchPostsData = async () => {
    try {
      let queryString = '/posts?page=1';

      if (user_id) {
        queryString += `&user_id=${user_id}`;
      }

      if (filters.lostFound) {
        queryString += `&lostFound=${filters.lostFound}`;
      }

      if (filters.reward) {
        queryString += `&reward=${filters.reward}`;
      }

      if (filters.animalType) {
        queryString += `&animal_type=${filters.animalType}`;
      }

      if (filters.animalSize) {
        queryString += `&animal_size=${filters.animalSize}`;
      }

      const response = await api.get(queryString, {
        withCredentials: true,
      });

      const { posts } = response.data.data;
      setPostsData(posts.data);
    } catch (error) {
      toast.error('Algo deu errado...');
    }
  };

  useEffect(() => {
    fetchPostsData();
  }, [filters]);

  return {
    postsData,
    setFilters,
  };
};
