let cacheManagerInstance = null;

class cacheManager{
  constructor() {
    this.history = [];
  }

  static getInstance() {
    if(!cacheManagerInstance) {
      cacheManagerInstance = new cacheManager();
    }
    return cacheManagerInstance;
  }

  storeItem(search) {
    this.history.push(search);
  }

  getHistory() {
    return this.history;
  }
}

export default cacheManager;