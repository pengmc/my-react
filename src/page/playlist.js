import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../api/api";
import { NavBar, ImageViewer } from "antd-mobile";
import { observer } from "mobx-react-lite";
import { store } from "../store";
import Play from "./compoent/play";
import KeepAlive from "react-activation";


function Playlist() {
  const navigate = useNavigate();

  const params = useParams();

  const [palylist, setlist] = useState([]);

  const [demoImage, setdemoImage] = useState("");

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    axios.get("/playlist/detail?id=" + params.id).then((res) => {
      console.log(res.playlist.tracks);
      setlist(res.playlist.tracks);
      store.setLzy(res.playlist.tracks);
    });
  }, [params.id]);

  const back = () => {
    navigate(-1);
  };

  const play = (id, item, index) => {
    store.setsong(item.name + " — " + item.ar[0].name);
    store.setCount(index);
    store.setBgpic(item.al.picUrl);
    navigate("/musicView/" + id);
    store.setmusicId(id);
    // store.playUrl(id);
  };

  const picView = (e, url) => {
    e.stopPropagation();
    setVisible(true);
    setdemoImage(url);
  };

  const topath = () => {
    navigate("/musicView/" + store.musicId);
  };

  return (
    <div>
      <NavBar onBack={back}>详情</NavBar>

      <ul style={{ paddingBottom: "100px" }}>
        {palylist.map((item, index) => {
          return (
            <li
              key={item.id}
              className="flex flex_item mt20 wrap"
              onClick={() => play(item.id, item, index)}
            >
              <img
                alt=""
                src={item.al.picUrl + "?param=50y50"}
                onClick={(e) => picView(e, item.al.picUrl)}
              />

              <ImageViewer
                image={demoImage}
                visible={visible}
                onClose={() => {
                  setVisible(false);
                }}
              />
              <div>
                <p className="ml20 ">{item.name}</p>
                <p style={{ flex: 1, color: "#666" }} className="ml20">
                  {item.ar[0].name}
                </p>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="h100 bort_1 fixed  w100 footer_play" onClick={topath}>
        <Play />
      </div>
    </div>
  );
}

export default observer(() => {
  return (
    <KeepAlive>
      <Playlist />
    </KeepAlive>
  );
});
