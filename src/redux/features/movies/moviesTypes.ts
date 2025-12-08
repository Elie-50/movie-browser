export type OmdbSearchMovie = {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  Type: string;
};

export type OmdbSearchResponse = {
  Search?: OmdbSearchMovie[];
  totalResults?: string;
  Response: "True" | "False";
  Error?: string;
};

export type SearchParams = {
  s: string;
  page: number;
};

export type MovieParams = {
  i: string;
  type?: "movie" | "series" | "episode";
  y?: number;
  plot?: "short" | "full";
};

export type MovieRating = {
  Source: string;
  Value: string;
};

export type OmdbMovie = {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: MovieRating[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: "True" | "False";
  Error?: string;
};