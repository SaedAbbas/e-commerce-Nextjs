// utils/hooks/useInsertData.js
import axiosClient from "../axiosClient";

const UseInsertData = async (url, params) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },

      withCredentials: true, // عشان الكوكي يترسل مع الطلب
    };

    const response = await axiosClient.post(url, params, config);
    return response.data;
  } catch (error) {
    console.error('Error in UseInsertData:', error.response?.data || error.message);
    return { data: null, error: error.response?.data?.message || 'Something went wrong' };
  }
};

export default UseInsertData;