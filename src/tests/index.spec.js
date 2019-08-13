import spotifyApiWrapper from '../index';

global.fetch = require('node-fetch');

const current_token = 'BQCckdNXOiGk1EAlNFiGoonvria0lXkxkrtiWJ0VrlsN16MNAnV8qrgzn20XHA4J8hZ2l4J7uTA6ITQEJA1HYyvEesD1ua';
const expectedHeader = {"headers": {"Accept": "application/json", "Authorization": `Bearer ${current_token}`, "Content-Type": "application/json"}};
const clientId = 'a3909a54308c4cb780b07d305e797cb6';
const redirectUri = 'https://my-spotify-player.com';

const sut = new spotifyApiWrapper({ token: current_token, clientId, redirectUri });

const mockSuccessResponse = 'mocked-data';
const mockJsonPromise = Promise.resolve(mockSuccessResponse);
const mockFetchPromise = Promise.resolve({
  json: () => mockJsonPromise,
});

beforeEach(() => {
  jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);
})

afterEach(() => {
  global.fetch.mockClear();
})

describe('Spotidy API Wrapper', () => {

  it('should be defined', () => {
    expect(sut).toBeInstanceOf(spotifyApiWrapper);
  });

  it('should have initial properties setted', () => {
    expect(sut.clientId).toBeDefined();
    expect(sut.redirectUri).toBeDefined();
  })

  describe('Albums', () => {
    it('should have getAlbum method defined', () => {
      expect(sut.album.getAlbum).toBeDefined();
    });

    it('should have getAlbums method defined', () => {
      expect(sut.album.getAlbums).toBeDefined();
    });

    it('should have getTracks method defined', () => {
      expect(sut.album.getTracks).toBeDefined();
    });

    it('should retrieve album info by ID', (done) => {
      const id = '382ObEPsp2rxGrnsizN5TX';
      sut.album.getAlbum(id)
        .then(data => {
          expect(data).toEqual('mocked-data');
          expect(global.fetch).toHaveBeenCalledWith(`https://api.spotify.com/v1/album/${id}?market=ES`, expectedHeader)
          done();
        });
    });

    it('should retrieve several albums by their IDs', (done) => {
      const ids = ['382ObEPsp2rxGrnsizN5TX', '1A2GTWGtFfWp7KSQTwWOyo', '2noRn2Aes5aoNVsU6iWThc'];
      sut.album.getAlbums(ids)
        .then(data => {
          expect(data).toEqual('mocked-data');
          expect(global.fetch).toHaveBeenCalledWith(`https://api.spotify.com/v1/albums?ids=${ids}&market=ES`, expectedHeader);
          done();
        });
      });
      
      it('should retrieve an album tracks list', (done) => {
        const id = '382ObEPsp2rxGrnsizN5TX';
        sut.album.getTracks(id)
        .then(data => {
          expect(data).toEqual('mocked-data');
          expect(global.fetch).toHaveBeenCalledWith(`https://api.spotify.com/v1/album/${id}/tracks?market=ES`, expectedHeader);
          done();
        });
    });

  });

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
  });

  // TODO - ADD MORE UNIT TESTS RELATED TO SESSION MANAGER CLASS
  describe('OAUTH Session Manager', () => {
    describe('should have authorize method defined', () => {
      expect(sut.session.authorize).toBeDefined();
    });
  });
});
