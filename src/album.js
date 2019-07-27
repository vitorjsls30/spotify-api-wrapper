import { API_URL } from './config';
import request from './request';

function album() {
  const headers = {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${this.token}`
    }
  }
  return {
    getAlbum: (id) => request(`${API_URL}/album/${id}?market=ES`, headers),
    getAlbums: (ids) => request(`${API_URL}/albums?ids=${ids}&market=ES`, headers),
    getTracks: (id) => request(`${API_URL}/album/${id}/tracks?market=ES`, headers)
  }
}
export default album;