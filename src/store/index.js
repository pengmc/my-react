import { makeAutoObservable } from "mobx";
import axios from "../api/api.js";

class Store {
  url = "";
  time = "";
  song = "";
  count = 0;
  lzylist = [];
  timeout = "";

  bgpic = "";

  constructor() {
    makeAutoObservable(this);
  }

  playUrl(Id) {
    axios.get("/song/url?id=" + Id).then((res) => {
      this.url = res.data[0].url;
    });
  }

  setsong(name) {
    this.song = name;
  }

  setBgpic(url) {
    this.bgpic = url;
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
