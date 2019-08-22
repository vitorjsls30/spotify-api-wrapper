let cacheManagerInstance = null;

class cacheManager{
  constructor() {
  }

  static getInstance() {
    if(!cacheManagerInstance) {
      cacheManagerInstance = new cacheManager();
    }
    return cacheManagerInstance;
  }
}

export default cacheManager;