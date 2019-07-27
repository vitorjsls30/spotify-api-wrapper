import { AUTH_URL, CLIENT_ID, REDIRECT_URI } from './config';

export default function sessionManager() {
  const query_parameters = `client_id=${CLIENT_ID}&response_type=token&redirect_uri=${REDIRECT_URI}&state=123`;

  return {
    authorize: () => window.location.assign(`${AUTH_URL}/authorize?${query_parameters}`)
  };
};