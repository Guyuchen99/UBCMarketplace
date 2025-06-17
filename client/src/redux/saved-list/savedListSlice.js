import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  savedList: [],
  loading: false,
};

const savedListSlice = createSlice({
  name: "savedList",
  initialState: initialState,
  reducers: {},
});

export default savedListSlice.reducer;
