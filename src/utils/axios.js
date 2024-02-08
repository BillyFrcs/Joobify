import axios from "axios";

const axiosInstance = axios.create({
    baseURL: process.env.JOOBIFY_ENDPOINT,
    headers: {
        "Content-Type": "application/json",
    }
});

/*
// Add a request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        // You can do something with the request before it is sent
        // For example, add authentication token
        // config.headers.Authorization = `Bearer ${getToken()}`;
        return config;
    },
    (error) => {
        // Handle request error
        return Promise.reject(error);
    }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        // You can do something with the response data
        return response;
    },
    (error) => {
        // Handle response error
        return Promise.reject(error);
    }
);
*/

export default axiosInstance;