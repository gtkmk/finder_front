import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const useGetPosts = () => {
  const [postsData, setPostsData] = useState([]);

  const timeOutCallback = () => {
    window.location.href = "/login";
  };

  const fetchPostsData = async () => {
    try {
      const response = await axios.get("http://localhost:8089/posts?page=1", {
        withCredentials: true,
      });

      const { posts } = response.data.data;
      setPostsData(posts.data);
      console.log(posts)
    } catch (error) {
      if (error.response.status == 401) {
        toast.error("Falha na autenticação. Tente fazer login novamente.");
        setTimeout(timeOutCallback, 1000);
      }

      toast.error("Algo deu errado. Tente novamente mais tarde.");
    }
  };

  useEffect(() => {
    fetchPostsData();
  }, []);

  return {
    postsData,
  };
};
