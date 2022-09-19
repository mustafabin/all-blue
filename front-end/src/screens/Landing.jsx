import logo from "../media/ALLBLUE.png";
import "../styles/Landing.scss";
import Login from "../components/Login.jsx";
import lowRes from "../media/BACKGROUND-min.jpg";
// import { useEffect, useState } from "react";
function Landing() {
  return (
    <>
      <div className="Landing">
        <div className="Landing-backdrop">
          <img src={lowRes} alt="Boat sailing" />
        </div>
        <div className="Landing-login">
          <div className="Landing-login-img">
            <img src={logo} alt="Skull with strawhat" />
            <h1>All Blue</h1>
          </div>
          <Login />
        </div>
      </div>
    </>
  );
}
export default Landing;
