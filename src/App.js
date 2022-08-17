import { Outlet } from "react-router-dom";
import Authentication from "./authentication";
import "./page/css/index.css";

function App() {
  return (
    <Authentication>
      <Outlet />
    </Authentication>
  );
}

export default App;
