import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Input, Form, Button, NavBar } from "antd-mobile";
import axios from "../api/api";
import md5 from "js-md5";

export default function Captcha() {
  const navigate = useNavigate();

  const login = () => {
    let data = {
      phone,
      password: md5(pass),
      captcha,
      nickname: name,
    };
    axios.get("/register/cellphone", { params: data }).then((res) => {
      console.log(res);
      if (res.code === 200) {
        localStorage.setItem("token", res.token);
        localStorage.setItem("account", JSON.stringify(res.account));
        navigate("/");
      }
    });
  };

  // const [radioVal, setradioVal] = useState("1");

  // const [visible, setVisible] = useState(false);

  // const [startTime, setstartTime] = useState(new Date());

  const [name, setname] = useState("");

  const [phone, setphone] = useState("");

  const [captcha, setcaptcha] = useState("");

  const [pass, setpass] = useState("123456");

  // const now = new Date();

  // useEffect(() => {
  //   console.log(startTime.getTime());
  // }, [startTime]);

  const sentReg = () => {
    axios.get("proxy/captcha/sent?phone=" + phone);
  };

  return (
    <>
      <NavBar onBack={() => navigate("/")}>注册</NavBar>

      <Form layout="horizontal" className="">
        <Form.Item label="用户名" name="phonename">
          <Input
            placeholder="请输入用户名"
            clearable
            className="text_rig"
            onChange={(val) => {
              setname(val);
            }}
            value={name}
          />
        </Form.Item>

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

        <Form.Item label="验证码">
          <Input
            placeholder="请输入验证码"
            clearable
            className="text_rig"
            onChange={(val) => {
              setcaptcha(val);
            }}
            value={captcha}
          />
          <Button
            block
            color="primary"
            size="mini"
            className="mt20"
            onClick={sentReg}
            style={{
              height: "35px",
              width: "170px",
            }}
          >
            发送验证码
          </Button>
        </Form.Item>

        {/* <Form.Item
          label="时间"
          onClick={() => {
            setVisible(true);
          }}
        >
          <DatePicker
            title="时间选择"
            visible={visible}
            onClose={() => {
              setVisible(false);
            }}
            max={now}
            value={startTime}
            onConfirm={(v) => {
              setstartTime(v);
            }}
          >
            {(value) =>
              value.getFullYear() +
              "年" +
              ` ${value.getMonth() + 1}
              月` +
              value?.getDate() +
              "日"
            }
          </DatePicker>
        </Form.Item>

        <Form.Item label="类型">
          <Radio.Group
            defaultValue="1"
            value={radioVal}
            onChange={(val) => {
              setradioVal(val);
            }}
          >
            <div className="flex_rig flex">
              <Radio value="1">项目</Radio>
              <Radio value="2">活动</Radio>
            </div>
          </Radio.Group>
        </Form.Item> */}

        <div className="mt20 flex flex_end"></div>
      </Form>
      <Button
        block
        color="primary"
        size="large"
        className="mt20"
        onClick={login}
      >
        注册
      </Button>
    </>
  );
}
