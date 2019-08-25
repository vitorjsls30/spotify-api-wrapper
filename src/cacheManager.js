let cacheManagerInstance = null;

class cacheManager{
  constructor() {
    this.history = [];
    this.historySize = 10;
  }

  static getInstance() {
    if(!cacheManagerInstance) {
      cacheManagerInstance = new cacheManager();
    }
    return cacheManagerInstance;
  }

  setOption(option, value) {
    this[option] = value;
  }

  storeItem(item) {
    if(this.history.length === this.historySize) {
      this.history.pop();
    }
    const {search, type, response} = item;
    this.history.splice(0,0, {search, type, response});
  }

  getHistory() {
    return this.history;
  }

  cleanHistory() {
    this.history = [];
  }
}

export default cacheManager;