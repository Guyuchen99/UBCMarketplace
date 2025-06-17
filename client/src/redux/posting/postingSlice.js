import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  postingList: [],
  loading: false,
};

const postingSlice = createSlice({
  name: "posting",
  initialState: initialState,
  reducers: {},
});

export default postingSlice.reducer;
