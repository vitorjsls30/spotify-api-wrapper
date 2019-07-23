import request from './request';
import { API_URL } from './config';

function search() {
  return {
    query: (query, type) => request(`${API_URL}/search?q=${query}&type=${type}`, this.token)
  };
};

export default search;