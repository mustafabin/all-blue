import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import FilledInput from "@mui/material/FilledInput";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import AnchorRoundedIcon from "@mui/icons-material/AnchorRounded";
import Swal from "sweetalert2";
import { useState } from "react";
import { signUp } from "../services/api";
import { useDispatch } from "react-redux";
import { setUser } from "../state/user.js";
import { useNavigate } from "react-router-dom";
interface SignUpProps {
  setShowSignup: any;
  buttonStyle: any;
}
const SignUp = ({ setShowSignup, buttonStyle }: SignUpProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    email: "",
    tag: "",
    confirm: "",
    password: "",
    username: "",
  });
  const [error, setError] = useState({
    email: { value: false, message: "" },
    tag: { value: false, message: "" },
    confirm: { value: false, message: "" },
    password: { value: false, message: "" },
    username: { value: false, message: "" },
  });
  let handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log(form);
    // validate passwords
    if (form.confirm !== form.password) {
      return setError({
        ...error,
        password: {
          value: true,
          message: "Passwords dont match",
        },
      });
    }
    // if any form has an error dont submit
    if (!(error.email.value || error.tag.value || error.username.value)) {
      let data = await signUp(form);
      console.log(data);
      if (data["errors"]) {
        Swal.fire(data["errors"][0], data["errors"][1], "error");
      } else {
        dispatch(setUser(data.user));
        localStorage.setItem("superToken", data.token);
        navigate("/home");
      }
    }
  };
  let handleChange = (e: any) => {
    handleError(e);
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  let onlySpaces = (string: string) => {
    return /^\s*$/.test(string);
  };
  let handleError = (e: any) => {
    let tempError = {
      message: "",
      value: false,
    };
    let errorName = e.target.name;
    // if the text is blank
    if (onlySpaces(e.target.value)) {
      tempError.message = "Cant be blank";
      tempError.value = true;
    }

    setError({
      ...error,
      [errorName]: tempError,
    });
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <TextField
          autoComplete="email"
          name="email"
          label="Email"
          placeholder="Email"
          className="Landing-login-input"
          variant="filled"
          fullWidth
          required
          value={form.email || ""}
          helperText={error.email ? error.email.message : false}
          error={error.email ? error.email.value : false}
          onChange={handleChange}
        />

        <TextField
          autoComplete="username"
          name="username"
          label="Username"
          placeholder="Display name"
          className="Landing-login-input"
          variant="filled"
          fullWidth
          required
          helperText={error.username ? error.username.message : false}
          error={error.username ? error.username.value : false}
          value={form.username || ""}
          onChange={handleChange}
        />
        <TextField
          name="tag"
          label="Tag"
          placeholder="Display tag"
          className="Landing-login-input"
          variant="filled"
          fullWidth
          required
          helperText={error.tag ? error.tag.message : false}
          error={error.tag ? error.tag.value : false}
          value={form.tag || ""}
          onChange={handleChange}
        />
        <FormControl fullWidth className="Landing-login-input" variant="filled">
          <InputLabel
            error={error.password ? error.password.value : false}
            htmlFor="filled-adornment-password"
          >
            {error.password.message || "Password"}
          </InputLabel>
          <FilledInput
            required
            name="password"
            error={error.password ? error.password.value : false}
            value={form.password || ""}
            onChange={handleChange}
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
        <FormControl fullWidth className="Landing-login-input" variant="filled">
          <InputLabel
            error={error.password ? error.password.value : false}
            htmlFor="filled-adornment-confirm-password"
          >
            {error.password.message || "Confirm Password"}
          </InputLabel>
          <FilledInput
            required
            name="confirm"
            error={error.password ? error.password.value : false}
            value={form.confirm || ""}
            onChange={handleChange}
            id="filled-adornment-confirm-password"
            autoComplete="confirm Password"
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
          Sign Up
          <AnchorRoundedIcon fontSize="large" />
        </Button>
        <div className="Landing-switch">
          <span>Already have a account ? </span>
          <p
            onClick={() => setShowSignup(false)}
            className="Landing-signup-text"
          >
            Login
          </p>
        </div>
      </form>
    </>
  );
};
export default SignUp;
