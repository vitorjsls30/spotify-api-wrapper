import cacheManager from '../cacheManager';

let sut;

beforeEach(() => {
  sut = cacheManager.getInstance();
});

afterEach(() => {
  sut.cleanHistory();
});

fdescribe(`Cache Manager`, () => {

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  it('should set a searched item into the history list', () => {
    const item = { search: 'album-name', type: 'album', response: {} };
    sut.storeItem(item);
    const history = sut.getHistory();

    expect(history.length).toEqual(1);
    expect(history[0]).toEqual(item);
  });

  it('should clean the searched history', () => {
    sut.cleanHistory();

    const history = sut.getHistory();
    expect(history.length).toEqual(0);
  })


  it('should store items in reverse to keep history order', () => {
    const item1 = { search: 'name1', type: 'album', response: {} };
    const item2 = { search: 'name2', type: 'album', response: {} };
    const item3 = { search: 'name3', type: 'album', response: {} };
    sut.storeItem(item1);
    sut.storeItem(item2);
    sut.storeItem(item3);

    const history = sut.getHistory();
    expect(history.length).toEqual(3);
    expect(history[0]).toEqual(item3);
    expect(history[2]).toEqual(item1);
  });

  it('should store items based on the history size parameter informed', () => {
    sut.setOption('historySize', 5);

    sut.storeItem('item1');
    sut.storeItem('item2');
    sut.storeItem('item3');
    sut.storeItem('item4');
    sut.storeItem('item5');
    sut.storeItem('item6');

    const history = sut.getHistory();
    expect(history.length).toEqual(5);
  });

  it('should store an item with its specific information', () => {
    const searchedItem = { search: 'item', type: 'album', response: {} };
    sut.storeItem(searchedItem);

    const history = sut.getHistory();
    expect(history[0]).toEqual(searchedItem);
  });

  it('should store the album chosen by the user', () => {
    sut.storeChoice({ search: 'original-searched-item', name: 'album-name', id: 'random-album-id', type: 'album' });

    const chosenAlbums = sut.getChosenAlbums();
    expect(chosenAlbums.length).toEqual(1);
  });

  it('should return the cached data for a given search', () => {
    const searchedItem = { search: 'original-search', type: 'album', response: { data: 'my-data' } };
    sut.storeItem(searchedItem);

    const cachedData = sut.getCachedData({ search: 'original-search' });

    expect(cachedData.response.data).toEqual('my-data')
  });

  it('should get the stored choice cached data', () => {
    const searchedItem = {
      search: 'original-search',
      type: 'album',
      response: {
        album: {
          items: [{ name: 'album-name', id: 'random-id' }]
        }
      }
    };
    sut.storeItem(searchedItem);

    const choice = {
      search: 'original-search',
      name: 'album-name',
      id: 'random-id',
      type: 'album'
    };

    sut.storeChoice(choice);
    const cachedChoiceData = sut.getCachedChoiceData(choice);

    expect(cachedChoiceData.name).toEqual('album-name');
    expect(cachedChoiceData.id).toEqual('random-id');
  });
});