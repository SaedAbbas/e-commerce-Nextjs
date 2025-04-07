import axiosClient from "../axiosClient"

const UseInserData = async (url,params) => {
    const Config = {
        headers:{
            'Content-Type': 'application/json',
            // Authorization : `Bearer ${process.env.NEXT_PUBLIC_STRAPI_TOKEN}`,
        },
        // credentials : 'include', //هاي فال fetch
        withCredentials : true, //هاي فال axios
    }
    const res = await axiosClient.post(url,params,Config)
    return res
    
}

export default UseInserData