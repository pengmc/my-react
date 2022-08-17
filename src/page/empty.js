import { Empty, Button } from "antd-mobile";
import { useNavigate } from "react-router-dom";

export default function Err() {
  const navgate = useNavigate();

  const back = () => {
    navgate(-1);
  };

  return (
    <>
      <Empty
        style={{ padding: "64px 0" }}
        imageStyle={{ width: 128 }}
        description="暂无数据"
      />
      <Button
        block
        color="primary"
        size="large"
        className="fiexd bt20 w95"
        onClick={back}
      >
        返回
      </Button>
    </>
  );
}
