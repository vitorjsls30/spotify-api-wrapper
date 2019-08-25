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
    const item = { search: 'artist-name', type: 'artist', items: [] };
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
    const item1 = { search: 'name1', type: 'artist', items: [] };
    const item2 = { search: 'name2', type: 'artist', items: [] };
    const item3 = { search: 'name3', type: 'artist', items: [] };
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
    const searchedItem = { search: 'item', type: 'album', items: [] };
    sut.storeItem(searchedItem);

    const history = sut.getHistory();
    expect(history[0]).toEqual(searchedItem);
  });
});