import sessionManager from '../sessionManager';
import { AUTH_URL } from '../config';

const clientId = 'a3909a54308c4cb780b07d305e797cb6';
const redirectUri = 'https://my-spotify-player.com';
const query_parameters = `client_id=${clientId}&response_type=token&redirect_uri=${redirectUri}&state=123`;
const { location } = window;

let sut;

beforeEach(() => {
  sut = sessionManager.getInstance();
});

afterEach(() => {
  window.location = location;
});

describe('OAUTH', () => {

  it('should set the client application information', () => {
    sut.setAppInfo({ clientId, redirectUri });

    expect(sut.oAuthState.clientId).toEqual(clientId);
    expect(sut.oAuthState.redirectUri).toEqual(redirectUri);
  });

  it('should require authorize URL', (done) => {
    window.location.assign = jest.fn();
    sut.authorize();
    expect(window.location.assign).toHaveBeenCalledWith(`${AUTH_URL}/authorize?${query_parameters}`);
    done();
  });

  it('should get authentication parameters after user redirected to redirect_uri', (done) => {
    window.location.hash = `#access_token=MOCKED-TOKEN&token_type=Bearer&expires_in=3600&state=123`;

    sut.getUriParams();

    expect(sut.oAuthState.access_token).toBeDefined();
    expect(sut.oAuthState.token_type).toEqual('Bearer');
    expect(sut.oAuthState.expires_in).toBeGreaterThan(0);
    expect(sut.oAuthState.state).toEqual('123');

    done();
  });

  it('should return error code if user denies access', (done) => {
    delete window.location;
    window.location = { search: '?error=access_denied&state=123'};
    
    sut.getUriParams();

    expect(sut.oAuthState.error).toEqual('access_denied');

    done();
  });

  it('should check token expiration time', (done) => {
    window.location.hash = `#access_token=MOCKED-TOKEN&token_type=Bearer&expires_in=1&state=123`;
    
    sut.getUriParams();

    setTimeout(function() {
      expect(sut.checkTokenExpiration()).toEqual(true);
      done();
    }, 2000);
  });

});