const request = (url, headers) => {
  return fetch(url, headers)
    .then(data => data.json())
    .catch(err => console.log(`Could not retrive data from API: ${err}`));
}

export default request;