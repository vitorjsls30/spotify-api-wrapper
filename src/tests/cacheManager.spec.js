import cacheManager from '../cacheManager';

let sut;

beforeEach(() => {
  sut = cacheManager.getInstance();
});

fdescribe(`Cache Manager`, () => {

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

});