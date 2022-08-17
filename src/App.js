import { Outlet } from "react-router-dom";
import Authentication from "./authentication";

function App() {
  return (
    <Authentication>
      <Outlet />
    </Authentication>
  );
}

export default App;
