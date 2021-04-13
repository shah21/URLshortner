/* Axios configuration */
import axios from "axios";



// const host =  process.env.HOST || 'https://challenge01.herokuapp.com';
const BASE_URL = 'https://urlshortner01.azurewebsites.net';

/* instance for normal json request */
const axiosInstance =  axios.create({
    baseURL:BASE_URL,
    headers: {
        "Content-Type": "application/json"
    },
});


export default axiosInstance;