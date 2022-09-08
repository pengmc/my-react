import { Button, NavBar } from "antd-mobile";
import { useNavigate } from "react-router";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

export default function Chat() {
  const Navigate = useNavigate();

  const [list, setlist] = useState([]);

  const back = () => {
    Navigate(-1);
  };

  const file = useRef(null);

  const upload = () => {
    const formdata = new FormData();
    formdata.append("file", file.current.files[0]);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    axios.post("/proxy/upload", formdata, config).then((res) => {
      console.log(res.data);
      getimg()
    });
  };

  useEffect(() => {
    getimg()
  }, [])

  const getimg = () => {
    axios.post('/proxy/getimg').then((res) => {
      console.log(res);
      setlist(res.data)
    })
  }

  return (
    <div>
      <NavBar onBack={back}>图片库</NavBar>

      <Button color="primary" size="mini" onClick={() => file.current.click()}>
        上传文件
      </Button>

      <div>
        <input
          style={{ display: "none" }}
          ref={file}
          type="file"
          accept="image/*,audio/*,video/*"
          multiple
          onChange={upload}
        />
      </div>

      <div className="flex wrap mt20">
        {list.map((item, index) => {
          return (
            <div key={index}>
              <img
                alt=""
                src={item.url}
                style={{ width: "150px" }}
                className="ml20"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
