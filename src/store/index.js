import { makeAutoObservable } from "mobx";

class Store {
  url = "";
  time = "";
  song = "";
  constructor() {
    makeAutoObservable(this);
  }

  playUrl(url) {
    console.log(url);
    this.url = url;
  }

  setsong(name) {
    this.song = name;
  }
}

const store = new Store();

export { store };
