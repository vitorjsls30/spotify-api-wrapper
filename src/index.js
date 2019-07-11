import album from './album';

class spotifyApiWrapper {
  constructor(options) {
    this.token = options.token;

    this.album = album.bind(this)();
  }
}

export default spotifyApiWrapper;