import './FilmRow.css'

const FilmRow = ({ film, setSelectedFilm }) => {
    console.log('film', film)
    // Destructure the film object to access its properties
    const { title, poster_path, release_date } = film;

    // Create a new Date object using the release_date string
    const date = new Date(release_date);
    // Extract the year from the Date object
    const year = date.getFullYear();
    // Construct the URL for the film poster image using the poster_path
    const posterURL = `https://image.tmdb.org/t/p/w780${poster_path}`

    // Function to handle the click event on the FilmRow component
    function handleClick(film) {
        // Call the setSelectedFilm function with the film object as the argument
        setSelectedFilm(film)
    }

    return (
        <div className="FilmRow" onClick={() => handleClick(film)}>

            {/* () => handleClick(film) is required, 
                otherwise the function will be called when the
                component loads. {handleClick(film)} will execute immediately 
                and will not wait for user to click. */}

            {/* Render the film poster image and alt text*/}
            <img src={posterURL} alt={`${title} film poster`} />
            <div className="film-summary">
                {/* Render the film title */}
                <h3> {title}</h3>
                {/* Render the release year */}
                <p> {year}</p>
                <div className="actions">
                    {/* Render a button with an 'add_to_queue' icon */}
                    <button className="action">
                        <span className="material-icons">add_to_queue</span>
                    </button>
                    {/* Render a button with a 'read_more' icon */}
                    <button className="action">
                        <span className="material-icons">read_more</span>
                    </button>
                </div>
            </div >
        </div >
    )
}

export default FilmRow;
