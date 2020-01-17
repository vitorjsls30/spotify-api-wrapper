let cacheManagerInstance = null;
let history = [];
let choices = [];

class cacheManager{
  constructor() {
    history = [];
    this.historySize = 10;
    this.chosenSize = 10;
    this.useLocalstorage = false;
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
    if(history.length === this.historySize) {
      history.pop();
    }
    const {search, type, response} = item;

    if(this.useLocalstorage) {
      // Store history item into localStorage...
      console.log('not implemented yet =z...');
    } else {
      history.splice(0, 0, {search, type, response});
    }

  }

  _checkIteminChoices(choice) {
    return choices.find((item) => {
      return item.id == choice.id;
    });
  }

  storeChoice(choice) {
    if(choices.length == this.chosenSize) {
      choices.pop();
    }

    if(this._checkIteminChoices(choice)) {
      return;
    }

    const {search, name, id, type} = choice;
    choices.splice(0, 0, {search, name, id, type});
  }

  getCachedData(query) {
    return history.find((item) => {
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
    return history;
  }

  getChosenAlbums() {
    return choices;
  }

  cleanHistory() {
    history = [];
  }

  cleanChoices() {
    choices = [];
  }
}

export default cacheManager;