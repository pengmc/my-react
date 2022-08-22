import { useEffect, useState } from "react";
import { Button } from "antd-mobile";
import "./css/chat.css";

const path = "ws://192.168.102.58:3000/";

export default function Chat() {
  const [socket] = useState(new WebSocket(path));
  const [list, setList] = useState([]);
  const [phone, setphone] = useState("");

  useEffect(() => {
    if (typeof WebSocket === "undefined") {
      alert("您的浏览器不支持socket");
    } else {
      // 实例化socket

      console.log(socket);

      // 监听socket错误信息
      socket.onerror = error;

      // 监听socket连接
      socket.onopen = open;

      // 监听socket消息
      socket.onmessage = getMessage;
    }
  }, [socket]);

  const open = (res) => {
    console.log(res);
  };

  let arr = [];

  const getMessage = (res) => {
    let msg = JSON.parse(res.data);
    arr.push(msg);
    console.log(arr);

    setList(arr);
  };

  const error = (err) => {
    console.log(err);
  };

  const sendMsg = () => {
    socket.send(phone);
  };

  return (
    <div>
      <div>
        {list.map((item, index) => {
          return <div>{item.msg}</div>;
        })}
      </div>

      <div className="flex flex_item footer">
        <input
          type="text"
          onInput={(e) => {
            setphone(e.target.value);
          }}
          value={phone}
          placeholder="请输入"
          className="ipt"
        />

        <Button
          block
          color="primary"
          size="mini"
          onClick={sendMsg}
          style={{ height: "40px", flex: "0.3" }}
        >
          发送
        </Button>
      </div>
    </div>
  );
}
