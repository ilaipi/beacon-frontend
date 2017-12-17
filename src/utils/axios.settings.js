import axios from 'axios';

import history from './history';
import { checkCookie, getCookie, setCookie } from './Cookie';
import { COOKIE_KEY } from './../config/session';

axios.defaults.withCredentials = true;

axios.interceptors.request.use((config) => {
  const { url } = config;
  if (/^\/api\//.test(url) && !checkCookie(COOKIE_KEY)) { // 含 /api/ 且 没有cookie
    history.push('/login'); // 跳转到登录页
  }
  setCookie(COOKIE_KEY, getCookie(COOKIE_KEY), 1);
  return config
});

axios.interceptors.response.use((response) => {
  // refresh cookie
  const token = getCookie(COOKIE_KEY);
  setCookie(COOKIE_KEY, token, 1);
  return response;
}, (error) => {
  const { response } = error;
  if (response && response.status === 401) {
    history.push('/login'); // 跳转到登录页
  }
  return Promise.reject(response.data);
});

