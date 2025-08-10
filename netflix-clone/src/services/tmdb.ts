import type { TmdbItem, TmdbResponse } from "../types/tmdb"

const TMDB_API_BASE = "https://api.themoviedb.org/3"
const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p"

export const buildImageUrl = (path: string | null | undefined, size: "w300" | "w500" | "original" = "w500"): string | null => {
  if (!path) return null
  return `${TMDB_IMAGE_BASE}/${size}${path}`
}

const getApiKey = (): string | undefined => {
  // Vite exposes env vars prefixed with VITE_
  return import.meta.env.VITE_TMDB_API_KEY as string | undefined
}

async function fetchFromTmdb(endpoint: string, params: Record<string, string | number> = {}): Promise<TmdbResponse> {
  const apiKey = getApiKey()

  if (!apiKey) {
    const mockModule = await import("../mocks/mockTrending.json")
    // Shape it like a TmdbResponse
    return mockModule.default as unknown as TmdbResponse
  }

  const url = new URL(`${TMDB_API_BASE}${endpoint}`)
  url.searchParams.set("api_key", apiKey)
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, String(value))
  }

  const response = await fetch(url.toString())
  if (!response.ok) {
    throw new Error(`TMDB request failed: ${response.status}`)
  }
  return (await response.json()) as TmdbResponse
}

export async function getTrending(): Promise<TmdbItem[]> {
  const data = await fetchFromTmdb("/trending/all/week")
  return data.results
}

export async function getPopularMovies(): Promise<TmdbItem[]> {
  const data = await fetchFromTmdb("/movie/popular")
  return data.results
}

export async function getTopRated(): Promise<TmdbItem[]> {
  const data = await fetchFromTmdb("/movie/top_rated")
  return data.results
}

export async function getNowPlaying(): Promise<TmdbItem[]> {
  const data = await fetchFromTmdb("/movie/now_playing")
  return data.results
}