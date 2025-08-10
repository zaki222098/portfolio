import { useEffect, useMemo, useState } from "react"
import "./App.css"
import "./index.css"
import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import Row from "./components/Row"
import { getTrending, getPopularMovies, getTopRated, getNowPlaying } from "./services/tmdb"
import type { TmdbItem } from "./types/tmdb"

function App() {
  const [trending, setTrending] = useState<TmdbItem[]>([])
  const [popular, setPopular] = useState<TmdbItem[]>([])
  const [topRated, setTopRated] = useState<TmdbItem[]>([])
  const [nowPlaying, setNowPlaying] = useState<TmdbItem[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true
    async function load() {
      try {
        const [t, p, tr, n] = await Promise.all([
          getTrending(),
          getPopularMovies(),
          getTopRated(),
          getNowPlaying(),
        ])
        if (!isMounted) return
        setTrending(t)
        setPopular(p)
        setTopRated(tr)
        setNowPlaying(n)
      } catch (e) {
        if (!isMounted) return
        setError(e instanceof Error ? e.message : "Failed to load data")
      } finally {
        if (isMounted) setIsLoading(false)
      }
    }
    load()
    return () => {
      isMounted = false
    }
  }, [])

  const featured = useMemo(() => trending[0], [trending])

  return (
    <div className="app">
      <Navbar />
      <main>
        <Hero item={featured} />
        {isLoading ? (
          <div className="status">Loading…</div>
        ) : error ? (
          <div className="status status--error">{error}</div>
        ) : (
          <>
            <Row title="Trending Now" items={trending} />
            <Row title="Popular on Netflix" items={popular} />
            <Row title="Top Rated" items={topRated} />
            <Row title="Now Playing" items={nowPlaying} />
          </>
        )}
      </main>
      <footer className="footer">Netflix Clone · React + Vite</footer>
    </div>
  )
}

export default App
