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

function Login({ setShowSignup, buttonStyle }) {
  const [showPassword, setShowPassword] = useState(false);
  let handleSubmit = (e) => {
    e.preventDefault();
    alert("submit");
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <TextField
          autoComplete="email"
          label="Email"
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
