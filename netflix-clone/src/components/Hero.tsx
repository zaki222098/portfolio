import type { TmdbItem } from "../types/tmdb"
import { buildImageUrl } from "../services/tmdb"

interface HeroProps {
  item?: TmdbItem
}

export const Hero = ({ item }: HeroProps) => {
  const backgroundImageUrl = buildImageUrl(item?.backdrop_path ?? item?.poster_path, "original")
  const displayTitle = item?.title || item?.name || "Featured"
  const overview = item?.overview || "Experience unlimited movies and TV shows."

  return (
    <section className="hero" style={backgroundImageUrl ? { backgroundImage: `url(${backgroundImageUrl})` } : undefined}>
      <div className="hero__overlay" />
      <div className="hero__content">
        <h1 className="hero__title">{displayTitle}</h1>
        <p className="hero__overview">{overview}</p>
        <div className="hero__actions">
          <button className="btn btn--primary">Play</button>
          <button className="btn btn--secondary">More Info</button>
        </div>
      </div>
    </section>
  )
}

export default Hero