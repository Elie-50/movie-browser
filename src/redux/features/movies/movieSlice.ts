import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import { api } from "@/lib/axios";
import type { OmdbMovie, MovieParams } from "@/redux/features/movies/moviesTypes";
import axios from "axios";

interface MovieState {
  data: OmdbMovie | null;
  loading: boolean;
  error: string | null;
}

const initialState: MovieState = {
  data: null,
  loading: false,
  error: null,
};

export const fetchMovie = createAsyncThunk<
  OmdbMovie,
  MovieParams,
  { rejectValue: string }
>(
  "movie/fetchMovie",
  async (params, { rejectWithValue }) => {
    try {
      const response = await api.get<OmdbMovie>("/", { params });
      const data = response.data;

      if (data.Response === "False") {
        return rejectWithValue(data.Error || "Movie not found");
      }

      return data;
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        return rejectWithValue(err.response?.data?.Error || err.message);
      }
      if (err instanceof Error) {
        return rejectWithValue(err.message);
      }
      return rejectWithValue("Error fetching movie");
    }
  }
);

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    clearMovie(state) {
      state.data = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovie.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovie.fulfilled, (state, action: PayloadAction<OmdbMovie>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchMovie.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Unknown error";
      });
  },
});

export const { clearMovie } = movieSlice.actions;
export default movieSlice.reducer;
