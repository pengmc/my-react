import axios from "axios";
import { Toast } from "antd-mobile";
import { history } from "../history";

// const baseurl = "/proxy";
const baseurl = "https://node-music-cyan.vercel.app";

const api = axios.create({
  baseURL: baseurl,
  timeout: 10000,
});

api.interceptors.request.use((req) => {
  req.headers.Authorization = "bd2a82105ec274abf86f0d69cfdc4f71";
  return req;
});
api.interceptors.response.use(
  (response) => {
    // 成功后返回response的主体，其他数据一般并不需要，这样在使用中只需要关注数据主体就可以
    return response.data;
  },
  (error) => {
    let { response } = error; // 等效于error.response
    if (response) {
      if (response.data.msg) {
        Toast.show(response.data.msg);
      }
      // 服务器返回了结果
      // 这里能够读出服务器返回的错误HTTP状态码，根据不同状态码进行不同处理
      // 这个根据业务需求操作即可
      // eslint-disable-next-line default-case
      switch (response.status) {
        case 401:
          // 权限不够，一般是未登录
          // ...
          break;
        case 403:
          // 服务器已经接受，但是拒绝访问，通常是登录过期
          // ...
          localStorage.removeItem("token");
          break;
        case 404:
          // 找不到资源
          // ...
          history.push("/");

          break;
      }
    } else {
      // 服务器根本就没有返回任何东西
      // 这里一般只有两种情况，服务器崩溃，客户端没有网。
      // 通常在这里做断网处理
      if (!window.navigator.onLine) {
        // 处理断网
        // ...
        return;
      }
      // 什么都不是，返回一个错误
      return Promise.reject(error);
    }
  }
);

export default api;
