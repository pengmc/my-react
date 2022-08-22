import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/api";
import { NavBar } from "antd-mobile";
import { observer } from "mobx-react-lite";
import { store } from "../store";
import Play from "./compoent/play.js";
import KeepAlive from "react-activation";

function MusicView() {
  // const param = useParams();

  const navigate = useNavigate();

  const [lrclist, setlrclist] = useState([]);

  let [time, settime] = useState(0);

  // const [isshow, setShow] = useState(false);

  // const [Id] = useState(store.musicId);

  const [start] = useState("");

  const [end] = useState("");

  const musicview = useRef(null);

  useEffect(() => {
    clearInterval(store.time);
    let audio = store.audio.current;
    let el = musicview.current;

    console.log(el);

    el.scrollTo(0, 0);
    audio.currentTime = 0;
    settime(0);
    store.setShow(false);

    //向上滑动
    el.addEventListener("touchstart", (e) => {
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
      if (start - end > 150 || start - end < -150) {
        console.log("向下滑动");
        clearInterval(store.time);
        clearTimeout(store.timeout);
        store.timeout = setTimeout(() => {
          store.time = setInterval(() => {
            settime(parseInt(audio.currentTime * 1000));
            el.scrollTo(0, getscoll() - 20 - el.offsetHeight / 2);
          }, 1000);
        }, 1000);
      }
    });

    // 设置歌词位置和当前时间
    store.time = setInterval(() => {
      settime(parseInt(audio.currentTime * 1000));
      el.scrollTo(0, getscoll() - 20 - el.offsetHeight / 2);
    }, 1000);

    return () => {
      el.removeEventListener("touchstart", el);
      el.removeEventListener("touchend", el);
    };
  }, [store.url]);

  //调用歌词地址
  useEffect(() => {
    if (store.url === "") return;
    console.log(new Date());
    axios.get("/lyric?id=" + store.musicId).then((res) => {
      setlrclist(res.lrc.lyric.split("\n"));
    });
  }, [store.url]);

  //监听歌曲是否播放
  useEffect(() => {
    let audio = store.audio.current;
    if (store.url === "") return;
    audio.play();
  }, [store.url]);

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
    if (!pretime) return "0";
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

  const scrollHandle = (item) => {
    let audio = store.audio.current;
    let el = musicview.current;
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
      {/* 背景图 */}
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
        ref={musicview}
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
                time >= timeformat(item) && time < pretime(item, index)
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
      <Play style={{ color: "#fff" }} />
    </div>
  );
}

export default observer(() => {
  return (
    <KeepAlive>
      <MusicView />
    </KeepAlive>
  );
});
