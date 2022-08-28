import { useNavigate } from "react-router-dom";
import cion1 from "../assets/icon1.jpg";

function Cart() {
  const navgate = useNavigate();

  const todetail = () => {
    navgate("/detail");
  };

  return (
    <div className="flex text_c">
      <div>
        <img
          alt=""
          src={cion1}
          onClick={todetail}
          style={{ width: "50px", borderRadius: "5px" }}
        />
        <p>每日推荐</p>
      </div>

      <div className="ml20 text_c">
        <img
          alt=""
          src={require("../assets/logo192.png")}
          onClick={() => {
            navgate("/chat");
          }}
          style={{ width: "50px", borderRadius: "5px" }}
        />
        <p>聊天室</p>
      </div>

      <div className="ml20 text_c">
        <img
          alt=""
          src={require("../assets/file.png")}
          onClick={() => {
            navgate("/upload");
          }}
          style={{ width: "50px", borderRadius: "5px" }}
        />
        <p>图片库</p>
      </div>
    </div>
  );
}

export default Cart;
