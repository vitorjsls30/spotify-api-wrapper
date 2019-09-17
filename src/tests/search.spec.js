import spotifyApiWrapper from '../index';
import { AUTH_URL } from '../config';

global.fetch = require('node-fetch');

const { location } = window;

const clientId = 'a3909a54308c4cb780b07d305e797cb6';
const redirectUri = 'https://my-spotify-player.com';
const mocked_access_token = 'BQCckdNXOiGk1EAlNFiGoonvria0lXkxkrtiWJ0VrlsN16MNAnV8qrgzn20XHA4J8hZ2l4J7uTA6ITQEJA1HYyvEesD1ua';
const expectedHeader = {"headers": {"Accept": "application/json", "Authorization": `Bearer ${mocked_access_token}`, "Content-Type": "application/json"}};

const sut = new spotifyApiWrapper({ clientId, redirectUri });

const mockSuccessResponse = 'mocked-data';
const mockJsonPromise = Promise.resolve(mockSuccessResponse);
const mockFetchPromise = Promise.resolve({
  json: () => mockJsonPromise,
});

beforeEach(() => {
  window.location.hash = `#access_token=${mocked_access_token}&token_type=Bearer&expires_in=3600&state=123`;
  sut.session.getUriParams();
  jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);
})

afterEach(() => {
  window.location = location;
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
      sut.search.query(query, type)
        .then(data => {
          expect(data).toEqual('mocked-data');
          expect(global.fetch).toHaveBeenCalledWith(`https://api.spotify.com/v1/search?q=${query}&type=${type}`, expectedHeader);
          done();
        });
    });

    it('should redirect user to renew token if it has expired', (done) => {
      const query = 'mock-album';
      const type = 'album';
      const current_query_parameters = sut.session.query_parameters;
      const expected_assign = `${AUTH_URL}/authorize?${current_query_parameters}`;

      window.location.assign = jest.fn();

      sut.session.oAuthState.expires_in = 1;
      sut.session.oAuthState.received_at = Date.now();
      
      setTimeout(function(){
        sut.search.query(query, type);
        expect(window.location.assign).toHaveBeenCalledWith(expected_assign);
        done();
      }, 2000);
    });

  });
});
