import { API_URL } from './config';
import request from './request';

function album() {
  return {
    getAlbum: (id) => request(`${API_URL}/album/${id}?market=ES`, this.token),
    getAlbums: (ids) => request(`${API_URL}/albums?ids=${ids}&market=ES`, this.token),
    getTracks: () => {}
  }
}
export default album;