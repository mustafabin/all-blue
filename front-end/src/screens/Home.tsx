import "../styles/Home.scss";
import { useSelector } from "react-redux";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
const Home = () => {
	const user = useSelector((state: any) => state.user);
	return (
		<div className="Home">
			<div className="Home-sidenav">
				<div className="Home-sidenav-user">
					<img src={`https://avatars.dicebear.com/api/miniavs/${user.profile.username}.svg`} alt={user.profile.username} />
					<div className="Home-sidenav-user-title">
						<h1>{user.profile.username}</h1>
						<p>@{user.profile.tag}</p>
					</div>
					<MoreHorizIcon fontSize="large"/>
				</div>
				<div className="Home-sidenav-items">
					<h1>Home</h1>
					<h1>Explore</h1>
					<h1>Messages</h1>
					<h1>Profile</h1>
				</div>
				<button>Post</button>
			</div>
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
