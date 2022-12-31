import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import Button from "@mui/material/Button";
import InboxRoundedIcon from '@mui/icons-material/InboxRounded';
import ExploreRoundedIcon from '@mui/icons-material/ExploreRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import { useSelector } from "react-redux";

const SideNav = () => {
	const user = useSelector((state: any) => state.user);
	return (
		<>
			<div className="Home-sidenav">
				<div className="Home-sidenav-user">
					<img src={user.profile.profile_image} alt={user.profile.username} />
					<div className="Home-sidenav-user-title">
						<h1>{user.profile.username}</h1>
						<p>@{user.profile.tag}</p>
					</div>
					<MoreHorizIcon className="Home-sidenav-user-morebtn" fontSize="large" />
				</div>
				<div className="Home-sidenav-items">
					<span>
						<HomeRoundedIcon fontSize="large" />
						<h1>Home</h1>
					</span>
					<span>
						<ExploreRoundedIcon fontSize="large" />
						<h1>Explore</h1>
					</span>
					<span>
						<InboxRoundedIcon fontSize="large" />
						<h1>Messages</h1>
					</span>
					<span>
						<AccountCircleRoundedIcon fontSize="large" />
						<h1>Profile</h1>
					</span>
				</div>
				<div className="Home-sidenav-items-posbtn-container">
					<Button
						className="Home-sidenav-items-posbtn"
						type="submit"
						sx={{
							border: "none",
							backgroundColor: "var(--dark-main-color)",
							color: "whitesmoke",
							transition: "all ease 0.25s",
							fontWeight: "bold",
							letterSpacing: "1px",
							display: "flex",
							gap: "1rem",
							textTransform: "none",
							"&:hover": {
								border: "none",
								backgroundColor: "var(--dark-main-color)",
							},
						}}
						variant="outlined">
						<h1>Post</h1>
						<AddRoundedIcon fontSize="large" />
					</Button>
				</div>
			</div>
		</>
	);
};
export default SideNav;
