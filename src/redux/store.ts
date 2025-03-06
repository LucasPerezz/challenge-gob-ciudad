import { configureStore } from "@reduxjs/toolkit";
import basicSlice from "@/redux/features/basicSlice";
import { apiEmployees } from "./services/apiEmployees";

export const store = configureStore({
  reducer: {
    basicSlice,
    [apiEmployees.reducerPath]: apiEmployees.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiEmployees.middleware),
});
