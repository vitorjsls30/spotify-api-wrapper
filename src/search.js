import request from './request';
import cacheManager from './cacheManager';
import sessionManager from './sessionManager';
import { API_URL } from './config';

function search() {
  const currentCache = cacheManager.getInstance();
  const currentSession = sessionManager.getInstance();
  return {
    query: (query, type) => {
      if(currentSession.checkTokenExpiration()) {
        currentSession.authorize();
        return;
      }
      return request(`${API_URL}/search?q=${query}&type=${type}`)
        .then(data => {
          currentCache.storeItem({search: query, type, response: data || {}});
          return data;
        });
    }
  };
};

export default search;