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

});
