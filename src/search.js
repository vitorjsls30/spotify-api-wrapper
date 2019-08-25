import request from './request';
import cacheManager from './cacheManager';
import { API_URL } from './config';

function search() {
  const currentCache = cacheManager.getInstance();
  return {
    query: (query, type) => {
      return request(`${API_URL}/search?q=${query}&type=${type}`)
        .then(data => {
          currentCache.storeItem({search: query, type, items: data.items || []});
          return data;
        });
    }
  };
};

export default search;