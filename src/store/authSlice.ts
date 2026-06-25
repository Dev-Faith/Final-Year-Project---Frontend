import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  userToken: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  userToken: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ token: string }>) => {
      state.userToken = action.payload.token;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.userToken = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
