import { API_URL } from './config';
import request from './request';
import sessionManager from './sessionManager';

function album() {
  const current_session = sessionManager.getInstance();
  const custom_header = {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: ''
    }
  }

  return {
    getAlbum: (id) => {
      custom_header.headers.Authorization = `Bearer ${current_session.oAuthState.access_token}`;
      return request(`${API_URL}/album/${id}?market=ES`, custom_header)
    },
    getAlbums: (ids) => {
      custom_header.headers.Authorization = `Bearer ${current_session.oAuthState.access_token}`;
      return request(`${API_URL}/albums?ids=${ids}&market=ES`, custom_header)
    },
    getTracks: (id) => {
      custom_header.headers.Authorization = `Bearer ${current_session.oAuthState.access_token}`;
      return request(`${API_URL}/album/${id}/tracks?market=ES`, custom_header)
    }
  }
}
export default album;