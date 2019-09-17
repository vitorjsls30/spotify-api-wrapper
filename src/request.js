import sessionManager from './sessionManager';

const curretSession = sessionManager.getInstance();

const request = (url, customHeader) => {
  const defaultHeader = {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${curretSession.getoAuthState('access_token')}`
    }
  };

  const header = customHeader ? customHeader : defaultHeader;
  
  return fetch(url, header)
    .then(data => data.json())
    .catch(err => console.log(`Could not retrive data from API: ${err}`));
}

export default request;