import axios from "axios";

const BACKEND_URL = `https://a83bd78afaa1.ngrok.io/`;
// const BACKEND_URL = `http://localhost:50110`;
const REQUEST_TIMEOUT = 10000;

export const createAPI = () => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  const onSuccess = (response) => response;

  const onFail = (err) => {
    throw err;
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};
