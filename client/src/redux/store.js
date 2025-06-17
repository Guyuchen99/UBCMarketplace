import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./auth/authSlice.js";
import postingReducer from "./posting/postingSlice.js";
import savedListReducer from "./saved-list/savedListSlice.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,

    posting: postingReducer,

    savedList: savedListReducer,
  },
});
