import "../styles/Home.scss";
import { useSelector } from "react-redux";
import SideNav from "../components/SideNav"
const Home = () => {
	const user = useSelector((state: any) => state.user);
	return (
		<div className="Home">
			<SideNav />
			<div className="Home-content">
				<p>Home</p>
				<h3>You are {user.isAdmin ? "Admin" : "Not Admin"}</h3>
				<h3>You are {user.isAuthenticated ? "logged in" : "Not logged in"}</h3>
			</div>
			<div className="Home-explore">
				<input type="text" placeholder="Search the all blue" />
				<div className="Home-explore-recommended">
					<p>Recommended</p>
				</div>
			</div>
		</div>
	);
};
export default Home;
