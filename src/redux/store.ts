import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./features/movies/movieSlice";
import searchReducer from "./features/movies/searchSlice";

export const store = configureStore({
  reducer: {
    movie: movieReducer,
    search: searchReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;