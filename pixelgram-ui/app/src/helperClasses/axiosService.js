import axios from 'axios';
//import { getCookie_Token } from './LocalStorage';

// axios.defaults.baseURL = process.env.REACT_APP_SERVICE_PATH;

// console.log('base url', process.env.REACT_APP_SERVICE_PATH)

// axios.interceptors.request.use(config => {
//     console.log("request ", config);
//     // if (config.url === 'api/user/login' || config.url === 'api/user/signup') {
//     //     return config;
//     // }
//     // const token = getCookie_Token();
//     // if (token) {
//     //     config.headers.Authorization = token;

//     //     return config;
//     // }
//     // else {
//     //     throw new axios.Cancel('Token not found,operation canceled.');
//     // }
// }, err => {
//     console.log('request err', err);
// });

export default axios;