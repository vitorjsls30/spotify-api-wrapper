# Spotify Wrapper

[![CircleCI](https://circleci.com/gh/vitorjsls30/spotify-api-wrapper.svg?style=svg)](https://circleci.com/gh/vitorjsls30/spotify-api-wrapper)

[![Coverage Status](https://coveralls.io/repos/github/vitorjsls30/spotify-api-wrapper/badge.svg?branch=spw-03)](https://coveralls.io/github/vitorjsls30/spotify-api-wrapper?branch=spw-03)

A Wrapper to work with the Spotidy Web API (https://developer.spotify.com/documentation/web-api/)

## Browser Support

This library relies on [Fetch API](https://fetch.spec.whatwg.org/). And this API is supported in the following browsers.

![Chrome](https://cloud.githubusercontent.com/assets/398893/3528328/23bc7bc4-078e-11e4-8752-ba2809bf5cce.png)|![Firefox](https://cloud.githubusercontent.com/assets/398893/3528329/26283ab0-078e-11e4-84d4-db2cf1009953.png) | ![Opera](https://cloud.githubusercontent.com/assets/398893/3528330/27ec9fa8-078e-11e4-95cb-709fd11dac16.png) | ![Safari](https://cloud.githubusercontent.com/assets/398893/3528331/29df8618-078e-11e4-8e3e-ed8ac738693f.png) | ![IE](https://cloud.githubusercontent.com/assets/398893/3528325/20373e76-078e-11e4-8e3a-1cb86cf506f0.png) |
--- | --- | --- | --- | --- |
39+ ✔ | 42+ ✔ | 29+ ✔ | 10.1+ ✔ | Nope ✘ |

## Dependencies
This library depends on [fetch](https://fetch.spec.whatwg.org/) to make requests to the Spotify Web API. For environments that don't support fetch, you'll need to provide a [polyfill](https://github.com/github/fetch) to browser or [polyfill](https://github.com/bitinn/node-fetch) to Node.

## Installation
```sh
$ npm install vs-spotify-api-wrapper --save
```

## How to use

### ES6
```JS
// import wrapper package
import spotifyApiWrapper from 'vs-spotify-wrapper';

// creating new instance
const spotify = new spotifyApiWrapper({
    clientId: 'YOUR_SPOTIFY_CLIENT_ID',
    redirectUri: 'ALLOWED_REDIRECT_URI'
});

// using a method
var albums = spotify.search.query('U2', 'album');
```

### CommonJS
```js
var spotifyWrapper = require('vs-spotify-wrapper');

const spotify = new spotifyApiWrapper({
    clientId: 'YOUR_SPOTIFY_CLIENT_ID',
    redirectUri: 'ALLOWED_REDIRECT_URI'
});

// using a method
var albums = spotify.search.query('U2', 'album');
```

### UMD in Browser
```html
<!--importing library-->
<script src="spotifyApiWrapper.umd.js"></script>
```
After that the library will be avaiable to the Global as `SpotifyWrapper`. Follow an example:
```js
const spotify = new spotifyApiWrapper({
        clientId: 'YOUR_SPOTIFY_CLIENT_ID',
        redirectUri: 'ALLOWED_REDIRECT_URI'
    });
const albums = spotify.search.query('U2', 'album');
```
## Methods
> Follow the mehods that the libray provides

### search.query(query, type)

> Search for a query item for a given type. Test in [Spotify Web Console](https://developer.spotify.com/web-api/console/get-search-item/) with type defined as *album*.
> See more related information at (https://developer.spotify.com/documentation/web-api/reference/search/search/)

**Arguments**

| Argument | Type    | Options           |
|----------|---------|-------------------|
|`query`   |*string* | 'Any search query'|
|`type`    |*string* | 'Album', 'Artist', 'Track' and 'Playlist'|

**Example**

```js
spotify.search.query('U2', 'Album')
  .then(data => {
    // do what you want with the data
  })
```



### album.getAlbum(id)

> Search for informations about a specific Album with provided id. Test in [Spotify Web Console](https://developer.spotify.com/web-api/console/get-album/).

**Arguments**

| Argument | Type    | Options           |
|----------|---------|-------------------|
|`id`   |*string* | 'Specific id'|


**Example**

```js
spotify.album.getAlbum('4aawyAB9vmqN3uQ7FjRGTy')
  .then(data => {
    // do what you want with the data
  })
```

### album.getAlbums(ids)

> Search for informations about some Albums with all id's. Test in [Spotify Web Console](https://developer.spotify.com/web-api/console/get-several-albums/).

**Arguments**

| Argument | Type    | Options           |
|----------|---------|-------------------|
|`ids`   |*Array of strings* | ['id1', 'id2']|

**Example**

```js
spotify.album.getAlbums(['4aawyAB9vmqN3uQ7FjRGTy', '1A2GTWGtFfWp7KSQTwWOyo'])
  .then(data => {
    // do what you want with the data
  })
```

### album.getTracks(id)

> Search for all tracks in a specific Album with provided id. Test in [Spotify Web Console](https://developer.spotify.com/web-api/console/get-album-tracks/).

**Arguments**

| Argument | Type    | Options           |
|----------|---------|-------------------|
|`id`   |*string* | 'Specific id'|

**Example**

```js
spotify.album.getTracks('4aawyAB9vmqN3uQ7FjRGTy')
  .then(data => {
    // do what you want with the data
  })
```

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/vitorjsls30/spotify-api-wrapper/tags).

## Authors

| ![Vitor José](https://avatars2.githubusercontent.com/u/6750855?v=3&s=150)|
|:---------------------:|
|  [Vitor José](https://github.com/willianjusten/)   |

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
