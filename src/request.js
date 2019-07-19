const request = (url, token) => {
  const headers = {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`
    }
  }

  return fetch(url, headers)
    .then(data => data.json())
    .catch(err => console.log(`Could not retrive data from API: ${err}`));
}

export default request;