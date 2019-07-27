import album from './album';
import search from './search';
import sessionManager from './sessionManager';

class spotifyApiWrapper {
  constructor(options) {
    this.token = options.token;

    this.album = album.bind(this)();
    this.search = search.bind(this)();
    this.session = sessionManager();
  }
}

export default spotifyApiWrapper;