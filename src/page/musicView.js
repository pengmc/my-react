import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/api";
import { NavBar } from "antd-mobile";
import { observer } from "mobx-react-lite";
import { store } from "../store";
import Play from "./compoent/play.js";

function MusicView() {
  // const param = useParams();

  const navigate = useNavigate();

  const [lrclist, setlrclist] = useState([]);

  let [time, settime] = useState(0);

  // const [isshow, setShow] = useState(false);

  // const [Id] = useState(store.musicId);

  const [start, setstart] = useState("");

  const [end, setend] = useState("");

  useEffect(() => {
    clearInterval(store.time);
    let el = document.querySelector("#musicview");
    let audio = document.querySelector("#audio");

    //向上滑动
    el.addEventListener("touchstart", (e) => {
      setstart(e.changedTouches[0].pageY);
      let el = document.querySelector("#musicview");
      //清空定时器
      clearInterval(store.time);
      clearTimeout(store.timeout);

      store.timeout = setTimeout(() => {
        store.time = setInterval(() => {
          settime(parseInt(audio.currentTime * 1000));
          el.scrollTo(0, getscoll() - 20 - el.offsetHeight / 2);
        }, 1000);
      }, 1000);
    });
    //向下滑动
    el.addEventListener("touchend", (e) => {
      setend(e.changedTouches[0].pageY);
      if (start - end > 150 || start - end < -150) {
        console.log("向下滑动");
      }
    });

    el.scrollTo(0, 0);
    audio.currentTime = 0;
    audio.play();
    settime(0);
    store.setShow(false);

    store.time = setInterval(() => {
      settime(parseInt(audio.currentTime * 1000));
      el.scrollTo(0, getscoll() - 20 - el.offsetHeight / 2);
    }, 1000);
  }, [store.musicId]);

  const back = () => {
    navigate(-1);
    clearInterval(store.time);
  };

  //时间转换
  const timeformat = (item) => {
    if (!item) {
      return "0";
    }
    let m = item.slice(1, 3);
    let s = item.slice(4, 6);
    let h = item.slice(7, 10);

    return parseInt(m * 60 * 1000) + parseInt(s * 1000) + parseInt(h);
  };

  const pretime = (item, index) => {
    let pretime = lrclist[index + 1];
    if (!pretime) return "last";
    let m = pretime.slice(1, 3);
    let s = pretime.slice(4, 6);
    let h = pretime.slice(7, 10);
    return parseInt(m * 60 * 1000) + parseInt(s * 1000) + parseInt(h);
  };

  const getscoll = () => {
    let active = document.querySelector(".active");
    if (!active) {
      return 220;
    }
    return active.offsetTop - active.offsetHeight;
  };

  useEffect(() => {
    console.log(store.bgpic);

    axios.get("/lyric?id=" + store.musicId).then((res) => {
      setlrclist(res.lrc.lyric.split("\n"));
    });
  }, [store.musicId]);

  const scrollHandle = (item) => {
    let audio = document.querySelector("#audio");
    let el = document.querySelector("#musicview");
    audio.currentTime = timeformat(item) / 1000;

    settime(parseInt(audio.currentTime * 1000));
    el.scrollTo(0, getscoll() - 20 - el.offsetHeight / 2);
  };

  return (
    <div
      style={{
        backgroundColor: "rgba(174, 182, 181, 0.5)",
        height: "96vh",
        width: "100%",
        boxSizing: "border-box",
        top: "0",
        borderRadius: "15px",
      }}
    >
      <div
        style={{
          background: `no-repeat url(${store.bgpic}) 0 0`,
          filter: "blur(10px)",
          width: "100%",
          height: "100%",
          position: "absolute",
          top: "0",
          left: "0",
          zIndex: "-1",
        }}
      ></div>

      <NavBar
        onBack={back}
        style={{
          color: "#fff",
        }}
      >
        <marquee direction="left" style={{ width: "100%" }}>
          <div>{store.song || "空"}</div>
        </marquee>
      </NavBar>

      {/* 歌词部分 */}
      <ul
        className="text_c scroll c_fff fs15"
        id="musicview"
        style={{
          height: "45vh",
          paddingTop: "50%",
        }}
      >
        {lrclist.map((item, index) => {
          return (
            <li
              key={index}
              className={
                (time >= timeformat(item) && time < pretime(item, index)) ||
                pretime(item) === "last"
                  ? "active mt16 w95"
                  : "mt16 w95"
              }
              onClick={() => scrollHandle(item)}
            >
              {item.split("]")[1] || "~ ~ ~"}
            </li>
          );
        })}
      </ul>

      {/* 播放器 */}
      <Play />
    </div>
  );
}

export default observer(MusicView);
