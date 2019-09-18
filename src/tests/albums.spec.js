import spotifyApiWrapper from '../index';

global.fetch = require('node-fetch');

const clientId = 'a3909a54308c4cb780b07d305e797cb6';
const redirectUri = 'https://my-spotify-player.com';

const mockSuccessResponse = 'mocked-data';
const mockJsonPromise = Promise.resolve(mockSuccessResponse);
const mockFetchPromise = Promise.resolve({
  json: () => mockJsonPromise,
});

const sut = new spotifyApiWrapper({ clientId, redirectUri });

beforeEach(() => {
  sut.session.setoAuthState('access_token', 'BQCckdNXOiGk1EAlNFiGoonvria0lXkxkrtiWJ0VrlsN16MNAnV8qrgzn20XHA4J8hZ2l4J7uTA6ITQEJA1HYyvEesD1ua');
  jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);
})

afterEach(() => {
  global.fetch.mockClear();
})

describe('Spotidy API Wrapper - Albums', () => {

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
      const current_token = sut.session.getoAuthState('access_token');
      const expectedHeader = {"headers": {"Accept": "application/json", "Authorization": `Bearer ${current_token}`, "Content-Type": "application/json"}};

      sut.album.getAlbum(id)
        .then(data => {
          expect(data).toEqual('mocked-data');
          expect(global.fetch).toHaveBeenCalledWith(`https://api.spotify.com/v1/albums/${id}?market=ES`, expectedHeader)
          done();
        });
    });

    it('should retrieve several albums by their IDs', (done) => {
      const ids = ['382ObEPsp2rxGrnsizN5TX', '1A2GTWGtFfWp7KSQTwWOyo', '2noRn2Aes5aoNVsU6iWThc'];
      const current_token = sut.session.getoAuthState('access_token');
      const expectedHeader = {"headers": {"Accept": "application/json", "Authorization": `Bearer ${current_token}`, "Content-Type": "application/json"}};

      sut.album.getAlbums(ids)
        .then(data => {
          expect(data).toEqual('mocked-data');
          expect(global.fetch).toHaveBeenCalledWith(`https://api.spotify.com/v1/albums?ids=${ids}&market=ES`, expectedHeader);
          done();
        });
      });
      
      it('should retrieve an album tracks list', (done) => {
        const id = '382ObEPsp2rxGrnsizN5TX';
        const current_token = sut.session.getoAuthState('access_token');
        const expectedHeader = {"headers": {"Accept": "application/json", "Authorization": `Bearer ${current_token}`, "Content-Type": "application/json"}};

        sut.album.getTracks(id)
        .then(data => {
          expect(data).toEqual('mocked-data');
          expect(global.fetch).toHaveBeenCalledWith(`https://api.spotify.com/v1/albums/${id}/tracks?market=ES`, expectedHeader);
          done();
        });
    });

  });

});
