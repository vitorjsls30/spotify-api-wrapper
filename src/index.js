import album from './album';
import search from './search';

class spotifyApiWrapper {
  constructor(options) {
    this.token = options.token;

    this.album = album.bind(this)();
    this.search = search.bind(this)();
  }
}

export default spotifyApiWrapper;