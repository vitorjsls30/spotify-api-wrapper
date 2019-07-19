import spotifyApiWrapper from '../index';

global.fetch = require('node-fetch');

const current_token = 'BQBRGzhokcNry36r4y-HlrevKmLdwx5hwU1nhDEEzXHuSRT0qfhxW20ChaPWrjB_occApL1PJam7vWbkGjqAeTEZnHkOXg0PVOG0wEo47PmgK2A3xplk7pBX10Yq8mMTMZFik4xmGiKY2DYm';
const sut = new spotifyApiWrapper({ token: current_token });

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

  describe('Albums', () => {
    it('should have getAlbum method defined', () => {
      expect(sut.album.getAlbum).toBeDefined();
    });

    it('should have getAlbums method defined', () => {
      expect(sut.album.getAlbum).toBeDefined();
    });

    it('should have getTracks method defined', () => {
      expect(sut.album.getAlbum).toBeDefined();
    });

    it('should retrieve several albums by their IDs', (done) => {
      const ids = ['382ObEPsp2rxGrnsizN5TX', '1A2GTWGtFfWp7KSQTwWOyo', '2noRn2Aes5aoNVsU6iWThc'];
      const expectedHeader = {"headers": {"Accept": "application/json", "Authorization": "Bearer BQBRGzhokcNry36r4y-HlrevKmLdwx5hwU1nhDEEzXHuSRT0qfhxW20ChaPWrjB_occApL1PJam7vWbkGjqAeTEZnHkOXg0PVOG0wEo47PmgK2A3xplk7pBX10Yq8mMTMZFik4xmGiKY2DYm", "Content-Type": "application/json"}};
      sut.album.getAlbums(ids)
        .then(data => {
          expect(data).toEqual('mocked-data');
          expect(global.fetch).toHaveBeenCalledWith(`https://api.spotify.com/v1/albums?ids=${ids}&market=ES`, expectedHeader);
          done();
        });
    })
  })

});
