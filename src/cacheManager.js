let cacheManagerInstance = null;

class cacheManager{
  constructor() {
    this.history = [];
    this.choices = [];
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
    this.history.splice(0, 0, {search, type, response});
  }

  storeChoice(choice) {
    const {search, name, id, type} = choice;
    this.choices.splice(0, 0, {search, name, id, type});
  }

  getCachedData(query) {
    return this.history.find((item) => {
      return item.search === query.search;
    });
  }

  getCachedChoiceData(choice) {
    const historyItem = this.getCachedData(choice);
    if(!historyItem.response[choice.type].items.length > 0) {
      return {};
    }

    return historyItem.response[choice.type].items.find((item) => {
      return item.id === choice.id;
    });
  }

  getHistory() {
    return this.history;
  }

  getChosenAlbums() {
    return this.choices;
  }

  cleanHistory() {
    this.history = [];
  }
}

export default cacheManager;