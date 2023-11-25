import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: JSON.parse(localStorage.getItem("userInfo")) || null,
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    logout: () => initialState,
    setUser: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
  },
});

export default userSlice.reducer;
export const { logout, setUser } = userSlice.actions;
