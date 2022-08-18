import { Badge, TabBar } from "antd-mobile";
import {
  AppOutline,
  MessageOutline,
  MessageFill,
  UnorderedListOutline,
  UserOutline,
} from "antd-mobile-icons";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Authentication from "./authentication";

function Layout() {
  const tabs = [
    {
      key: "home",
      title: "首页",
      icon: <AppOutline />,
      badge: Badge.dot,
    },
    {
      key: "cart",
      title: "我的应用",
      icon: <UnorderedListOutline />,
      badge: "5",
    },
    {
      key: "message",
      title: "我的消息",
      icon: (active) => (active ? <MessageFill /> : <MessageOutline />),
      badge: "99+",
    },
    {
      key: "todo",
      title: "个人中心",
      icon: <UserOutline />,
    },
  ];

  const topath = (path) => {
    localStorage.setItem("path", path);
    seteky(path);
    navgate(path);
  };

  const navgate = useNavigate();

  const [activeKey, seteky] = useState("home");

  useEffect(() => {
    seteky(localStorage.path);
  }, []);

  return (
    <div className="content">
      <Authentication>
        <Outlet />
      </Authentication>
      <div className="footer">
        <TabBar onChange={(val) => topath(val)} activeKey={activeKey}>
          {tabs.map((item) => (
            <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
          ))}
        </TabBar>
      </div>
    </div>
  );
}

export default Layout;
