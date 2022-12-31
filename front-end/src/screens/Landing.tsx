import logo from "../media/ALLBLUE.png";
import "../styles/Landing.scss";
import Login from "../components/Login.jsx";
import lowRes from "../media/BACKGROUND-min.jpg";
import { useState } from "react";
import SignUp from "../components/SignUp";
import { useSelector } from "react-redux";
import LandingBtns from "../components/LandingBtns";
const Landing = () => {
  const [showSignup, setShowSignup] = useState(false);
  const user = useSelector((state: any) => state.user);
  let buttonStyle: any = {
    border: "none",
    backgroundColor: "var(--accent-one-color)",
    color: "whitesmoke",
    transition: "all ease 0.25s",
    padding: "1rem",
    fontSize: "1.3rem",
    fontWeight: "bold",
    letterSpacing: "1px",
    display: "flex",
    gap: "1rem",
    textTransform: "none",
    "&:hover": {
      border: "none",
      color: "white",
      backgroundColor: "var(--accent-one-dark-color)",
    },
  };
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
          {user.isAuthenticated ? (
            <LandingBtns buttonStyle={buttonStyle} />
          ) : showSignup ? (
            <SignUp buttonStyle={buttonStyle} setShowSignup={setShowSignup} />
          ) : (
            <Login buttonStyle={buttonStyle} setShowSignup={setShowSignup} />
          )}

          <a href="https://discord.com/api/oauth2/authorize?client_id=1055874455143976970&redirect_uri=http%3A%2F%2Flocalhost%3A5173%2Fauth%2Fdiscord&response_type=token&scope=identify%20email" className="bg-discord-blue  text-xl px-5 py-3 rounded-md font-bold flex items-center space-x-4 hover:bg-gray-600 transition duration-75">
            <i className="fa-brands fa-discord text-2xl"></i>
            <span>Login with Discord</span>
          </a>

        </div>
      </div>
    </>
  );
};
export default Landing;
