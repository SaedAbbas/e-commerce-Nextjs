import axiosClient from "../axiosClient";

const UseInsertData = async (url, params) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      };
  
      const response = await axiosClient.post(url, params, config);
      
      return response.data;
    } catch (error) {
      console.error('Error:', error);
      return { 
        error: error.response?.data?.error?.message || 
               error.response?.data?.message || 
               'Something went wrong' 
      };
    }
  };

  export default UseInsertData;