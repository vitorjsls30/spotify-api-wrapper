import sessionManager from '../sessionManager';
import { AUTH_URL, CLIENT_ID, REDIRECT_URI } from '../config';

const query_parameters = `client_id=${CLIENT_ID}&response_type=token&redirect_uri=${REDIRECT_URI}&state=123`;

beforeEach(() => {
  window.location.assign = jest.fn();
})

const sut = sessionManager();

describe('OAUTH', () => {
  it('should require authorize URL', (done) => {
    sut.authorize();
    expect(window.location.assign).toHaveBeenCalledWith(`${AUTH_URL}/authorize?${query_parameters}`);
    done();
  });
});