import { useState } from "react";

export const Usemove = () => {
  const [state, setstate] = useState({ x: 0, y: 0 });
  document.addEventListener("click", (e) => {
    setstate({ x: e.pageX, y: e.pageY });
  });
  return state;
};
