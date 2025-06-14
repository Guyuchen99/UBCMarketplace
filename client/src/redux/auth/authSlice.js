import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: null,
  authenticated: false,
  loading: true,
};

export const registerUser = createAsyncThunk("/auth/register", async (form) => {
  const response = await axios.post("http://localhost:5001/api/auth/register", form, { withCredentials: true });

  return response.data;
});

export const loginUser = createAsyncThunk("/auth/login", async (form) => {
  const response = await axios.post("http://localhost:5001/api/auth/login", form, { withCredentials: true });

  return response.data;
});

export const logoutUser = createAsyncThunk("/auth/logout", async () => {
  const response = await axios.post("http://localhost:5001/api/auth/logout", {}, { withCredentials: true });

  return response.data;
});

export const getProfile = createAsyncThunk("/auth/getProfile", async () => {
  const response = await axios.get("http://localhost:5001/api/auth/me", { withCredentials: true });

  return response.data;
});

export const updateAccount = createAsyncThunk("/auth/updateAccount", async (form) => {
  const response = await axios.put(`http://localhost:5001/api/auth/update/me`, form, { withCredentials: true });

  return response.data;
});

export const deleteAccount = createAsyncThunk("/auth/deleteAccount", async () => {
  const response = await axios.delete(`http://localhost:5001/api/auth/delete/me`, { withCredentials: true });

  return response.data;
});

export const updateUserByAdmin = createAsyncThunk("/auth/updateUserByAdmin", async ({ id, form }) => {
  const response = await axios.put(`http://localhost:5001/api/auth/update/${id}`, form, { withCredentials: true });

  return response.data;
});

export const deleteUserByAdmin = createAsyncThunk("/auth/deleteUserByAdmin", async (id) => {
  const response = await axios.delete(`http://localhost:5001/api/auth/delete/${id}`, { withCredentials: true });

  return response.data;
});

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.authenticated = false;
      })
      .addCase(deleteAccount.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.user = null;
          state.authenticated = false;
        }
      })
      .addCase(getProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.user = action.payload.user;
        }
        state.authenticated = action.payload.success;
        state.loading = false;
      })
      .addCase(getProfile.rejected, (state) => {
        state.user = null;
        state.authenticated = false;
        state.loading = false;
      });
  },
});

export default authSlice.reducer;
