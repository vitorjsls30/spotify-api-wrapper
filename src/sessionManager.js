import { AUTH_URL, CLIENT_ID, REDIRECT_URI } from './config';

export default class sessionManager {
  constructor(options) {
    const {clientId, redirectUri} = options;

    this.query_parameters = `client_id=${clientId}&response_type=token&redirect_uri=${redirectUri}&state=123`; 
    this.oAuthState = {
      access_token: '',
      token_type: '',
      expires_in: '',
      received_at: '',
      state: '',
      error: ''
    }
  }
  
  authorize() {
    window.location.assign(`${AUTH_URL}/authorize?${this.query_parameters}`)
  };

  checkTokenExpiration() {
    return Date.now() - this.oAuthState.received_at > this.oAuthState.expires_in;
  }

  reduceParameters(acc, curr) {
    const splitted_param = curr.split('=');
    let current_property = {};
    current_property[splitted_param[0]] = splitted_param[1];

    return acc = {...acc, ...current_property};
  }

  setHashParameters(hash) {
    if (hash != '') {
      let response_parameters = '';
      let hash_parameters = hash.substr(1).split('&');

      if(hash_parameters.length > 0) {
        response_parameters = hash_parameters.reduce(this.reduceParameters, {});
        
        this.oAuthState = { 
          access_token: response_parameters.access_token || '',
          token_type: response_parameters.token_type || '',
          expires_in: Number(response_parameters.expires_in) || 0,
          received_at: Date.now(),
          state: response_parameters.state || '',
        }
      }
    }
  }

  getUriParams() {
    const query_params = new URLSearchParams(window.location.search);
    
    if(query_params.has('error')) {
      this.oAuthState.error = query_params.get('error');   
    } else {
      const location_hash = window.location.hash;
      
      this.setHashParameters(location_hash);
    }

    return this.oAuthState;
  }
};