import album from './album';
import search from './search';
import sessionManager from './sessionManager';
import cacheManager from './cacheManager';

class spotifyApiWrapper {
  constructor(options) {
    const { clientId, redirectUri } = options;
    this.clientId = clientId;
    this.redirectUri = redirectUri;

    this.session = sessionManager.getInstance();
    this.session.setAppInfo(options);
    const { historySize, chosenSize, useLocalStorage } = options;
    this.cache = cacheManager.getInstance({historySize, chosenSize, useLocalStorage});

    this.album = album();
    this.search = search();
  }
}

export default spotifyApiWrapper;