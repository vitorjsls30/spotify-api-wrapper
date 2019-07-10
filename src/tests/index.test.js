import spotifyApiWrapper from '../index';

const sut = new spotifyApiWrapper();

describe('Spotidy API Wrapper', () => {
  test('should be defined', () => {
    expect(sut).toBeDefined();
  });
  
  describe('Albums', () => {
    test('should have getAlbum method defined', () => {
      expect(sut.album.getAlbum).toBeDefined();
    });

    test('should have getAlbums method defined', () => {
      expect(sut.album.getAlbum).toBeDefined();
    });

    test('should have getTracks method defined', () => {
      expect(sut.album.getAlbum).toBeDefined();
    });
  })

});
