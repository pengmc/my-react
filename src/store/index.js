import { makeAutoObservable } from "mobx";
import axios from "../api/api.js";

class Store {
  url = "";
  time = "";
  song = "";
  count = 0;
  lzylist = [];
  timeout = "";
  isshow = false;
  bgpic = "";
  musicId = "";
  audio = "";
  detailid = "";

  constructor() {
    makeAutoObservable(this);
  }

  setDeid(id) {
    this.detailid = id;
  }

  setmusicId(id) {
    this.musicId = id;
    axios.get("/song/url?id=" + id).then((res) => {
      this.url = res.data[0].url;
    });
  }

  setelement(el) {
    console.log(el);
    this.audio = el;
  }

  setShow(falg) {
    console.log(falg);
    this.isshow = falg;
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
