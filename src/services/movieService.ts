import axios from "axios";
import type { AxiosInstance } from "axios";
import type { Movie } from "../types/movie";
import { TMDB_BASE_URL, TMDB_TOKEN } from "../config/tmdb";

const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

interface TMDBSearchResponse {
  page: number;
  results: Movie[];
  total_results: number;
  total_pages: number;
}

const api: AxiosInstance = axios.create({
  baseURL: TMDB_BASE_URL,             // это именно API
  headers: { Authorization: `Bearer ${TMDB_TOKEN}` },
});

export const fetchMovies = async (
  query: string,
  page = 1
): Promise<TMDBSearchResponse> => {
  const { data } = await api.get<TMDBSearchResponse>("/search/movie", {
    params: { query, page, include_adult: false, language: "en-US" },
  });
  return data;
};

export const makeImgUrl = (
  path: string | null,
  size: "w200" | "w343" | "w500" | "original" = "w343"
): string | null => {
  if (!path) return null;
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
};