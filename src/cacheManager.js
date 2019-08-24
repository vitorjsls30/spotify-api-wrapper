let cacheManagerInstance = null;

class cacheManager{
  constructor() {
    this.history = [];
    this.historySize = 4;
  }

  static getInstance() {
    if(!cacheManagerInstance) {
      cacheManagerInstance = new cacheManager();
    }
    return cacheManagerInstance;
  }

  storeItem(search) {
    if(this.history.length === this.historySize) {
      this.history.pop();
    }
    this.history.splice(0,0, search);
  }

  getHistory() {
    return this.history;
  }

  cleanHistory() {
    this.history = [];
  }
}

export default cacheManager;