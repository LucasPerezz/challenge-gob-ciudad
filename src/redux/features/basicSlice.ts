import { createSlice } from "@reduxjs/toolkit";

const initialState = { value: 0 };

const basicSlice = createSlice({
  name: "basic",
  initialState,
  reducers: {
    increment(state) {
      state.value++;
    },
    decrement(state) {
      state.value--;
    },
    incrementByAmount(state, action) {
      state.value += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } = basicSlice.actions;
export default basicSlice.reducer;
