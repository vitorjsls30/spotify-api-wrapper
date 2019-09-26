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
import spotifyApiWrapper from 'vs-spotify-api-wrapper';

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
var spotifyApiWrapper = require('vs-spotify-api-wrapper');

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
After that the library will be avaiable to the Global as `spotifyApiWrapper`. Follow an example:
```js
const spotify = new spotifyApiWrapper({
        clientId: 'YOUR_SPOTIFY_CLIENT_ID',
        redirectUri: 'ALLOWED_REDIRECT_URI'
    });
const albums = spotify.search.query('U2', 'album');
```
## Session Management
To perform requests to the spotify API Endpoints an Access Token must be provided and to facilitate this process the Wrapper has a module responsible for dealing with this. The **sessionManager** Module offers a group of methods that can be used to not only request authentication but also parse the necessary response parameters provided by the spotify API.
The authentication mode adopted was the **Implicit Grant Flow**. More information can be found at: (https://developer.spotify.com/documentation/general/guides/authorization-guide/#implicit-grant-flow).

### Main Functionality
Before you can request any information from the Spotify API an Access Token is required and to obtain one, the user must grant access to his information through the Spotify API OAuth Authentication Flow. As the Access Token is received it is stored by the wrapper and used in future requests alongside with it's expiration period. After it expires, another token must be provided.
The following steps must be met before any request to the API is made:
* Request the user authorization (session.authorize() method)
* Parse the received hash parameters after the Spotify API Authorization redirects the user back to your application (session.getUriParams() method)

After these two steps, the requests can be made to the Spotify API using the provided methods.
In the following Methods Section more details can be found related with the **sessionManager** available methods.


## Cache Management
Another feature is the **cacheManager** Module. With this is possible to cache the latest performed searchs and also the items chose by the user in your implementation. After performing a **search** operation, the query used is automatically stored at the search history alongside with it's response, if any, from the spotify API.
User choices among the returned items can also be stored and they also contain related information like which query term was used, the item name itself and so on. Check the **Methods** section to see related information about the available methods.

### Main Functionality
When you perform a search using the **"search.query"** method two operations take place:
1. Before the request is sent to the Spotify Api, the current access token retrieved previously has it's expiration period checked, if so, the user is automatically redirected to the Spotify API Authorization Page and a new permission will be requested.
2. If the Current Access Token is valid, the search continues and if it's sucessful, the result is automatically cached using the "cache.storeItem" method. An item has the following structure:
```js
{ search: ‘THE_SEARCHED_STRING’, type: ‘THE_REQUEST_TYPE’, response: [{…}, {…}] }
```
Where:
* search: Refers to the searched string provided by the user
* type: Refers to the spotify resource type being searched for: Album, Artist, Track or Playlist
* response: The actual Spotify Api response. Usually a list of Objects

In the following **Methods Section** a list with all the sessionManager methods will be provided

## Methods
> Follow the mehods that the libray provides
### Search Module:
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
### Album Module:
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
### Cache Manager Module:
### cache.setOption('option', value)
> Sets an option value

**Arguments**

| Argument | Type    | Options           |
|----------|---------|-------------------|
|`option_name`   |*string* | 'historySize', 'chosenSize'|

**Options Available**
* **historySize**: Sets the maximum size of the list that stores the searched items
* **chosenSize**: Sets the maximum size of the list that stores the items chosen by the user

**Example**
```js
spotify.cache.setOptions('historySize', 3);
```

### cache.storeItem(item)
> Stores an item received from a previous request to the spotify API into the cache list
> For a full list of the data model for each resource returned check: (https://developer.spotify.com/documentation/web-api/reference/object-model/)

**Arguments**

| Argument | Type    | Object Structure           |
|----------|---------|-------------------|
|`item`   |*object* | { search: 'searched_string', type: 'album', response: [{...}, {...}] }|

**Item Structure**
* **search**: The searched string by the user
* **type**: The type of the performed search ('album', 'artist', 'track' or 'playist')
*  **response**: The spotify API response, usually an Array of Objects

**Example**
```js
spotify.cache.storeItem({ search: 'u2', type: 'album', response: {[...]} });
```

### cache.storeChoice(choice)
> Stores an item received from a previous request to the spotify API into the Chosen Items Cache list

**Arguments**

| Argument | Type    | Object Structure           |
|----------|---------|-------------------|
|`choice`   |*object* | { search: 'some_random_search', type: 'album', response: [{...}, {...}] }|

**Item Structure**
* **search**: The searched string by the user that originated the choice item as a response
* **name**: The item name string chose by the user
* **id**: The spotify API resource ID provided in the request response
* **type**: The type of the performed search ('album', 'artist', 'track' or 'playist')

**Example**
```js
spotify.cache.storeChoice({ search: 'original-searched-item',
    name: 'chosen-album-name',
    id: 'some-random-album-id',
    type: 'album' });
```

### cache.getCachedData(query)
> Get the items stored at the Cache List related with the query provided

**Arguments**

| Argument | Type    | Options           |
|----------|---------|-------------------|
|`query`   |*string* | 'some string to search by'|

**Parameter description**
* **query**: A string that may be present at the Cache List in the 'search' field of a Stored Item

**Example**
```js
spotify.cache.getCachedData('my_previous_query_value');
```

### cache.getCachedChoiceData(choice)
> Get the item stored at the Choices Cache List related with the provided Choice Item

**Arguments**

| Argument | Type    | Object Structure           |
|----------|---------|-------------------|
|`choice`   |*object* | { search: 'original-search', name: 'item-name', id: 'spotify-item-id', type: 'album' }|

**Item Structure**
* **search**: The searched string by the user that originated this item as a response
* **name**: The item name string chose by the user
* **id**: The spotify API resource ID provided in the request response
* **type**: The type of the performed search ('album', 'artist', 'track' or 'playist')

**Example**
```js
const choice = { search: 'original-search', name: 'album-name', id: 'random-id', type: 'album' };
spotify.cache.getCachedChoiceData(choice);
```

### cache.getHistory()
> Gets the full Cached List of searched items

**Example**
```js
const history = spotify.cache.getHistory();
```
**Response Structure**
The data returned is an Array of Objects that represents the searched history
```js
[{ search: 'first_search', type: 'album', response: {} }, { search: 'second_search', type: 'track', response: {} }, ...]
```

### cache.getChosenAbums()
> Gets the full Cached List of Chosen Items by the User

**Example**
```js
const choices = spotify.cache.getChosenAlbums();
```
**Response Structure**
The data returned is an Array of Objects that represents the items chosen by the user
```js
[{ search: 'original-search', name: 'album-name', id: 'random-id', type: 'album' }, { search: 'another-search', name: 'chosen-track-name', id: 'another-random-id', type: 'track' }, ...]
```

### Session Manager Module
### session.authorize()
> Redirects the user to the Spotify API Authorization Page where he is requested to grant/deny access to his data

**Example**
```js
spotify.session.authorize();
```
### session.getUriParams()
> Fetches the hash parameters included at url that the user is redirected after granting the App Permission

**Example**
```js
spotify.session.getUriParams();
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
