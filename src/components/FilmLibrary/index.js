import { useState, useEffect } from 'react';
import FilmDetail from "../FilmDetail";
import FilmDetailEmpty from '../FilmDetailEmpty';
import FilmRow from "../FilmRow";
import { TMDB_API_KEY } from '../../data/TMDB'
import './FilmLibrary.css'

const FilmLibrary = () => {
  // State to keep track of the selected film
  const [selectedFilm, setSelectedFilm] = useState(null)
  const [selectedFilmData, setSelectedFilmData] = useState(null)
  const [filmList, setFilmList] = useState([])
  const [selectedYear, setSelectedYear] = useState(2023)
  const [page, setPage] = useState(1);

  useEffect(() => {
    // Get list of movies from 2023 that are most popular. (Descending order of popularity)
    fetchMovies(selectedYear, page)
  }, [selectedYear]);

  const fetchMovies = (year, requestedPage) => {
    fetch(`https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&primary_release_year=${year}&page=${requestedPage}`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + TMDB_API_KEY,
        'accept': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        setFilmList(data.results);
      })
      .catch(error => {
        console.error(error);
      });
  };
  useEffect(() => {

    // Get movie deatils by movie id.
    !!selectedFilm?.id &&
      fetch(`https://api.themoviedb.org/3/movie/${selectedFilm?.id}?language=en-US`, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + TMDB_API_KEY,
          'accept': 'application/json',
        },
      })
        .then(response => response.json())
        .then(data => {
          setSelectedFilmData(data)
        })
        .catch(error => {
          console.error(error);
        });
  }, [selectedFilm?.id]);



  const handleChange = (event) => {
    const currentYearSelection = event.target.value;
    setSelectedYear(currentYearSelection)
  };

  // Create an array with years from 2023 to 2000.
  const years = [];
  for (let year = 2023; year >= 2000; year--) {
    years.push(year);
  }

  const handleLoadMore = () => {
    const nextPage = page + 1; // Increment the page
    fetchMovies(selectedYear, nextPage); // Fetch movies for the next page
    setPage(nextPage); // Update the page state
  };



  return (
    <div className="FilmLibrary">
      <div className="film-list">
        <h1 className="section-title">FILMS</h1>
        <div className="film-list-filters">
          <button className="film-list-filter is-active">
            ALL
            <span className="section-count">{filmList.length}</span>
          </button>
          <button className="film-list-filter">
            FAVES
            <span className="section-count">1</span>
          </button>
          <select className="year-dropdown" onChange={handleChange} defaultValue={selectedYear}>
            <option value="">Select a Year</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        {
          // Render a FilmRow component for each film in the films array
          filmList !== null && filmList.map((film) => {

            return (
              <FilmRow
                key={film.id} // Use the 'id' property as the unique key for each FilmRow component
                film={film} // Pass the film object as a prop to the FilmRow component
                setSelectedFilm={setSelectedFilm} // Pass the setSelectedFilm function as a prop to the FilmRow component
              />
            );
          })
        }
        {filmList.length > 0 && (
          <div className="load-more-container">
            <button className="load-more-button" onClick={handleLoadMore}>
              Load More
            </button>
          </div>
        )}
      </div>

      <div className="film-details">
        <h1 className="section-title">DETAILS</h1>
        {
          // Conditionally render the FilmDetail component if a film is selected,
          // otherwise render the FilmDetailEmpty component
          selectedFilm !== null ? (
            <FilmDetail selectedFilm={selectedFilm} />
          ) : (
            <FilmDetailEmpty />
          )
        }
      </div>
    </div>
  );
}

export default FilmLibrary;
