import "./css/home.css";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  return (
    <>
      <div>
        <div onClick={() => navigate("/1231")}>精彩放送</div>
        <div>主题咖乐园</div>
      </div>
    </>
  );
}

export default Home;
