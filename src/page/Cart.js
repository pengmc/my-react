import { useNavigate } from "react-router-dom";
import cion1 from "../assets/icon1.jpg";

function Cart() {
  const navgate = useNavigate();

  const todetail = () => {
    navgate("/detail");
  };

  return (
    <div>
      <img
        alt=""
        src={cion1}
        onClick={todetail}
        style={{ width: "50px", borderRadius: "5px" }}
      />
      <p>每日推荐</p>
    </div>
  );
}

export default Cart;
