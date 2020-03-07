import { AUTH_URL, CLIENT_ID, REDIRECT_URI } from './config';

let sessionManagerInstance = null;
let query_parameters = null; 
let oAuthState = {
  access_token: '',
  token_type: '',
  expires_in: '',
  received_at: '',
  state: '',
  error: ''
};

class sessionManager {
  static getInstance() {
    if(!sessionManagerInstance) {
      sessionManagerInstance = new sessionManager();
    }
    return sessionManagerInstance;
  }

  getoAuthState(prop) {
    return oAuthState[prop] || undefined;
  }

  setoAuthState(prop, value) {
    oAuthState[prop] = value;
  }

  getQueryParameters() {
    return query_parameters;
  }

  setAppInfo(options) {
    const {clientId, redirectUri} = options;
    oAuthState.clientId = clientId;
    oAuthState.redirectUri = redirectUri;
    query_parameters = `client_id=${clientId}&response_type=token&redirect_uri=${redirectUri}&state=123`;
  }

  authorize() {
    window.location.assign(`${AUTH_URL}/authorize?${query_parameters}`)
  };

  checkTokenExpiration() {
    return Math.floor((Date.now() - oAuthState.received_at) / 1000) > oAuthState.expires_in;
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
        
        oAuthState = { 
          access_token: response_parameters.access_token || '',
          token_type: response_parameters.token_type || '',
          expires_in: Number(response_parameters.expires_in) || 0,
          received_at: Date.now(),
          state: response_parameters.state || '',
        }

        if(window.localStorage) {
          const currentSession = {
            access_token: oAuthState.access_token,
            expires_in: oAuthState.expires_in,
            received_at: oAuthState.received_at
          };
          localStorage.setItem('vs-tkn', JSON.stringify(currentSession));
        }
      }
    }
  }

  getUriParams() {
    const query_params = new URLSearchParams(window.location.search);
    
    if(query_params.has('error')) {
      oAuthState.error = query_params.get('error');   
    } else {
      const location_hash = window.location.hash;
      
      this.setHashParameters(location_hash);
    }

    return oAuthState;
  }
};

export default sessionManager;