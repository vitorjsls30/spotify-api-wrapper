import cacheManager from '../cacheManager';

let sut;
const choice = { search: 'original-search', name: 'album-name', id: 'random-id', type: 'album' };
const choice2 = { search: 'original-search2', name: 'album-name2', id: 'random-id2', type: 'album2' };
const choice3 = { search: 'original-search3', name: 'album-name3', id: 'random-id3', type: 'album3' };

beforeEach(() => {
  sut = cacheManager.getInstance();
});

afterEach(() => {
  sut.cleanHistory();
  sut.cleanChoices();
});

describe(`Cache Manager`, () => {

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
    localStorage.setItem('history', JSON.stringify([{search: 'searched_item'}]));
    sut.cleanHistory();

    const history = sut.getHistory();
    const localStorageHistory = JSON.parse(localStorage.getItem('history'));
    expect(history.length).toEqual(0);
    expect(localStorageHistory).toBeNull();
  });


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

  it('should clean the chosen Albuns', () => {
    localStorage.setItem('choices', JSON.stringify([{name: 'chosen_item'}]));
    sut.cleanChoices();

    const chosenAlbuns = sut.getChosenAlbums();
    const localStorageChosen = JSON.parse(localStorage.getItem('choices'));

    expect(chosenAlbuns.length).toEqual(0);
    expect(localStorageChosen).toBeNull();
  });

  it('should store the album chosen by the user', () => {
    sut.storeChoice({ search: 'original-searched-item', name: 'album-name', id: 'random-album-id', type: 'album' });

    const chosenAlbums = sut.getChosenAlbums();
    expect(chosenAlbums.length).toEqual(1);
  });

  it('should return the cached data for a given search', () => {
    const searchedItem = {
      search: 'original-search',
      type: 'album',
      response: {
        data: 'my-data'
      }
    };
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
    sut.storeChoice(choice);
    const cachedChoiceData = sut.getCachedChoiceData(choice);

    expect(cachedChoiceData.name).toEqual('album-name');
    expect(cachedChoiceData.id).toEqual('random-id');
  });

  it('should reorganize the choices when it is visited', () => {
    sut.storeChoice(choice);
    sut.storeChoice(choice2);
    sut.storeChoice(choice3);

    const storedChoices = sut.getChosenAlbums();
    expect(storedChoices[0]).toEqual(choice3);
    expect(storedChoices[1]).toEqual(choice2);
    expect(storedChoices[2]).toEqual(choice);
  });

  it('should store the choices based on the choicesSize parameter', () => {
    sut.setOption('chosenSize', 3);

    const choice4 = {
      search: 'original-search4',
      name: 'album-name4',
      id: 'random-id4',
      type: 'album4'
    };

    sut.storeChoice(choice);
    sut.storeChoice(choice2);
    sut.storeChoice(choice3);
    sut.storeChoice(choice4);

    const chosenAlbums = sut.getChosenAlbums();
    expect(chosenAlbums.length).toEqual(3);
  });

  it('should not store a repeated chosen albums', () => {
    sut.storeChoice(choice);
    sut.storeChoice(choice);

    const chosenAlbums = sut.getChosenAlbums();
    expect(chosenAlbums.length).toEqual(1);
  });

  describe('localStorage Integration', () => {
    it('should restore an item from the localStorage into the instance', () => {
      localStorage.setItem('history', JSON.stringify([{search: 'previous_search'}]));
      const sut2 = new cacheManager({useLocalstorage: true});

      const item = sut2.getHistory();
      expect(item.length).toEqual(1);
      expect(item[0].search).toEqual('previous_search');
    });

    it('should restore a choice from the localStorage into the instance', () => {
      localStorage.setItem('choices', JSON.stringify([{name: 'chosen_album'}]));
      const sut3 = new cacheManager({useLocalstorage: true});

      const choice = sut3.getChosenAlbums();
      expect(choice.length).toEqual(1);
      expect(choice[0].name).toEqual('chosen_album');
    });

  })
});