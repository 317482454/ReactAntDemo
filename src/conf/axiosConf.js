import axios from 'axios'

axios.defaults.baseURL = "http://localhost:8000/"//api前缀


const instance = axios.create({
});

instance.interceptors.request.use(function (config) {
  return config;
}, function (error) {
  return Promise.reject(error);
});

instance.interceptors.response.use(function (response) {
  return response.data
}, function (error) {
  return Promise.reject(error);
});
export default instance;
