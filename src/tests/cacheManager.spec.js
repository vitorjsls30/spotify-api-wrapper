import cacheManager from '../cacheManager';

let sut;

beforeEach(() => {
  sut = cacheManager.getInstance();
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
  })

});