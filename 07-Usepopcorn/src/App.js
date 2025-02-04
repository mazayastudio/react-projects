import { useEffect, useState } from 'react';

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

const KEY = 'f1cc5dd0';
export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const query = 'interstellar';

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
        );
        const data = await res.json();
        setMovies(data.Search);
        setIsLoading(false);
      }
      catch (err) {
        console.error('Failed to fetch movies', err);
      }
      finally {
        setIsLoading(false);
      }
    };
    fetchMovies();
  }, []);

  return (
    <>
      <NavBar>
        <Search />
        <NumResults movies={movies} />
      </NavBar>

      <Main>
        <Box>
          {isLoading ? <Loader /> : <MovieList movies={movies} />}
        </Box>

        <Box>
          <WatchedSummary watched={watched} />
          <WatchedMoviesList watched={watched} />
        </Box>
      </Main>
    </>
  );
}

const Loader = () => {
  return (
    <p className="loader">Loading...</p>
  );
};

const ErrorMessage = ({ error }) => {
  return (
    <p className="error">{error}</p>
  );
};
const NavBar = ({ children }) => {
  return (
    <nav className="nav-bar">
      <Logo />
      {children}
    </nav>
  );
};
const Logo = () => {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
};
const Search = () => {
  const [query, setQuery] = useState('');

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
};
const NumResults = ({ movies }) => {
  return (
    <p className="num-results">
      Found <strong>{movies?.length}</strong> results
    </p>
  );
};


const Main = ({ children }) => {
  return (
    <main className="main">
      {children}
    </main>
  );
};
const Box = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen((open) => !open)}
      >
        {isOpen ? '–' : '+'}
      </button>
      {isOpen && children}
    </div>
  );
};
const MovieList = ({ movies }) => {
  return (
    <ul className="list">
      {movies?.map((movie) => <Movie
        key={movie.imdbID}
        movie={movie}
      />)}
    </ul>
  );
};
const Movie = ({ movie }) => {
  return (
    <li>
      <img
        src={movie.Poster}
        alt={`${movie.Title} poster`}
      />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
};

/*const WatchedBox = () => {
  const [watched, setWatched] = useState(tempWatchedData);
  const [isOpen2, setIsOpen2] = useState(true);


  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen2((open) => !open)}
      >
        {isOpen2 ? '–' : '+'}
      </button>
      {isOpen2 && (
        <>
          <WatchedSummary watched={watched} />
          <WatchedMoviesList watched={watched} />
        </>
      )}
    </div>
  );
};*/
const WatchedSummary = ({ watched }) => {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
};
const WatchedMoviesList = ({ watched }) => {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie
          movie={movie}
          key={movie.imdbID}
        />
      ))}
    </ul>
  );
};
const WatchedMovie = ({ movie }) => {
  return (
    <li>
      <img
        src={movie.Poster}
        alt={`${movie.Title} poster`}
      />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
      </div>
    </li>
  );
};