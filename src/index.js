import album from './album';
import search from './search';
import sessionManager from './sessionManager';

class spotifyApiWrapper {
  constructor(options) {
    this.token = options.token;
    this.clientId = options.clientId;
    this.redirectUri = options.redirectUri;

    this.album = album.bind(this)();
    this.search = search.bind(this)();

    const { clientId, redirectUri } = options; 
    this.session = new sessionManager({ clientId, redirectUri });
  }
}

export default spotifyApiWrapper;