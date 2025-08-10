import type { TmdbItem } from "../types/tmdb"
import { buildImageUrl } from "../services/tmdb"

interface RowProps {
  title: string
  items: TmdbItem[]
}

export const Row = ({ title, items }: RowProps) => {
  return (
    <section className="row">
      <h2 className="row__title">{title}</h2>
      <div className="row__scroller">
        {items.map((item) => {
          const img = buildImageUrl(item.poster_path || item.backdrop_path, "w300")
          const label = item.title || item.name || ""
          return (
            <figure className="card" key={`${title}-${item.id}`}>
              {img ? (
                <img className="card__img" src={img} alt={label} loading="lazy" />
              ) : (
                <div className="card__placeholder" />
              )}
              <figcaption className="card__caption">{label}</figcaption>
            </figure>
          )
        })}
      </div>
    </section>
  )
}

export default Row