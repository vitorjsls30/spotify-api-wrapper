import { expect } from 'chai';
import sinon from 'sinon';
import spotifyApiWrapper from '../index';

const current_token = 'BQAV30hbuiURWkrfWVJkfGXQqhnoVEQUr7HMGYHCZP84M6VtPRiVOg7nPS535RhWQ7U7ds7weDBEGh9V7Jj-PK-vAU2F-0sgifo2BlvTa7coPA8kzfwPQBe_2tByvlLFb0kkbCbobvxDVjWq';

const sut = new spotifyApiWrapper({ token: current_token });

describe('Spotidy API Wrapper', () => {

  let stubedFetch;
  let promise;

  // beforeEach(() => {
  //   stubedFetch = sinon.stub(global, 'fetch');
  //   promise = stubedFetch.resolvesThis();

  // });

  // afterEach(() => {
  //   stubedFetch.restore();
  // })

  it('should be defined', () => {
    expect(sut).to.be.an.instanceOf(spotifyApiWrapper);
  });

  context('Albums', () => {
    it('should have getAlbum method defined', () => {
      expect(sut.album.getAlbum).to.exist;
    });

    it('should have getAlbums method defined', () => {
      expect(sut.album.getAlbum).to.exist;
    });

    it('should have getTracks method defined', () => {
      expect(sut.album.getAlbum).to.exist;
    });

    it('should retrieve several albums by their IDs', (done) => {
      sut.album.getAlbums(['382ObEPsp2rxGrnsizN5TX', '1A2GTWGtFfWp7KSQTwWOyo', '2noRn2Aes5aoNVsU6iWThc'])
        .then(data => {
          expect(data.albums).to.have.lengthOf(3);
          done();
        });
    })
  })

});
