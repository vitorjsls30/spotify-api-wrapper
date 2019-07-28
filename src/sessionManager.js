import { AUTH_URL, CLIENT_ID, REDIRECT_URI } from './config';

export default class sessionManager {
  constructor() {
    this.query_parameters = `client_id=${CLIENT_ID}&response_type=token&redirect_uri=${REDIRECT_URI}&state=123`; 
    this.oAuthState = {
      access_token: '',
      token_type: '',
      expires_in: '',
      state: '',
    }
  }
  
  authorize() {
    window.location.assign(`${AUTH_URL}/authorize?${this.query_parameters}`)
  };

  getUriParams() {
    const location_hash = window.location.hash;
    let response_parameters = '';
    
    if (location_hash != '') {
      let hash_parameters = location_hash.substr(1).split('&');

      if(hash_parameters.length > 0) {
        response_parameters = hash_parameters.reduce((acc, curr) => {
          const splitted_param = curr.split('=');
          let current_property = {};
          current_property[splitted_param[0]] = splitted_param[1];
        
          return acc = {...acc, ...current_property};
        }, {});
        
        this.oAuthState = { 
          access_token: response_parameters.access_token || '',
          token_type: response_parameters.token_type || '',
          expires_in: Number(response_parameters.expires_in) || 0,
          state: response_parameters.state || '',
        }
      }
    }
    return this.oAuthState;
  }
};