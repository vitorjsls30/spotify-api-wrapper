import { API_URL } from './config';
import request from './request';

function album() {
  return {
    getAlbum: () => {},
    getAlbums: (ids) => request(`${API_URL}/albums?ids=${ids}&market=ES`, this.token),
    getTracks: () => {}
  }
}
export default album;