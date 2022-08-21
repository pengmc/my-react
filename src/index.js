import React from "react";
import ReactDOM from "react-dom/client";
import {
  Routes,
  Route,
  unstable_HistoryRouter as HistoryRouter,
} from "react-router-dom";
import { lazy, Suspense } from "react";
import "./page/css/index.css";

import { history } from "./history";

import Loadio from "./loadio.js";
import "./page/css/index.css";
// import Vconsole from "vconsole";


// new Vconsole();

localStorage.setItem("path", "home");

const App = lazy(() => import("./App"));
const Layout = lazy(() => import("./layout"));
const Home = lazy(() => import("./page/Home"));
const Cart = lazy(() => import("./page/Cart"));
const Todo = lazy(() => import("./page/todo"));
const Message = lazy(() => import("./page/message"));
const Detail = lazy(() => import("./page/detail"));
const Login = lazy(() => import("./page/login"));
const Empty = lazy(() => import("./page/empty"));
const Captcha = lazy(() => import("./page/captcha"));
const Playlist = lazy(() => import("./page/playlist"));
const MusicView = lazy(() => import("./page/musicView"));
// const root = ReactDOM.render(<App />, document.getElementById("root"));

ReactDOM.createRoot(document.getElementById("root")).render(
  <HistoryRouter history={history}>
    <Suspense
      fallback={
        <div>
          <Loadio />
        </div>
      }
    >
      <Routes>
        <Route element={<App />}>
          <Route element={<Layout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/todo" element={<Todo />} />
            <Route path="/message" element={<Message />} />
          </Route>

          <Route path="/" element={<Login />} />

          <Route path="/captcha" element={<Captcha />} />

          <Route path="/Detail" element={
          <Detail />
          } />

          <Route path="/playlist/:id" element={
            // <KeepAlive>
              <Playlist />
            // </KeepAlive>
          } />

          <Route path="/musicView/:id" element={
              <MusicView />
          }/>
        </Route>
        <Route path="*" element={<Empty />} />
      </Routes>
    </Suspense>
  </HistoryRouter>
);
