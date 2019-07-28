import sessionManager from '../sessionManager';
import { AUTH_URL, CLIENT_ID, REDIRECT_URI } from '../config';

const query_parameters = `client_id=${CLIENT_ID}&response_type=token&redirect_uri=${REDIRECT_URI}&state=123`;

beforeEach(() => {
  window.location.assign = jest.fn();
})

const sut = new sessionManager();

describe('OAUTH', () => {
  it('should require authorize URL', (done) => {
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
});