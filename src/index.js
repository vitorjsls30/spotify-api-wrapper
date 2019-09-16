import album from './album';
import search from './search';
import sessionManager from './sessionManager';
import cacheManager from './cacheManager';

class spotifyApiWrapper {
  constructor(options) {
    this.clientId = options.clientId;
    this.redirectUri = options.redirectUri;

    this.session = sessionManager.getInstance();
    this.session.setAppInfo(options);
    this.cache = cacheManager.getInstance();

    this.album = album();
    this.search = search();
  }
}

export default spotifyApiWrapper;