import { Navigate } from "react-router-dom";

export default function Authentication({ children }) {
  const urlParams = new URL(window.location.href);
  const pathname = urlParams?.pathname;
  if (localStorage.token) {
    return <div> {children} </div>;
  } else {
    if (pathname === "/" || pathname === "/Empty" || pathname === "/Captcha") {
      return (
        <>
          <div> {children} </div>
        </>
      );
    }
    return <Navigate to="/" replace></Navigate>;
  }
}
