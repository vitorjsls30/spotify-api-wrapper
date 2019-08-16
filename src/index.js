import album from './album';
import search from './search';
import sessionManager from './sessionManager';

class spotifyApiWrapper {
  constructor(options) {
    this.token = options.token;
    this.clientId = options.clientId;
    this.redirectUri = options.redirectUri;

    this.session = sessionManager;
    this.session.setAppInfo(options);

    this.album = album.bind(this)();
    this.search = search.bind(this)();
  }
}

export default spotifyApiWrapper;