import { API_URL } from './config';
import request from './request';

function album() {
  return {
    getAlbum: (id) => request(`${API_URL}/album/${id}?market=ES`),
    getAlbums: (ids) => request(`${API_URL}/albums?ids=${ids}&market=ES`),
    getTracks: (id) => request(`${API_URL}/album/${id}/tracks?market=ES`)
  }
}
export default album;