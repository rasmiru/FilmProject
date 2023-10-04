import './FilmDetail.css'

function FilmDetail({ selectedFilm }) {
  // Construct the URL for the backdrop image using the selected film's backdrop_path
  const backdropURL = `https://image.tmdb.org/t/p/w1280${selectedFilm.backdrop_path}`
  // Construct the URL for the film detail poster image using the selected film's poster_path
  const filmDetailPosterURL = `https://image.tmdb.org/t/p/w1280${selectedFilm.poster_path}`

  return (
    <div className="FilmDetail is-hydrated">
      {/* Render the film backdrop image and title */}
      <figure className="film-backdrop">
        <img src={backdropURL} alt={`${selectedFilm.title} backdrop`} />
        <h1 className="film-title">{selectedFilm.title}</h1>
      </figure>

      <div className="film-meta">
        {/* Render the film detail poster image and overview */}
        <p className="film-detail-overview">
          <img src={filmDetailPosterURL} className="film-detail-poster" alt={`${selectedFilm.title} poster`} />
          {selectedFilm.overview}
        </p>
      </div>
    </div>
  )
}

export default FilmDetail;
