import { Skeleton } from "antd-mobile";
import "./page/css/home.css";

export default function Loadio() {
  return (
    <div className="loadio">
      <p>玩命加载中...</p>
      <Skeleton.Title animated />
      <Skeleton.Paragraph lineCount={5} animated />
    </div>
  );
}
