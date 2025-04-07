import apiUrl from "../axiosClient"

const useInserData = async (url,params) => {
    const Config = {
        headers:{
            Authorization : `Bearer ${process.env.NEXT_PUBLIC_STRAPI_TOKEN}`,
        }
    }
    const res = await apiUrl.post(url,params,Config)
    return res
    
}