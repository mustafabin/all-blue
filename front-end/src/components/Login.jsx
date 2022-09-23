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
import { fontFamily } from "@mui/system";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  let handleSubmit = (e) => {
    e.preventDefault();
  };
  let buttonStyle = {
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
      <form onSubmit={handleSubmit}>
        <TextField
          autoComplete="email"
          label="Email"
          placeholder="email / username"
          className="Landing-login-input"
          variant="filled"
          fullWidth
        />
        <FormControl className="Landing-login-input" variant="filled">
          <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
          <FilledInput
            fullWidth
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
        <Button sx={buttonStyle} variant="outlined">
          Login
          <VpnKeyRoundedIcon fontSize="large" />
        </Button>
        <p className="Landing-signup-text">Sign Up ?</p>
      </form>
    </>
  );
}
export default Login;
