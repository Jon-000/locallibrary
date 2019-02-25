

import axios from 'axios';

const api_base_url = "http://127.0.0.1:8081/"

const apiA = axios.create({
  baseURL: api_base_url
})

export default apiA;