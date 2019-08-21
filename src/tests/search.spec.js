import spotifyApiWrapper from '../index';

global.fetch = require('node-fetch');

const clientId = 'a3909a54308c4cb780b07d305e797cb6';
const redirectUri = 'https://my-spotify-player.com';

const sut = new spotifyApiWrapper({ clientId, redirectUri });

const mockSuccessResponse = 'mocked-data';
const mockJsonPromise = Promise.resolve(mockSuccessResponse);
const mockFetchPromise = Promise.resolve({
  json: () => mockJsonPromise,
});

beforeEach(() => {
  sut.session.oAuthState.access_token = 'BQCckdNXOiGk1EAlNFiGoonvria0lXkxkrtiWJ0VrlsN16MNAnV8qrgzn20XHA4J8hZ2l4J7uTA6ITQEJA1HYyvEesD1ua';
  jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);
})

afterEach(() => {
  global.fetch.mockClear();
})

describe('Spotidy API Wrapper - Search', () => {
  describe('Search', () => {
    it('should have search method defined', () => {
      expect(sut.search).toBeDefined();
    });

    it('should search a given artist', (done) => {
      const query = 'mock-artist';
      const type = 'artist';
      const current_token = sut.session.oAuthState.access_token;
      const expectedHeader = {"headers": {"Accept": "application/json", "Authorization": `Bearer ${current_token}`, "Content-Type": "application/json"}};
      sut.search.query(query, type)
        .then(data => {
          expect(data).toEqual('mocked-data');
          expect(global.fetch).toHaveBeenCalledWith(`https://api.spotify.com/v1/search?q=${query}&type=${type}`, expectedHeader);
          done();
        });
    });

    it('should search a given album', (done) => {
      const query = 'mock-album';
      const type = 'album';
      const current_token = sut.session.oAuthState.access_token;
      const expectedHeader = {"headers": {"Accept": "application/json", "Authorization": `Bearer ${current_token}`, "Content-Type": "application/json"}};
      sut.search.query(query, type)
        .then(data => {
          expect(data).toEqual('mocked-data');
          expect(global.fetch).toHaveBeenCalledWith(`https://api.spotify.com/v1/search?q=${query}&type=${type}`, expectedHeader);
          done();
        });
    });

    it('should search a given track', (done) => {
      const query = 'mock-track';
      const type = 'track';
      const current_token = sut.session.oAuthState.access_token;
      const expectedHeader = {"headers": {"Accept": "application/json", "Authorization": `Bearer ${current_token}`, "Content-Type": "application/json"}};
      sut.search.query(query, type)
        .then(data => {
          expect(data).toEqual('mocked-data');
          expect(global.fetch).toHaveBeenCalledWith(`https://api.spotify.com/v1/search?q=${query}&type=${type}`, expectedHeader);
          done();
        });
    });
  });
});
