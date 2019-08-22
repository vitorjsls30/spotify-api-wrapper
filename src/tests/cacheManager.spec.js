import cacheManager from '../cacheManager';

const sut = new cacheManager();

describe(`Cache Manager`, () => {
  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

});