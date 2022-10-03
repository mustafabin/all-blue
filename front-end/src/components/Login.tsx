import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import FilledInput from "@mui/material/FilledInput";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import VpnKeyRoundedIcon from "@mui/icons-material/VpnKeyRounded";
import { useState } from "react";
import { login } from "../services/api";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../state/user.js";
import Swal from "sweetalert2";
interface LoginProps {
  setShowSignup: any;
  buttonStyle: any;
}
function Login({ setShowSignup, buttonStyle }: LoginProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  let handleSubmit = async (e: any) => {
    e.preventDefault();
    let form = {
      email: e.target["email"].value,
      password: e.target["password"].value,
    };

    let data = await login(form);
    if (data["error"]) {
      Swal.fire(data["error"], data["message"], "error");
    } else {
      localStorage.setItem("superToken", data["token"]);
      dispatch(setUser(data.user));
      navigate("/home");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <TextField
          autoComplete="email"
          label="Email"
          name="email"
          placeholder="Email / Username"
          className="Landing-login-input"
          variant="filled"
          fullWidth
          required
        />
        <FormControl fullWidth className="Landing-login-input" variant="filled">
          <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
          <FilledInput
            required
            name="password"
            id="filled-adornment-password"
            autoComplete="password"
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  sx={{ color: "var(--accent-two-color)" }}
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? (
                    <VisibilityOff sx={{ color: "var(--accent-one-color)" }} />
                  ) : (
                    <Visibility sx={{ color: "var(--main-color)" }} />
                  )}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <Button type="submit" sx={buttonStyle} variant="outlined">
          Login
          <VpnKeyRoundedIcon fontSize="large" />
        </Button>
        <div className="Landing-switch">
          <span>Dont have a account ? </span>
          <p
            onClick={() => setShowSignup(true)}
            className="Landing-signup-text"
          >
            Sign Up
          </p>
        </div>
      </form>
    </>
  );
}
export default Login;
