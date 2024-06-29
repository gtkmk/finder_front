import api from '@/services/api';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export const useGetPosts = ({ userId, postId, friends, isOnwProfile }) => {
    const [postsData, setPostsData] = useState([]);

    const [especificFilters, setEspecificFilters] = useState({
        user_id: userId,
        specific_post: postId,
        only_following_posts: friends,
        is_onw_profile: isOnwProfile,
    });

    const [filters, setFilters] = useState({
        lostFound: null,
        reward: null,
        animalType: null,
        animalSize: null,
        location: null,
    });

    const fetchPostsData = async () => {
        try {
            let queryString = '/posts?page=1';

            if (especificFilters.user_id) {
                queryString += `&user_id=${especificFilters.user_id}`;
            }

            if (especificFilters.is_onw_profile && !especificFilters.user_id) {
                queryString += `&is_own_profile=1`;
            }

            if (postId) {
                queryString += `&specific_post=${postId}`;
            }

            if (friends) {
                queryString += `&only_following_posts=1`;
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

            if (filters.location) {
                queryString += `&neighborhood=${filters.location}`;
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

    useEffect(() => {
      fetchPostsData();
    }, [especificFilters]);

    return {
        postsData,
        setFilters,
        setEspecificFilters,
    };
};
