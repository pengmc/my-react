import { Button } from "antd-mobile";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/api";

function Cart() {
  const navgate = useNavigate();

  const [userinfo, setinfo] = useState([]);

  useEffect(() => {
    axios.get("proxy/user/account").then((res) => {
      console.log(res.profile);
      setinfo(res.profile);
    });
  }, []);
  return (
    <div>
      <div className="flex item pt20 ">
        <img
          alt=""
          src={userinfo.avatarUrl + "?param=60y60"}
          style={{ borderRadius: "100px" }}
        ></img>

        <div className="flex">
          <span className="ml20 fs16">{userinfo.nickname}</span>

          <span className="ml20 fs16">ip:{userinfo.lastLoginIP}</span>
        </div>
      </div>
      <Button
        size="large"
        block
        color="primary"
        onClick={() => {
          navgate("/");
          localStorage.removeItem("token");
          localStorage.removeItem("account");
        }}
        className="fixed bt70 w95 fs16"
      >
        退出登陆
      </Button>
    </div>
  );
}

export default Cart;
