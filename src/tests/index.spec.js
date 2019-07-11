import { expect } from 'chai';
import sinon from 'sinon';
import spotifyApiWrapper from '../index';

// global.fetch = require('node-fetch');

const current_token = 'BQCSuZcJ173XPQc3YJuDg5M3QsTR7wVzvlpwI6I5bJVLD8DeKhpit4fEZGlXysg9A3LX8i-zjMV4V0KY6XYT6YZ8NU2iSZMeEmuB__k_2RTwV7CiZABFV4Q_HBOTS3Mj18r4asZxKP5KIE-h';
const sut = new spotifyApiWrapper({token: current_token});

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

    it('should retrieve several albums by their IDs', () => {
      expect(sut.album.getAlbums(['41MnTivkwTO3UUJ8DrqEJJ','6JWc4iAiJ9FjyK0B59ABb4','6UXCm6bOO4gFlDQZV5yL37']).albums.length).to.have.lengthOf(3);
    })
  })

});
