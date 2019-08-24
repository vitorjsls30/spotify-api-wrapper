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
    sut.storeItem('artist-name');
    const history = sut.getHistory();

    expect(history.length).toEqual(1);
    expect(history[0]).toEqual('artist-name');
  });

  it('should clean the searched history', () => {
    sut.cleanHistory();

    const history = sut.getHistory();
    expect(history.length).toEqual(0);
  })

  it('should store items based on history size limit', () => {
    sut.cleanHistory();

    sut.storeItem('item1');
    sut.storeItem('item2');
    sut.storeItem('item3');
    sut.storeItem('item4');
    sut.storeItem('item5');
    sut.storeItem('item6');
    sut.storeItem('item7');
    sut.storeItem('item8');
    sut.storeItem('item9');
    sut.storeItem('item10');

    const history = sut.getHistory();
    expect(history.length).toEqual(10);
  });

    it('should store items in reverse to keep history order', () => {
      sut.storeItem('item1');
      sut.storeItem('item2');
      sut.storeItem('item3');

      const history = sut.getHistory();
      expect(history.length).toEqual(3);
      expect(history[0]).toEqual('item3');
      expect(history[2]).toEqual('item1');
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

});