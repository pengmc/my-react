import { makeAutoObservable } from "mobx";

class Store {
  url = "";
  time = "";
  song = "";
  count = 0;
  lzylist = [];

  constructor() {
    makeAutoObservable(this);
  }

  playUrl(url) {
    this.url = url;
  }

  setsong(name) {
    this.song = name;
  }

  setLzy(list) {
    this.lzylist = list;
  }

  setCount(index) {
    this.count = index;
  }
}

const store = new Store();

export { store };
