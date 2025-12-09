import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import { api } from "@/lib/axios";
import type { OmdbSearchResponse, SearchParams } from "@/redux/features/movies/moviesTypes";
import axios from "axios";

interface MoviesState {
  result: OmdbSearchResponse | null;
  loading: boolean;
  error: string | null;
}

const initialState: MoviesState = {
  result: null,
  loading: false,
  error: null,
};

export const searchMovies = createAsyncThunk<
	OmdbSearchResponse,
	SearchParams,
	{ rejectValue: string }
>(
  "movies/searchMovies",
  async (params, { rejectWithValue }) => {
    try {
      const response = await api.get<OmdbSearchResponse>("/", {
        params,
      });

      const data = response.data;

      if (data.Response === "False") {
        return rejectWithValue(data.Error || "No movies found");
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

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(searchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.result = null;
      })
      .addCase(searchMovies.fulfilled, (state, action: PayloadAction<OmdbSearchResponse>) => {
        state.loading = false;
        state.result = action.payload;
      })
      .addCase(searchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) ?? "Unknown error";
      });
  },
});

export default searchSlice.reducer;
