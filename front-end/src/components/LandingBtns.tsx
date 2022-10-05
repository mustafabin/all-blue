import Button from "@mui/material/Button";
import AnchorRoundedIcon from "@mui/icons-material/AnchorRounded";
import AirRoundedIcon from "@mui/icons-material/AirRounded";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearUser } from "../state/user";
interface LandingBtnsProps {
  buttonStyle: any;
}
const LandingBtns = ({ buttonStyle }: LandingBtnsProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let signOutStyle = {
    ...buttonStyle,
    backgroundColor: "white",
    color: "var(--accent-one-color)",
    "&:hover": {
      border: "none",
      backgroundColor: "rgb(240, 240, 240)",
    },
  };
  let logout = () => {
    localStorage.clear();
    dispatch(clearUser());
  };
  return (
    <>
      <Button
        type="submit"
        onClick={() => navigate("/home")}
        sx={buttonStyle}
        variant="outlined"
      >
        Home
        <AnchorRoundedIcon fontSize="large" />
      </Button>
      <Button type="submit" onClick={logout} sx={signOutStyle}>
        Sign Out
        <AirRoundedIcon fontSize="large" />
      </Button>
    </>
  );
};
export default LandingBtns;
