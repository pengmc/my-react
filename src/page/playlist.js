import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../api/api";
import { NavBar, ImageViewer } from "antd-mobile";
import { observer } from "mobx-react-lite";
import { store } from "../store";

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
    });
  }, [params.id]);

  const back = () => {
    navigate(-1);
  };

  const play = (id, name) => {
    console.log(id);
    axios.get("/song/url?id=" + id).then((res) => {
      console.log(res);
      store.playUrl(res.data[0].url);
      store.setsong(name);
    });
    navigate("/musicView/" + id);
  };

  const picView = (e, url) => {
    e.stopPropagation();
    console.log(url);
    setVisible(true);
    setdemoImage(url);
  };

  return (
    <div>
      <NavBar onBack={back}>详情</NavBar>

      <ul>
        {palylist.map((item) => {
          return (
            <li
              key={item.id}
              className="flex flex_item mt20 wrap"
              onClick={() => play(item.id, item.name)}
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
                  作者： {item.ar[0].name}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default observer(Playlist);
