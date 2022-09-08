import { useEffect, useState, useRef } from "react";
import { Button, NavBar, Input, Mask } from "antd-mobile";
import "./css/chat.css";
import { useNavigate } from "react-router";

const socket = new WebSocket("ws://192.168.102.58:8088/");

socket.onopen = (err, res) => {
  socket.send('open')
};



socket.onerror = (err) => {
  console.log(err);
};



export default function Chat() {
  const [list, setList] = useState([]);
  const [msg, setmsg] = useState("");

  const viewh = useRef('')
  const app = useRef('')

  useEffect(() => {
    app.current.scrollTo(0, viewh.current.clientHeight)

  }, [list])



  useEffect(() => {
    // 监听socket消息
    socket.onmessage = (res) => {
      setList(JSON.parse(res.data))
    };
    // 监听socket连接
    return () => {
      socket.close()
    }
  }, []);

  const Navigate = useNavigate();

  const back = () => {
    Navigate(-1);
  };

  const [visible, setVisible] = useState(true);

  const [name, setName] = useState("");

  useEffect(() => {
    if (localStorage.name) {
      setName(localStorage.name);
      setVisible(false);
    }
  }, []);

  return (
    <div  >
      <NavBar onBack={back}>
        <div
          onClick={() => {
            setVisible(true);
            socket.close();
          }}
        >
          聊天室
        </div>
      </NavBar>
      <div className="scroll " style={{ height: '80vh' }} ref={app}>
        <div ref={viewh}>
          {list.map((item, index) => {
            return (
              <div className="pos h50 mt10 " key={item.id}>
                {item.name !== name ? (
                  <div className="flex flex_item mt20">
                    <img
                      alt=""
                      src={require("../assets/logo192.png")}
                      style={{ width: "40px" }}
                    />
                    <div className="mt20 ml10">
                      <p className="flex1">{item.name}</p>
                      <p className="flex1 mt10 bgc ">{item.msg}</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex_item  flex_end rig">
                    <div className="mt20">
                      <p className="flex1">{item.name}</p>
                      <p className="flex1 mt10 bgc ">{item.msg}</p>
                    </div>

                    <img
                      alt=""
                      className=" ml10"
                      src={require("../assets/logo192.png")}
                      style={{ width: "40px" }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>

      <div className="flex flex_item footer">
        <input
          type="text"
          onInput={(e) => {
            setmsg(e.target.value);
          }}
          value={msg}
          placeholder="请输入"
          className="ipt"
          onKeyDown={(e) => {
            if (e.key !== "Enter") return;
            socket.send(JSON.stringify({ msg, name }));
            setmsg("");
          }}
        />

        <Button
          block
          color="primary"
          size="mini"
          onClick={() => {
            if (msg == '') return
            socket.send(JSON.stringify({ msg, name }));
            setmsg("");
          }}
          style={{ height: "40px", flex: "0.3" }}
        >
          发送
        </Button>
      </div>

      {/* 弹出框 */}
      <>
        <Mask visible={visible}>
          <div
            className="flex flex_item"
            style={{ height: "100vh", width: "100%" }}
          >
            <input
              type="text"
              onInput={(e) => {
                setName(e.target.value);
              }}
              value={name}
              placeholder="请输入昵称"
              className="ipt"
            />
            <Button
              onClick={() => {
                if (name) {
                  setVisible(false);
                  localStorage.setItem("name", name);
                }
              }}
            >
              进入聊天
            </Button>
          </div>
        </Mask>
      </>
    </div>
  );
}
