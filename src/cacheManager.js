let cacheManagerInstance = null;
let history = [];
let choices = [];

class cacheManager{
  constructor(options={}) {
    const { historySize, chosenSize, useLocalstorage } = options;
    this.historySize = historySize || 10;
    this.chosenSize = chosenSize || 10;
    this.useLocalstorage = useLocalstorage || false;

    if(this._checkLocalStorage()) {
      history = JSON.parse(localStorage.getItem('history')) || [];
    }
  }

  static getInstance(options) {
    if(!cacheManagerInstance) {
      cacheManagerInstance = new cacheManager(options);
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

    history.splice(0, 0, {search, type, response});

    if(this.useLocalstorage) {
      localStorage.setItem('history', JSON.stringify(history));
    }
  }

  _checkIteminChoices(choice) {
    return choices.find((item) => {
      return item.id == choice.id;
    });
  }

  _checkLocalStorage() {
    return window.localStorage && this.useLocalstorage;
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
    localStorage.removeItem('history');
    history = [];
  }

  cleanChoices() {
    choices = [];
  }
}

export default cacheManager;