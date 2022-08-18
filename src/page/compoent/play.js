import { store } from "../../store";
import { observer } from "mobx-react-lite";
import "../css/plays.css";
import { useEffect, useState } from "react";

function Play() {
  // 播放
  const palyer = (falg) => {
    let audio = document.querySelector("#audio");
    store.setShow(falg);
    if (!falg) {
      audio.play();
    } else {
      audio.pause();
    }
  };

  const [time, settime] = useState();

  useEffect(() => {
    setInterval(() => {
      settime(new Date());
    }, 1000);
  }, []);

  // 获取当前音乐时间

  const getTime = (date) => {
    let audio = document.querySelector("#audio");

    let time = audio.currentTime * 1000;

    let m =
      parseInt(time / 1000 / 60) < 10
        ? "0" + parseInt(time / 1000 / 60)
        : parseInt(time / 1000 / 60);

    let s =
      parseInt((time / 1000) % 60) < 10
        ? "0" + parseInt((time / 1000) % 60)
        : parseInt((time / 1000) % 60);

    return m + ":" + s;
  };

  //切换歌曲
  const toPlay = (index) => {
    let count = store.count + index;
    if (count < 0) {
      count = store.lzylist.length - 1;
    } else if (count > store.lzylist.length - 1) {
      count = 0;
    }
    store.setCount(count);
    let item = store.lzylist[store.count];
    store.setsong(item.name + " — " + item.ar[0].name);
    store.setmusicId(item.id);
  };
  return (
    <div className="plays">
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          top: "0",
          left: "0",
          zIndex: "-1",
        }}
      ></div>
      <p className="text_c" style={{ color: "#666", fontSize: "16px" }}>
        {getTime(time)}
      </p>

      <div className="flex justify mt20" style={{ padding: "0 50px" }}>
        <img
          src={require("../../assets/pre.png")}
          alt=""
          style={{ width: "30px", height: "30px" }}
          onClick={() => toPlay(-1)}
        />
        <div>
          {store.isshow ? (
            <img
              src={require("../../assets/play.png")}
              alt=""
              style={{ width: "30px", height: "30px" }}
              onClick={() => palyer(false)}
            />
          ) : (
            <img
              src={require("../../assets/pause.png")}
              alt=""
              style={{ width: "30px", height: "30px" }}
              onClick={() => palyer(true)}
            />
          )}
        </div>

        <img
          src={require("../../assets/next.png")}
          alt=""
          style={{ width: "30px", height: "30px" }}
          onClick={() => toPlay(1)}
        />
      </div>
    </div>
  );
}

export default observer(Play);
