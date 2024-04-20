import axios from "axios";
import { useEffect, useState } from "react";

export const useGetPosts = () => {
  const [postsData, setPostsData] = useState([]);

  const fetchPostsData = async () => {
    try {
      const response = await axios.get("http://localhost:8089/posts?page=1", {
        withCredentials: true,
      });
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      const { posts } = data.data;
      setPostsData(posts.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchPostsData();
  }, []);

  return {
    postsData,
  };
};
