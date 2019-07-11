import fetch from 'node-fetch';

const request = (url, token) => {
  const headers = {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`
    }
  }

  fetch(url, headers)
    .then(data => data.json())
    .catch(err => console.log(`Could not retrive data from API: ${err}`));
}

export default request;