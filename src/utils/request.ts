import axios, {AxiosInstance, AxiosError, AxiosResponse, AxiosRequestConfig} from 'axios';
import {ResponseData} from "../dto/index";



const service: AxiosInstance = axios.create({
    baseURL: "http://localhost:8088/"
    , timeout: 5000
    , withCredentials: true
    ,headers:{
        "token":localStorage.getItem("token")||""
    }
});

service.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        // const  token = localStorage.getItem("token")||"";
        // config.
        return config;
    },
    (error: AxiosError) => {
        console.log(error);
        return Promise.reject();
    }
);

service.interceptors.response.use(
    (response: AxiosResponse) => {
        if (response.status === 200) {
            return response;
        } else {
            Promise.reject();
        }
    },
    (error: AxiosError) => {
        console.log(error);
        return Promise.reject();
    }
);


async function httpProxy<T = any>(config: AxiosRequestConfig): Promise<ResponseData<T>> {
    const resData = await service(config);
    // console.log("res:",resData)
    // console.log("res.data:",resData.data)
    return resData.data;
}

export default httpProxy;

