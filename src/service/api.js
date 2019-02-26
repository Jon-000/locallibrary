

import axios from 'axios';
import Cookie from 'js-cookie';

const api_base_url = "http://127.0.0.1:8081/"

const apiA = axios.create({
  baseURL: api_base_url,
})

apiA.defaults.headers.common['Authorization'] = 'Bearer ' + Cookie.get('jwt_token');

export default apiA;