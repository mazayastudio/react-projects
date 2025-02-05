import { useEffect, useRef, useState } from 'react';
import StarRating from './StarRating';

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

const KEY = 'f1cc5dd0';
export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState(() => {
    const storedValue = localStorage.getItem('watched');
    return storedValue ? JSON.parse(storedValue) : [];
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const [selectedId, setSelectedId] = useState(null);

  const onChangeQuery = (e) => setQuery(e.target.value);
  const onSelectMovie = (id) => {
    setSelectedId(selectedId === id ? null : id);
  };
  const handleCloseMovie = () => setSelectedId(null);

  const handleAddWatched = movie => {
    setWatched(watched => [...watched, movie]);

    // localStorage.setItem('watched', JSON.stringify([...watched, movie]));
  };

  const handleDeleteWatched = id => {
    setWatched(
      watched => watched.filter(movie => movie.imdbID !== id));
  };

  useEffect(() => {
    localStorage.setItem('watched', JSON.stringify(watched));
  }, [watched]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query.trim());
    }, 500);
    return () => clearTimeout(handler);
  }, [query]);

  useEffect(() => {
    if (!debouncedQuery) {
      setMovies([]);
      setError('');
      return;
    }

    const controller = new AbortController();
    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
          { signal: controller.signal },
        );

        if (!res.ok) throw new Error('Failed to fetch movies');

        const data = await res.json();
        if (data.Response === 'False') throw new Error('No movies found');
        setMovies(data.Search);
        setError('');
      }
      catch (err) {
        console.error(err);

        if (err.name !== 'AbortError')
          setError(err.message);
      }
      finally {
        setIsLoading(false);
      }
    };
    fetchMovies();
    return () => controller.abort();
  }, [debouncedQuery, query]);

  return (
    <>
      <NavBar>
        <Search
          query={query}
          onChangeQuery={onChangeQuery}
          setQuery={setQuery}
        />
        <NumResults movies={movies} />
      </NavBar>

      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && movies.length > 0 &&
            <MovieList
              movies={movies}
              onSelectMovie={onSelectMovie}
              watched={watched}
            />}
          {error && <ErrorMessage message={error} />}
        </Box>

        <Box>
          {
            selectedId
              ? <MovieDetails
                selectedId={selectedId}
                onCloseMovie={handleCloseMovie}
                onAddWatched={handleAddWatched}
                watched={watched}
              />
              : <>
                <WatchedSummary watched={watched} />
                <WatchedMoviesList
                  watched={watched}
                  onDeleteWatched={handleDeleteWatched}
                />
              </>
          }
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

const ErrorMessage = ({ message }) => {
  return (
    <p className="error"><span>⛔</span> {message}</p>
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
const Search = ({ query, onChangeQuery, setQuery }) => {
  const inputEl = useRef(null);

  useEffect(() => {
    const callback = e => {
      if (document.activeElement !== inputEl.current) return;
      if (e.code === 'Enter') {
        inputEl.current.focus();
        setQuery('');
      }

    };
    document.addEventListener('keydown', callback);
  }, [setQuery]);

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={onChangeQuery}
      ref={inputEl}
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
const MovieList = ({ movies, onSelectMovie }) => {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => <Movie
        key={movie.imdbID}
        movie={movie}
        onSelectMovie={onSelectMovie}
      />)}
    </ul>
  );
};
const Movie = ({ movie, onSelectMovie }) => {
  return (
    <li onClick={() => onSelectMovie(movie.imdbID)}>
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

const MovieDetails = ({ selectedId, onCloseMovie, onAddWatched, watched }) => {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState(0);

  const countRef = useRef(0);

  useEffect(() => {
    if (userRating) countRef.current++;
  }, [userRating]);

  const isWatched = watched.map(movie => movie.imdbID).includes(selectedId);
  const watchedUserRating = watched.find(
    movie => movie.imdbID === selectedId)?.userRating;

  const handleAdd = () => {
    const newWatchedMovie = {
      imdbID              : selectedId,
      title,
      year,
      poster,
      imdbRating          : Number(imdbRating),
      runtime             : Number(runtime.split(' ').at(0)),
      userRating,
      countRatingDecisions: countRef.current,
    };
    onAddWatched(newWatchedMovie);
    onCloseMovie();
  };

  const {
          Title  : title,
          Year   : year,
          Poster : poster,
          Runtime: runtime,
          imdbRating,
          Plot    : plot,
          Released: released,
          Actors  : actors,
          Director: director,
          Genre   : genre,
        } = movie;

  useEffect(() => {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') onCloseMovie();
    });
    return () => document.removeEventListener('keydown', onCloseMovie);
  }, [onCloseMovie]);

  useEffect(() => {
    const getMovieDetails = async () => {
      setIsLoading(true);
      const res = await fetch(
        `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`,
      );
      const data = await res.json();
      setMovie(data);
      setIsLoading(false);
    };
    getMovieDetails();
  }, [selectedId]);

  useEffect(() => {
    if (!title) return;
    document.title = `usePopcorn | ${title}`;
    return () => {
      document.title = 'usePopcorn';
    };
  }, [title]);

  return (
    <div className="details">
      {isLoading
        ? <Loader />
        : <>
          <header>
            <button
              className="btn-back"
              onClick={onCloseMovie}
            >
              &larr;
            </button>
            <img
              src={poster}
              alt={`Poster of ${movie} movie`}
            />
            <div className="details-overview">
              <h2>{title} {year}</h2>
              <p>{released} &bull; {runtime}</p>
              <p>{genre}</p>
              <p><span>⭐</span> {imdbRating}</p>
            </div>
          </header>

          <section>
            <div className="rating">
              {!isWatched
                ? <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    onSetRating={userRating => setUserRating(userRating)}
                  />
                  {userRating > 0 && <button
                    className="btn-add"
                    onClick={handleAdd}
                  >
                    + Add to list
                  </button>}
                </>
                : <p>You rated this movie 🌟 {watchedUserRating}</p>
              }
            </div>
            <p><em>{plot}</em></p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>}
    </div>
  );
};
const WatchedSummary = ({ watched }) => {
  const avgImdbRating = parseFloat(
    average(watched.map((movie) => movie.imdbRating)).toFixed(1));
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
const WatchedMoviesList = ({ watched, onDeleteWatched }) => {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie
          movie={movie}
          key={movie.imdbID}
          onDeleteWatched={onDeleteWatched}
        />
      ))}
    </ul>
  );
};
const WatchedMovie = ({ movie, onDeleteWatched }) => {
  return (
    <li>
      <img
        src={movie.poster}
        alt={`${movie.title} poster`}
      />
      <h3>{movie.title}</h3>
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

        <button
          className="btn-delete"
          onClick={() => onDeleteWatched(movie.imdbID)}
        >X
        </button>
      </div>
    </li>
  );
};