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

    expect(sut.getoAuthState('clientId')).toEqual(clientId);
    expect(sut.getoAuthState('redirectUri')).toEqual(redirectUri);
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

    expect(sut.getoAuthState('access_token')).toBeDefined();
    expect(sut.getoAuthState('token_type')).toEqual('Bearer');
    expect(sut.getoAuthState('expires_in')).toBeGreaterThan(0);
    expect(sut.getoAuthState('state')).toEqual('123');

    done();
  });

  it('should return error code if user denies access', (done) => {
    delete window.location;
    window.location = { search: '?error=access_denied&state=123'};
    
    sut.getUriParams();

    expect(sut.getoAuthState('error')).toEqual('access_denied');

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

  it('should store the current access token', () => {
    window.location.hash = `#access_token=MOCKED-TOKEN&token_type=Bearer&expires_in=1&state=123`;
    sut.getUriParams();

    const previousToken = JSON.parse(localStorage.getItem('vs-tkn'));
    expect(previousToken).toBeDefined();
    expect(previousToken).toHaveProperty('access_token');
    expect(previousToken).toHaveProperty('expires_in');
    expect(previousToken).toHaveProperty('received_at');
    expect(previousToken.access_token).toBe('MOCKED-TOKEN');
    expect(previousToken.expires_in).toBe(1);
    expect(typeof previousToken.received_at).toBe('number');
  });

});3