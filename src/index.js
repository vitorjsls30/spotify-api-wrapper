import album from './album';
import search from './search';
import sessionManager from './sessionManager';

class spotifyApiWrapper {
  constructor(options) {
    this.clientId = options.clientId;
    this.redirectUri = options.redirectUri;

    this.session = sessionManager.getInstance();
    this.session.setAppInfo(options);

    this.album = album();
    this.search = search.bind(this)();
  }
}

export default spotifyApiWrapper;