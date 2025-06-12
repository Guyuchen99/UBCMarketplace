import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: null,
  authenticated: false,
  loading: true,
};

export const registerUser = createAsyncThunk("/auth/register", async (formData) => {
  const response = await axios.post("http://localhost:5001/api/auth/register", formData, { withCredentials: true });

  return response.data;
});

export const loginUser = createAsyncThunk("/auth/login", async (formData) => {
  const response = await axios.post("http://localhost:5001/api/auth/login", formData, { withCredentials: true });

  return response.data;
});

export const logoutUser = createAsyncThunk("/auth/logout", async () => {
  const response = await axios.post("http://localhost:5001/api/auth/logout", {}, { withCredentials: true });

  return response.data;
});

export const checkAuth = createAsyncThunk("/auth/checkAuth", async () => {
  const response = await axios.get("http://localhost:5001/api/auth/check-auth", {
    withCredentials: true,
    headers: {
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
    },
  });

  return response.data;
});

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setUser: () => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, () => {})
      .addCase(registerUser.fulfilled, (state) => {
        state.user = null;
        state.authenticated = false;
      })
      .addCase(registerUser.rejected, (state) => {
        state.user = null;
        state.authenticated = false;
      })
      .addCase(loginUser.pending, () => {})
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.success ? action.payload.user : null;
        state.authenticated = action.payload.success;
      })
      .addCase(loginUser.rejected, (state) => {
        state.user = null;
        state.authenticated = false;
      })
      .addCase(checkAuth.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.success ? action.payload.user : null;
        state.authenticated = action.payload.success;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.loading = false;
        state.user = null;
        state.authenticated = false;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.authenticated = false;
      });
  },
});

export const { setUsers } = authSlice.actions;

export default authSlice.reducer;
