import "../styles/Home.scss";
import { useSelector } from "react-redux";
const Home = () => {
  const user = useSelector((state: any) => state.user);
  return (
    <>
      <div className="Home">
        <h1>
          Hello, {user.profile.username}@{user.profile.tag}
        </h1>
        <h3>You are {user.isAdmin ? "Admin" : "Not Admin"}</h3>
        <h3>You are {user.isAuthenticated ? "logged in" : "Not logged in"}</h3>
      </div>
    </>
  );
};
export default Home;
