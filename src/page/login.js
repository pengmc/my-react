import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Input, Form, Button } from "antd-mobile";
import axios from "../api/api";
import md5 from "js-md5";

export default function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.token) {
      navigate("/home");
    }
  });

  const login = () => {
    if (pass === "") return;
    let data = {
      phone,
      password: md5(pass),
    };
    axios
      .get("/login/cellphone", { params: data })
      .then((res) => {
        console.log(res);
        if (res.code === 200) {
          localStorage.setItem("token", res.token);
          localStorage.setItem("account", JSON.stringify(res.account));
          navigate("/home");
        } else {
          localStorage.setItem("token", "111");
        }
      })
      .catch((err) => {
        localStorage.setItem("token", "111");
        navigate("/home");
      });
  };

  const [phone, setphone] = useState("17687997972");

  const [pass, setpass] = useState("");

  return (
    <div className="flex justify item wrap">
      <div className="text_c flex1">
        <img src={require("../assets/logo192.png")} alt="图片" />
      </div>
      <Form layout="horizontal" className="mt20 ">
        <Form.Item label="手机号">
          <Input
            placeholder="请输入手机号"
            clearable
            className="text_rig"
            onChange={(val) => {
              setphone(val);
            }}
            value={phone}
          />
        </Form.Item>

        <Form.Item label="密码" name="password">
          <Input
            placeholder="请输入密码"
            clearable
            type="password"
            className="text_rig"
            onChange={(val) => {
              setpass(val);
            }}
            value={pass}
          />
        </Form.Item>
      </Form>
      <Button
        block
        color="primary"
        size="large"
        onClick={login}
        className="mt20"
      >
        登陆
      </Button>
      <Button
        block
        color="primary"
        size="large"
        className="mt20"
        onClick={() => {
          navigate("/captcha");
        }}
      >
        注册
      </Button>
    </div>
  );
}
