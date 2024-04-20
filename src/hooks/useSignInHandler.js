import axios from "axios";
import { useEffect } from "react";
import { toast } from "react-toastify";

export const useSignInHandler = () => {
  const apiUrl = "http://localhost:8089/signin";

  const timeOutCallback = () => {
    window.location.href = "/feed";
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const response = await axios.post(
        apiUrl,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      if (response.status == 200) {
        toast.success(response.data.message);
        setTimeout(timeOutCallback, 1000);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data.message);
    }
  };

  useEffect(() => {
    return () => {
      clearTimeout(timeOutCallback);
    };
  });

  return {
    handleSubmit,
  };
};
