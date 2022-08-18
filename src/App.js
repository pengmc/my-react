import { Outlet } from "react-router-dom";
import Authentication from "./authentication";
import { observer } from "mobx-react-lite";
import { store } from "./store";

function App() {
  return (
    <>
      <Authentication>
        <Outlet />
      </Authentication>
      <audio
        id="audio"
        src={store.url}
        autoPlay
        onEnded={() => {
          console.log("播放结束");
          let count = store.count + 1;
          if (count > store.lzylist.length - 1) {
            count = 0;
          }
          store.setCount(count);
          let item = store.lzylist[store.count];
          store.setsong(item.name + " — " + item.ar[0].name);
          store.playUrl(item.id);
        }}
      />
    </>
  );
}

export default observer(App);
