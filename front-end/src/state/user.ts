import { createSlice } from "@reduxjs/toolkit";
export const userSlice = createSlice({
  name: "user",
  initialState: {
    profile: {
      username: "Guest",
    },
    isAuthenticated: false,
    isAdmin: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.profile = { ...action.payload };
      state.isAuthenticated = true;
      state.isAdmin = action.payload.is_admin;
    },
    clearUser: (state) => {
      state.profile = {
        username: "Guest",
      };
      state.isAuthenticated = false;
      state.isAdmin = false;
      localStorage.clear();
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
