import { NavBar } from "antd-mobile";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/api";

export default function Detail() {
  const navigate = useNavigate();

  const [musicList, setmusicList] = useState([]);

  const back = () => {
    navigate(-1);
  };

  const palyer = (id, index) => {
    navigate("/playlist/" + id);
  };

  useEffect(() => {
    console.log(el);
    let audio = document.querySelector("#audio");

    audio.pause();
    axios.get("/personalized").then((res) => {
      setmusicList(res.result);
    });
  }, []);

  const el = useRef("");

  return (
    <>
      <NavBar onBack={back}>每日推荐</NavBar>

      <div>
        {musicList.map((item, index) => {
          return (
            <div
              className="flex mt20 warp"
              onClick={() => palyer(item.id, index)}
              key={index}
            >
              <img alt="" src={item.picUrl + "?param=50y50"} />
              <div className="ml20" key={item.id}>
                {item.name}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
