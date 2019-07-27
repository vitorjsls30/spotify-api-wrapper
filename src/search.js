import request from './request';
import { API_URL } from './config';

function search() {
  const headers = {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${this.token}`
    }
  }
  return {
    query: (query, type) => request(`${API_URL}/search?q=${query}&type=${type}`, headers)
  };
};

export default search;